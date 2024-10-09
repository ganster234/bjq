/*
 * @Author: yy
 * @Date: 2024-09-08 12:02:57
 * @LastEditTime: 2024-09-14 17:47:51
 * @LastEditors: yy
 * @Description: 
 */

import { useNavigate } from "react-router-dom";
import "./index.modules.less";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function PublicTitle({ hasgoBack = false, title = "详情" }) {
  // 当前路由实例
  const navigate = useNavigate();
  //标题点击返回路由
  const goBack = () => {
    navigate(-1);
  };
  return <div className="publicTitle">
    <div className="words" onClick={goBack}>
      {!!hasgoBack && <ArrowLeftOutlined />}
      <span>{title}</span>
    </div>
  </div>;
}