import React, { useState, useEffect, useRef } from "react";
import { Input, Space, Button, message, Spin } from "antd";
import { SearchOutlined, SyncOutlined } from "@ant-design/icons";
import { debounce, throttle } from "@/store/utile";
import { decryptData } from "@/store/utile";
import "./index.modules.less";
import { ProjectList } from "@/api/useApi";
import { useNavigate } from "react-router-dom";

// PC项目
export default function PcProject({ props }: any) {
  const boxRef = useRef(null); // 引用滚动容器
  const navigate = useNavigate();

  // 检索值
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1); // 当前请求页数
  const [searchTrigger, setSearchTrigger] = useState(0); // 搜索触发器
  // 列表数据
  const [listData, setListData] = useState<any>([]);

  const getData = (name = searchValue, props: any) => {
    setLoading(true);
    ProjectList({
      page: page,
      page_size: 100,
      name,
      ...props,
    })
      .then((res: any) => {
        setLoading(false);

        if (res?.code !== 0) {
          message.error(res?.msg || "请求失败");
          return;
        }

        const decryptedData = decryptData(res?.data);

        if (!Array.isArray([])) {
          message.error("数据格式错误");
          return;
        }

        if (decryptedData.length === 0) {
          message.success("数据加载完成");
          return;
        }

        // 更新列表数据
        setListData((prevData: any) => [...prevData, ...decryptedData]);
      })
      .catch((error: any) => {
        setLoading(false);
        message.error("网络请求失败");
        console.error(error);
      });
  };

  useEffect(() => {
    if (searchTrigger === 0) {
      // 非搜索操作，监听 page 变化
      getData(searchValue, props);
    }
  }, [page]);

  useEffect(() => {
    if (searchTrigger > 0) {
      // 搜索操作，监听 searchTrigger 变化
      getData(searchValue, props);
    }
  }, [searchTrigger]);

  const handleScroll = () => {
    const box: any = boxRef.current;
    if (box.scrollHeight - box.scrollTop - box.clientHeight < 300) {
      setPage((prevPage) => prevPage + 1); // 增加页数
    }
  };

  const handleSearch = () => {
    if (searchValue) {
      setListData([]);
      setPage(1);
      setSearchTrigger((prev) => prev + 1); // 触发搜索
    } else {
      message.error("请输入项目名称");
    }
  };

  const handleReset = () => {
    setListData([]);
    setSearchValue("");

    if (page !== 1) {
      // 只有在 page 不等于 1 时，才更新 page 和触发器
      setPage(1);
    } else {
      getData("", props);
    }

    setSearchTrigger(0); // 重置搜索触发器
  };

  return (
    <>
      <div className="custom-search-head mb-4">
        <span className="custom-search-head-item mr-[30px]">
          <span className="custom-search-head-item-title w-[70px] mr-[12px] text-right">
            项目名称:
          </span>
          <Input
            className="w-[200px]"
            value={searchValue}
            placeholder="请输入项目名称"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </span>
        <span className="custom-search-head-item">
          <Space className="mt-[10px]">
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
            >
              查询
            </Button>
            <Button
              type="dashed"
              icon={<SyncOutlined />}
              onClick={() => {
                handleReset();
              }}
            >
              重置
            </Button>
          </Space>
        </span>
      </div>
      <div
        onScroll={throttle(() => {
          handleScroll();
        }, 1000)}
        ref={boxRef}
        className="pcProjectPage"
      >
        <Spin spinning={loading}>
          <div className="list">
            {listData.map((item: any, index: number) => {
              return (
                <div
                  className="listItem"
                  key={index}
                  onClick={() => {
                    navigate("/pcProject/details", {
                      state: {
                        id: item.id,
                      },
                    });
                  }}
                >
                  <img className="listImg" src={item.img} alt="" />
                  <div className="listItemInfo">
                    <div className="listItemTitle">{item?.name ?? ""}</div>
                    <div className="listTextNum">
                      ￥{item?.price ?? "--"}{" "}
                      <span className="listTextUnit">起</span>{" "}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Spin>
      </div>
    </>
  );
}
