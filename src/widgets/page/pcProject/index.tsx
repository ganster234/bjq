/*
 * @Author: yy
 * @Date: 2024-09-14 15:36:50
 * @LastEditTime: 2024-09-30 15:03:19
 * @LastEditors: yy
 * @Description:
 */
// import CryptoJS from "crypto-js";
import { useState, useEffect, useRef } from "react";
import { Input, Space, Button, message, Spin } from "antd";
import { SearchOutlined, SyncOutlined } from "@ant-design/icons";
import { debounce, throttle } from "@/store/utile";
// import { emunStatus } from "@/store/global";
import "./index.modules.less";

import { ProjectList } from "@/api/useApi";
import { useNavigate } from "react-router-dom";
// PC项目

export default function PcProject({ props }: any) {
  const boxRef = useRef(null); // 引用滚动容器
  const navigate = useNavigate();

  // 检索值
  const [loding, setloding] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1); // 当前请求页数
  // 列表数据
  const [listData, setListData] = useState<any>([]);
  // function decodeBase64(base64Str: string) {
  //   const binaryString = atob(base64Str);
  //   const len = binaryString.length;
  //   const bytes = new Uint8Array(len);

  //   for (let i = 0; i < len; i++) {
  //     bytes[i] = binaryString.charCodeAt(i);
  //   }

  //   return new TextDecoder().decode(bytes);
  // }

  const getData = (name = searchValue, props: any) => {
    setloding(true);
    ProjectList({
      page: searchValue ? 1 : page,
      page_size: 100,
      name,
      ...props,
    }).then((res: any) => {
      setloding(false);
      if (res?.code !== 0) {
        message.error(res?.msg || "请求失败");
      }
      // console.log(atob(res?.data),'解64');
      // const newData = decodeBase64(res?.data);
      // console.log("解BEse64", newData);

      // const decryptedBytes = CryptoJS.AES.decrypt(
      //   newData,
      //   CryptoJS.enc.Utf8.parse("glt6h61ta7kisow7"),
      //   {
      //     iv: CryptoJS.enc.Utf8.parse("4hrivgw5s342f9b2"),
      //     mode: CryptoJS.mode.CBC, // 根据实际加密模式选择
      //     padding: CryptoJS.pad.Pkcs7, // 根据实际加密填充选择
      //   }
      // );
      // const jsonString = JSON.stringify(decryptedBytes);
      // const base64EncodedData = btoa(unescape(encodeURIComponent(jsonString)));
      // console.log("Base64 Encoded Data:", base64EncodedData);
      // const decodedData = atob(base64EncodedData);
      // console.log(decodedData);
      console.log(searchValue, "searchValue");
      if (searchValue) {
        setListData([...res?.data]);
      } else {
        if (res?.data.length == 0) {
          message.success('数据加载完成')
        }
        setListData((prevData: any) => [...prevData, ...res?.data]);
      }
    });
  };
  useEffect(() => {
    console.log(props);
    getData("", props);
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
                getData(searchValue, props);
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
