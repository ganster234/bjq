/*
 * @Author: yy
 * @Date: 2024-09-14 13:09:57
 * @LastEditTime: 2024-09-26 13:34:47
 * @LastEditors: yy
 * @Description:
 */
import { useState, useRef, useEffect } from "react";
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
import Modaltow from "@/component/Modaltow";
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
  const refDom = useRef<{ popupstate?: (state: boolean) => void }>(null);
  // const [amplification, setamplification] = useState(false); //是否放大页面
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const isHomePage = location.pathname === "/";
  useEffect(() => {
    moldoffNo(true);
  }, []);
  const moldoffNo = (val: boolean) => {
    if (refDom.current && refDom.current.popupstate) {
      refDom.current.popupstate(val);
    }
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Modaltow
        configuration={{
          isDismissable: true, //是否点击遮罩层关闭弹窗
          radius: "md", //圆角
          placement: "center", //弹窗打开位置
          size: "4xl", //弹窗大小
          backdrop: "opaque", //遮罩背景
          hideCloseButton: true, //是否隐藏关闭按钮
          Header: "",
          footrBut: "",
          Bodyclass: "p-0",
        }}
        ref={refDom}
      >
        <div className="maybody">
          <img className=" Informtogether " src="/Informtogether.png" alt="" />
          <div className="announcement-box">
            <p className="h1">网站公告</p>
            <div className="announcement-content">
              <p className="mb-4">
                🎉
                欢迎来到籽逗比价器！本站是我在闲暇时间采集爬取的宝贵资源。现开启意见大征集，有缺少的项目或者发现的新网站资源(包括发卡网)，可以联系我的✈️。因小编还有正式工作在身，不一定能立刻回复，但一定会尽快处理你的需求。大家提供更多的网站采集资源和项目，目的是让价格公开透明，我们所有的用户就可以去找网站主谈价格了！
                这是让你们赢麻了的利器！{" "}
              </p>
              <div className="announcement-item">
                <h2>
                  <span className="icon">📢</span> 免费公开原则
                </h2>
                <p>
                  网站非盈利性质，我始终秉持着免费公开的原则，不向大家收取任何费用，网站不保留任何信息，请大家自行存储，因网站为非盈利所以无法一直存储信息，请个人妥善保存
                </p>
              </div>
              <div className="announcement-item">
                <h2>
                  <span className="icon">🚀</span> 功能限制说明
                </h2>
                <p>
                  网站功能分为比价和协议强开，比价功能主要是对各个相关网站的价格对比，让你能看到全网最低价。协议强开鉴于个人经济条件限制，网站目前使用的协议只🉑同时强开30个项目。因此，在添加新资源时，可能会根据资源的热门程度、用户需求等因素进行排序。如果对某个特定资源有迫切需求，也可以联系✈️，我会在空闲时刻立刻添加。
                </p>
              </div>
              <div className="announcement-item">
                <h2>
                  <span className="icon">💼</span> 广告推广服务
                </h2>
                <p>
                  网站非盈利性质，如果有广告推广需求的用户(这里可能指的各个推广站，日后我是会加评论功能的哦，让所有人看到服务态度还有网站是否有货，特别是你会不会跑路，😭因为小编就是被跑路毒害)。请通过✈️方式联系我。广告推广将收取一定的费用，用于维护网站。收集不易，感谢每一位用户的理解与支持！
                  <br />
                  等我🈶大块假期的时候我会采集更详细，让我们一起努力，把他们变成🥬
                </p>
                <p className="mt-2">联系方式：飞机号 @zidoubijiaqi</p>
              </div>
            </div>
          </div>
          <div className=" flex justify-end ">
            <button onClick={() => moldoffNo(false)} className="confirm-btn">
              确定
            </button>
          </div>
        </div>
      </Modaltow>
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
