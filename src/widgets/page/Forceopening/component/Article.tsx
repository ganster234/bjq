import { useEffect, useRef, useState } from "react";
import { getQkperjct, openlist, lasttime } from "@/api/useApi";
import { qkList } from "@/store/tableDate";
import Modaltow from "@/component/Modaltow";
import { Button, Select, Radio, Input, message, Tooltip } from "antd";
import TableView from "@/component/TableView";
export default function Forceopening() {
  // 强开项目
  const { TextArea } = Input;
  const refDom = useRef<{ popupstate?: (state: boolean) => void }>(null);
  const TalbeRef: any = useRef(null); //表格dom
  const articleDom: any = useRef(null); //项目详情DOM
  const [sletleTbale, setsletleTbale] = useState([]); //强开项目选项LIST
  const [afterchoice, setafterchoice] = useState([]); //选择强开项目过后
  const [loookxm, setlookxm] = useState([]); //查看项目
  const [type, settype] = useState(1); //类型
  const [text, settext] = useState(""); //62/A16

  useEffect(() => {
    getQkperjct({}).then((res: any) => {
      //查询选择强开项目
      console.log(res, "xxxxx");
      if (res.code === 0) {
        const output = res.data.map((item: any) => ({
          value: item.id,
          label: item.name,
        }));
        setsletleTbale(output);
      }
    });
  }, []);
  const affirm = () => {
    //确定按钮点击函数
    if (afterchoice.length == 0 || text == "") {
      message.warning("请填写完整内容");
    } else {
      lasttime({ type, app_id: afterchoice.join(","), text }).then(
        (res: any) => {
          if (res.code === 0) {
            // console.log(res, "wwwww");
            message.success("操作成功");
            TalbeRef?.current?.queryList();
          }
        }
      );
    }
  };
  const copy = (data: string) => {
    //data需要复制的内容
    let copyInput = document.createElement("input"); //创建input元素
    document.body.appendChild(copyInput); //向页面底部追加输入框
    copyInput.setAttribute("value", data); //添加属性，将url赋值给input元素的value属性
    copyInput.select(); //选择input元素
    document.execCommand("Copy"); //执行复制命令
    message.destroy();
    message.success("复制成功");
    //复制之后再删除元素，否则无法成功赋值
    copyInput.remove(); //删除动态创建的节点
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          if (refDom.current && refDom.current.popupstate) {
            refDom.current.popupstate(true);
          }
        }}
      >
        上传强开
      </Button>
      <TableView
        xScroll={460}
        ref={TalbeRef}
        api={openlist}
        rowKey={"id"}
        size={10}
        rowSelectionKey={false}
        optionsPagintion={true}
        columns={[
          {
            title: "查看项目",
            dataIndex: "app_name",
            render: (record: any) => (
              <div
                onClick={() => {
                  console.log(record, "record");
                  setlookxm(record);
                  if (articleDom.current && articleDom.current.popupstate) {
                    articleDom.current.popupstate(true);
                  }
                }}
                className=" text-[12px] text-primary-500 cursor-pointer  hover:text-[red] "
              >
                查看
              </div>
            ),
          },
          {
            title: "状态",
            dataIndex: "status",
            render: (record: number) => (
              <div
                className={
                  record == 1
                    ? " text-success-500 "
                    : record == 2
                    ? " text-danger-500 "
                    : ""
                }
              >
                {record == 0
                  ? "进行中"
                  : record == 1
                  ? "成功"
                  : record == 2
                  ? "失败"
                  : "-"}
              </div>
            ),
          },
          {
            title: "订单号",
            dataIndex: "order_id",
            render: (record: string) => (
              <Tooltip placement="bottom" title={record}>
                <div
                  className=" text-[12px] text-primary-500 cursor-pointer  hover:text-[red] "
                  onClick={() => copy(record)}
                >
                  复制
                </div>
              </Tooltip>
            ),
          },
          ...qkList,
        ]}
      />
      <Modaltow
        configuration={{
          isDismissable: true, //是否点击遮罩层关闭弹窗
          radius: "sm", //圆角
          placement: "center", //弹窗打开位置
          size: "sm", //弹窗大小
          backdrop: "opaque", //遮罩背景
          hideCloseButton: false, //是否隐藏关闭按钮
          Header: "项目详情",
          footrBut: "",
        }}
        ref={articleDom}
      >
        <ul className=" mb-4 ">
          {loookxm.map((item, index) => (
            <li className=" my-2  p-2 bg-[#f9f3ff]  text-center " key={index}>
              {item}
            </li>
          ))}
        </ul>
      </Modaltow>
      <Modaltow
        configuration={{
          isDismissable: false, //是否点击遮罩层关闭弹窗
          radius: "md", //圆角
          placement: "center", //弹窗打开位置
          size: "3xl", //弹窗大小
          backdrop: "opaque", //遮罩背景
          hideCloseButton: false, //是否隐藏关闭按钮
          Header: "上传强开",
          footrBut: "确认按钮",
        }}
        affirm={affirm} //确定按钮点击函数
        ref={refDom}
      >
        <ul>
          <li className=" flex items-center ">
            <p className=" text-[14px] ">强开项目：</p>
            <Select
              mode="multiple"
              showSearch
              className=" w-[80%] "
              placeholder="搜索选择"
              onChange={(val) => setafterchoice(val)}
              filterOption={(input, option: any) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[...sletleTbale]}
            />
          </li>
          <li className="my-5 flex items-center">
            <p>强开类型：</p>
            <Radio.Group
              onChange={(val) => settype(val.target.value)}
              value={type}
            >
              <Radio value={1}>IOS</Radio>
              <Radio value={2}>Android</Radio>
            </Radio.Group>
          </li>
          <li className="flex ">
            <p>{type === 2 ? "A16" : "62"}数据：</p>
            <TextArea
              value={text}
              onChange={(val) => settext(val.target.value)}
              rows={8}
              placeholder="账号----密码"
            />
          </li>
        </ul>
      </Modaltow>
    </div>
  );
}