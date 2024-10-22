/*
 * @Author: yy
 * @Date: 2024-09-14 13:09:57
 * @LastEditTime: 2024-09-26 13:34:47
 * @LastEditors: yy
 * @Description:
 */
import { useState } from "react";
import { Route, useNavigate, useLocation, Routes } from "react-router-dom";
import { Layout, theme, Popover } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import useTokenStore from "@/store/token";
import { Button } from "@nextui-org/react";
import { menus_List } from "@/store/tableDate";
const { Header, Sider, Content } = Layout;
import route from "../userouter";
import PackingMu from "@/component/Menu";
import "./Afterlogging.modules.less";
import { usebegin } from "@/store/contextmodel";
import {
  // goFullScreen, exitFullScreen,
  useWindowWidth,
} from "@/store/utile";

const Afterlogging = () => {
  const takestore: any = usebegin();
  const navigate = useNavigate();
  const location = useLocation();

  const windowWidth = useWindowWidth(); //监听页面宽度
  const [routeUrl, setrouteUrl] = useState(""); //路由信息(手机端点击搞亮)
  const [collapsed, setCollapsed] = useState(false); //菜单关闭与展开
  // const [amplification, setamplification] = useState(false); //是否放大页面
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const isHomePage = location.pathname === "/";
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {windowWidth > 600 ? (
        <Sider
          style={{ background: "#20222a" }}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <PackingMu coll={collapsed}></PackingMu>
        </Sider>
      ) : (
        <></>
      )}
      <Layout>
        <Header
          className=" w-full flex items-center justify-between"
          style={{ padding: 0, background: colorBgContainer }}
        >
          {windowWidth > 600 ? (
            <Button
              onClick={() => setCollapsed(!collapsed)}
              className="bg-transparent w-[64px] h-[64px] text-[18px]"
              style={{
                border: "none",
              }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
          ) : (
            <Popover
              trigger="click"
              content={
                <ul>
                  {menus_List.map((item, index) => (
                    <li
                      className="my-2 flex justify-center items-center"
                      key={index}
                    >
                      <Button
                        style={{
                          padding: "8px 12px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          border: "none",
                        }}
                        className={
                          item.key == routeUrl
                            ? "bg-[#9dbffa6b] transition-all"
                            : "bg-transparent transition-all"
                        }
                        onClick={() => {
                          setrouteUrl(item.key);
                          navigate(item.key);
                        }}
                      >
                        {item.label}
                      </Button>
                    </li>
                  ))}
                </ul>
              }
            >
              <Button
                className=" bg-transparent  text-[20px]"
                style={{
                  border: "none",
                }}
              >
                <MenuFoldOutlined />
              </Button>
            </Popover>
          )}
          {useTokenStore.getState().token && (
            <div className="w-[50%] mr-[34px] flex items-center justify-end">
              <p className=" mr-4 ">你好，{takestore.user.username}</p>
              <p
                onClick={() => {
                  //退出登录
                  navigate("/");
                  localStorage.clear();
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
                className="logOff cursor-pointer hover:text-[red]"
              >
                <LogoutOutlined />
                &nbsp; 退出
              </p>
            </div>
          )}
        </Header>
        <div className="asideTips">
          本网站为服务型网站，只提供项目价格对比，不售卖任何商品。购买时会跳转至其原本的网站。
        </div>
        <Content
          style={{
            // margin: windowWidth > 600 ? "24px 16px" : "8px",
            padding: isHomePage ? "" : windowWidth > 600 ? 24 : 8,
            height: "calc(100vh - 112px)",
            overflowY: "auto",
            background: isHomePage ? "" : colorBgContainer,
          }}
        >
          {/* <RouterProvider router={route} /> */}
          <Routes>
            {route.map(
              (item) =>
                item.element && (
                  <Route
                    key={item.path}
                    path={item.path}
                    element={item.element}
                  />
                )
            )}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Afterlogging;
