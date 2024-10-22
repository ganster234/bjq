// import CryptoJS from "crypto-js";
import { useState, useEffect, useRef } from "react";
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
  const [loding, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1); // 当前请求页数
  // 列表数据
  const [listData, setListData] = useState<any>([]);

  const getData = (name = searchValue, props: any) => {
    setLoading(true);

    const isSearch = !!name;
    const currentPage = isSearch ? 1 : page;

    ProjectList({
      page: currentPage,
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
        console.log(decryptedData, "decryptedData");

        if (!Array.isArray(decryptedData)) {
          message.error("数据格式错误");
          return;
        }

        if (isSearch) {
          // 将新数据追加到列表中
          setListData((prevData: any) => [...prevData, ...decryptedData]);

          // 仅当 page 不为 1 时才更新 page
          if (page !== 1) {
            setPage(1);
          }
        } else {
          if (decryptedData.length === 0) {
            message.success("数据加载完成");
            return;
          }
          // 继续分页加载
          setListData((prevData: any) => [...prevData, ...decryptedData]);
        }
      })
      .catch((error: any) => {
        setLoading(false);
        message.error("网络请求失败");
        console.error(error);
      });
  };
  useEffect(() => {
    console.log(props);
    getData(searchValue, props);
  }, [page]);
  const handleScroll = () => {
    const box: any = boxRef.current;
    if (box.scrollHeight - box.scrollTop - box.clientHeight < 300) {
      setPage((prevPage) => prevPage + 1); // 增加页数
    }
  };

  //////////////////////////////////////////
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
              onClick={() => {
                setListData([]), getData(searchValue, props);
              }}
            >
              查询
            </Button>
            <Button
              type="dashed"
              icon={<SyncOutlined />}
              onClick={() => {
                setSearchValue("");
                getData("", props);
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
        <Spin spinning={loding}>
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
