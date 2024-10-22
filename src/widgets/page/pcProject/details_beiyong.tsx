/*
 * @Author: yy
 * @Date: 2024-09-18 09:04:36
 * @LastEditTime: 2024-09-29 11:21:20
 * @LastEditors: yy
 * @Description:
 */
/*
 * @Author: yy
 * @Date: 2024-09-14 17:02:19
 * @LastEditTime: 2024-09-18 09:57:54
 * @LastEditors: yy
 * @Description:
 */
import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Input, Space, Button, message } from "antd";
import { SearchOutlined, SyncOutlined } from "@ant-design/icons";
// import { emunStatus } from "@/store/global";
import PublicNavTitle from "@/component/PublicNavTitle";
import "./index.modules.less";
import TableView from "@/component/TableView";

import { ProjectDetails } from "@/api/useApi";

// PC项目详情
export default function PcProjectDetails() {
  // 获取路由参数

  const { state } = useLocation();
  const { id: price_id } = state ?? {};
  // 检索值
  const [searchValue, setSearchValue] = useState("");
  // 表格实例
  const TalbeRef: any = useRef(null);
  const columns = [
    {
      title: "项目",
      dataIndex: "img",
      key: "img",
      render: (text: string) => {
        return (
          <img
            src={text}
            alt=""
            style={{
              maxWidth: "100px",
              maxHeight: "50px",
            }}
          />
        );
      },
    },
    {
      title: "项目名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "来源网站",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "金额(起)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "网址",
      dataIndex: "url",
      key: "url",
      render: (text: any) => {
        return (
          <div
            style={{
              color: "#409fff",
              cursor: "pointer",
            }}
            onClick={() => {
              window.open(text);
            }}
          >
            {text}
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    ProjectDetails({
      price_id,
      package_id: 10000,
      name: searchValue,
    });
  }, []);
  return (
    <div className="pcProjectPage">
      <PublicNavTitle hasgoBack title={"返回"} />
      <div className="custom-search-head mt-[20px] mb-[20px]">
        {/* <span className="custom-search-head-item mr-[30px]">
                    <span className="custom-search-head-item-title w-[70px] mr-[12px] text-right">价格:</span>
                    <Select
                        fieldNames={{
                            label: "label",
                            value: "value",
                        }}
                        className="w-[200px]"
                        placeholder="请选择价格"
                        options={emunStatus}
                        onChange={(even) => {
                        }}
                    />
                </span>
                <span className="custom-search-head-item mr-[30px]">
                    <span className="custom-search-head-item-title w-[70px] mr-[12px] text-right">价格:</span>
                    <Select
                        fieldNames={{
                            label: "label",
                            value: "value",
                        }}
                        className="w-[200px]"
                        placeholder="请选择价格"
                        options={emunStatus}
                        onChange={(even) => {
                        }}
                    />
                </span> */}
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
                TalbeRef?.current?.queryList();
              }}
            >
              查询
            </Button>
            <Button
              type="dashed"
              icon={<SyncOutlined />}
              onClick={() => {
                TalbeRef?.current?.resetList();
              }}
            >
              重置
            </Button>
          </Space>
        </span>
      </div>
      <div>
        
      </div>
      {/* <TableView
        xScroll={700}
        ref={TalbeRef}
        api={(data: any) =>
          ProjectDetails({
            ...data,
            price_id,
            package_id: 10000,
            name: searchValue,
          })
        }
        rowKey={"id"}
        optionsPagintion={true}
        columns={[...columns]}
      /> */}
    </div>
  );
}
