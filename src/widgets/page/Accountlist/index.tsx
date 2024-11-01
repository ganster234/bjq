import { useEffect, useRef, useState, useMemo } from "react";
import { Input, Button, Tooltip, message } from "antd";
import TableView from "@/component/TableView";
import { qkList } from "@/store/tableDate";
import { amustList } from "@/api/useApi";
import { exportToTxt } from "@/store/utile";
export default function Forceopening() {
  const TalbeRef: any = useRef(null); //表格dom
  const [name, setname] = useState("");
  const [updatae, setupdatae] = useState([]); //选择后过滤数据
  const [querystatus, setquerystatus] = useState(false);

  useEffect(() => {}, []);
  const compile = (val: any) => {
    // console.log("54_ww", val, "嗡嗡嗡", TalbeRef?.current.state.dataList);
    const filterArr = TalbeRef?.current.state.dataList.filter((item: any) =>
      val.includes(item.username)
    );
    setupdatae(filterArr);
  };
  const exportTex = async () => {
    if (querystatus && updatae.length > 0) {
      exportToTxt(updatae, "导出文件");
    } else {
      message.warning("请至少输入一个关键词查询且勾选项目数据，方可导出");
    }
  };
  return (
    <div>
      <div className="flex">
        <Input
          className=" w-[200px] "
          placeholder="项目名称查询"
          value={name}
          onChange={(val) => setname(val.target.value)}
          allowClear
        ></Input>
        <Button
          className=" mx-2 "
          type="primary"
          onClick={() => {
            if (name) {
              setquerystatus(true);
            } else {
              setquerystatus(false);
            }
            TalbeRef?.current.setSelectedRowKeys([]);
            TalbeRef?.current?.queryList({
              name,
            });
          }}
        >
          查询
        </Button>
        <Button
          onClick={() => {
            setquerystatus(false);
            TalbeRef?.current?.resetList();
            setname("");
          }}
        >
          重置
        </Button>
        <Button onClick={exportTex} className=" ml-3 " danger type="primary">
          导出
        </Button>
      </div>
      <TableView
        ref={TalbeRef}
        compile={compile}
        api={amustList}
        rowKey={"username"}
        size={10}
        rowSelectionKey={true}
        optionsPagintion={true}
        columns={[
          {
            title: "项目",
            dataIndex: "app_name",
            render: (record: any) => (
              <div>
                <Tooltip placement="bottom" title={record}>
                  <div className="  text-primary-500 cursor-pointer  hover:text-[red] ">
                    查看
                  </div>
                </Tooltip>
              </div>
            ),
          },
          ...qkList,
        ]}
      />
    </div>
  );
}
