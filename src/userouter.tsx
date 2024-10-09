import { lazy, Suspense } from "react";
// import { createBrowserRouter } from "react-router-dom";
// import useTokenStore from "./store/token";

// 动态导入组件
const Personage = lazy(() => import("./widgets/page/Personage"));
const PcProject = lazy(() => import("./widgets/page/pcProject/index"));
const PcProjectDetails = lazy(() => import("./widgets/page/pcProject/details"));
// const Figure = lazy(() => import("./widgets/page/Figure")); //封装表格试列
// const USTD = lazy(() => import("./widgets/page/USTD.tsx"));
// const Systemlayout = lazy(() => import("./widgets/page/Systemlayout.tsx"));
const NotFound = lazy(() => import("./widgets/page/NotFound.tsx")); // 404 页面

// 获取用户信息
// const userInfo: any = useTokenStore.getState().userInfo;

// 路由配置
const routeConfig = [
  {
    path: "/",
    element: (
      <Suspense fallback={<div>⌛加载中...</div>}>
        <Personage />
      </Suspense>
    ),
  },
  {
    path: "/pcProject",
    element: (
      <Suspense fallback={<div>⌛加载中...</div>}>
        <PcProject />
      </Suspense>
    ),
  },
  {
    path: "/pcProject/details",
    element: (
      <Suspense fallback={<div>⌛加载中...</div>}>
        <PcProjectDetails />
      </Suspense>
    ),
  },
  // {
  //   path: "/ustd",
  //   element: (
  //     <Suspense fallback={<div>⌛加载中...</div>}>
  //       <USTD />
  //     </Suspense>
  //   ),
  // },
  // {
  //   path: "/systemlayout",
  //   element: (
  //     <Suspense fallback={<div>⌛加载中...</div>}>
  //       <Systemlayout />
  //     </Suspense>
  //   ),
  //   roles: ["管理员"], // 指定该路由的角色
  // },
  {
    path: "*", // 匹配所有未定义的路径
    element: (
      <Suspense fallback={<div>⌛加载中...</div>}>
        <NotFound />
      </Suspense>
    ),
  },
];

// 根据用户角色过滤路由
const filteredRoutes = routeConfig.filter((route) => {
  // if (!route.roles) return true;
  // return route.roles.includes(userInfo.username);
  return route
});

// 创建路由
// const route = createBrowserRouter(filteredRoutes);

export default filteredRoutes;
