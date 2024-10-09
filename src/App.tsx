/*
 * @Author: yy
 * @Date: 2024-09-14 13:09:57
 * @LastEditTime: 2024-09-18 15:20:04
 * @LastEditors: yy
 * @Description: 
 */
import Afterlogging from "./widgets/Afterlogging";
// import LoginEnroll from "./widgets/LoginEnroll";
// import LoginEnrolltow from "./widgets/LoginEnrolltow"; //第二个登录（山)
// import LoginEnrollthree from './widgets/LoginEnrollthree'  //第三登录 （小圆点）

// import useTokenStore from "./store/token";
import zhCN from "antd/locale/zh_CN";
import { ConfigProvider } from "antd"; //配置国际化
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ConfigProvider locale={zhCN} theme={{
      token: {
        colorPrimary: "#7E52FD",
      }
    }}>
      {/* {!useTokenStore.getState().token ? (
        <LoginEnrolltow></LoginEnrolltow>
      ) : (
        <LoginEnroll></LoginEnroll>
        <Afterlogging></Afterlogging>
      )} */}
      <Router>
        <Routes>
          <Route path="/*" element={<Afterlogging />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
