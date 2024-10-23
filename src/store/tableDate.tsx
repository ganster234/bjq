/*
 * @Author: yy
 * @Date: 2024-09-18 09:04:36
 * @LastEditTime: 2024-09-26 13:31:31
 * @LastEditors: yy
 * @Description:
 */
export const qkList = [
  {
    title: "账号",
    dataIndex: "username",
  },
  {
    title: "创建时间",
    dataIndex: "create_time",
    render: (record: string) => <div className=" text-[11px] ">{record}</div>,
  },
];
export const payColumns = [
  {
    title: "账号",
    dataIndex: "account",
  },
  {
    title: "状态",
    dataIndex: "status",
  },
  {
    title: "平台号",
    dataIndex: "price",
  },
];
export const Figuretable = [
  {
    title: "状态",
    dataIndex: "status",
    render: (record: number) => <>{record == 1 ? "处理完成" : record}</>,
  },
  {
    title: "账户",
    dataIndex: "account",
    render: (record: number) => <>{record || "-"}</>,
  },
];
export const menus_List = [
  //手机端菜单
  {
    label: "首页",
    key: "/",
  },
  {
    label: "Q-网页项目",
    key: "/webpage",
  },
  {
    label: "Q-APP项目",
    key: "/qapppage",
  },
  {
    label: "WX-网页项目",
    key: "/wwebpage",
  },
  {
    label: "WX-APP项目",
    key: "/wqapppage",
  },
  {
    label: "WX-小程序项目",
    key: "/smallprogram",
  },
  // {
  //   label: "强开列表",
  //   key: "/forceopening",
  // },
  // {
  //   key: "/setpassword",
  //   label: "账号绑定",
  // },
];
