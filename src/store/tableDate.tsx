/*
 * @Author: yy
 * @Date: 2024-09-18 09:04:36
 * @LastEditTime: 2024-09-26 13:31:31
 * @LastEditors: yy
 * @Description: 
 */
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
    label: "PC项目",
    key: "/pcProject",
  },
  // {
  //   key: "/setpassword",
  //   label: "账号绑定",
  // },
];
