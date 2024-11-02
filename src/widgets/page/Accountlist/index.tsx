import { useEffect, useRef, useState, useMemo } from "react";
import { Input, Button, Tooltip, message } from "antd";
import TableView from "@/component/TableView";
import { qkList } from "@/store/tableDate";
import { amustList } from "@/api/useApi";
import { exportToTxt } from "@/store/utile";
import Modaltow from "@/component/Modaltow";
import { useWindowWidth } from "@/store/utile";
export default function Forceopening() {
  const TalbeRef: any = useRef(null); //表格dom
  const [name, setname] = useState("");
  const [updatae, setupdatae] = useState([]); //选择后过滤数据
  const [loookxm, setloookxm] = useState([]); //查看项目
  const [querystatus, setquerystatus] = useState(false);
  const refDom = useRef<{ popupstate?: (state: boolean) => void }>(null);
  const windowWidth = useWindowWidth(); //监听页面宽度
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
  const lookover = (item: string) => {
    //查看详情
    const arr: any = item.split(",");
    setloookxm(arr);
    if (refDom.current && refDom.current.popupstate) {
      refDom.current.popupstate(true);
    }
  };
  return (
    <div>
      <Modaltow
        configuration={{
          isDismissable: true, //是否点击遮罩层关闭弹窗
          radius: "sm", //圆角
          placement: "center", //弹窗打开位置
          size: "lg", //弹窗大小
          backdrop: "opaque", //遮罩背景
          hideCloseButton: false, //是否隐藏关闭按钮
          Header: "详情",
          footrBut: "",
        }}
        ref={refDom}
      >
        <div className=" max-h-[70vh] overflow-auto ">
          <ul className=" mb-4 ">
            {[...loookxm].map((item: string, index: number) => (
              <li className="my-2 p-2 bg-[#f9f3ff]  text-center " key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Modaltow>
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
      <p
        className="bg-[#20222a] text-white p-2 my-2 rounded-md "
        style={{ lineHeight: "25px" }}
      >
        温馨提示：
        <br />
        &nbsp;&nbsp;
        1：一个账号根据开通的项目数量生成多个卡密，如一个账号强开10个项目那么会生成10个卡密以此类推（这是防止账号泄露导致项目被登录）
        <br />
        &nbsp;&nbsp;
        2：若想导出卡密请至少输入一个项目名称关键词点击查询且勾选项目数据，点击导出方可导出txt文件格式的卡密
      </p>
      <TableView
        xScroll={700}
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
                  {windowWidth < 600 ? (
                    <div
                      onClick={() => lookover(record)}
                      className="text-primary-500 cursor-pointer  hover:text-[red] "
                    >
                      查看
                    </div>
                  ) : (
                    <div
                      onClick={() => lookover(record)}
                      style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                      className=" overflow-hidden  text-primary-500 cursor-pointer  hover:text-[red] "
                    >
                      {record}
                    </div>
                  )}
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
