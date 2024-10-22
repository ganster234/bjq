import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTokenStore from "@/store/token";
// import { getQkperjct, lasttime } from "@/api/useApi";
import Article from "./component/Article"; //强开项目
// import ForceList from "./component/ForceList"; //强开列表
export default function Forceopening() {
  useEffect(() => {
    console.log("21574", useTokenStore.getState().token);
    if (useTokenStore.getState().token) {
      console.log("已经登录");
    } else {
      navigate("/login");
    }
  }, []);
  const navigate = useNavigate();

  return (
    <div>
      <Article></Article>
      {/* <ForceList></ForceList> */}
    </div>
  );
}
