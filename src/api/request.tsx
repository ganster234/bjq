/*
 * @Author: yy
 * @Date: 2024-09-18 09:04:36
 * @LastEditTime: 2024-09-25 14:33:35
 * @LastEditors: yy
 * @Description:
 */
export const base = import.meta.env.PROD
  ? // ? "http://47.96.77.255:9460/v1" //测试环境
    "https://api.bijia109.com/v1" //生产环境
  : "http://192.168.1.59:9016/v1"; //开发环境
// "https://api.bijia109.com/v1";

/**
 * 请求函数
 *
 * @export
 * @template R
 * @param {("GET" | "POST" | "PUT" | "PATCH" | "DELETE")} method
 * @param {string} url
 * @param {*} [data]
 * @param {("json" | "form")} [dataType="json"] 请求体的数据类型 POST PUT PATCH
 * @param {("json" | "text" | "blob")} [returnType="json"] 返回值的数据类型
 * @return {*}
 */
import { message } from "antd";
import useTokenStore from "@/store/token";

export default function request<R>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  data?: any,
  dataType: "json" | "form" = "json",
  returnType: "json" | "text" | "blob" = "json"
) {
  let config: any = {
    method,
    headers: {
      // Authorization: "bearer " + useTokenStore.getState().token,
      Token: useTokenStore.getState().token,
    },
  };
  if (!["GET", "DELETE"].includes(method)) {
    if (dataType === "json") {
      config.body = JSON.stringify(data);
      config.headers["Content-Type"] = "application/json";
    } else {
      config.body = new FormData();
      for (let key in data) {
        config.body.append(key, data[key]);
      }
    }
  } else if (method === "GET" && data) {
    //处理GET请求
    const params = new URLSearchParams(data).toString();
    url += `?${params}`;
  }
  ///////////////////////////////////////////方法一抛错式登录过期///////////////////////////////////////////////////
  // return fetch(`${base}${url}`, config).then((res) => {
  //   if (res.status >= 200 && res.status < 400) {
  //     return res[returnType]();
  //   } else {
  //     return res.text().then((err) => {
  //       console.log(err, "err");
  //       if (res.status === 401) {
  //         //登录过期状态   清空token
  //         // useTokenStore.getState().changeToken("");
  //       }
  //       // toast("danger", err);
  //       return Promise.reject(err);
  //     });
  //   }
  // }) as Promise<R>;
  ///////////////////////////////////////////方法二请求体式返回状态码登录过期///////////////////////////////////////////////////
  return fetch(`${base}${url}`, config).then(async (res) => {
    // 在这里将响应体转换为 JSON 格式
    const responseData = await res.json();
    console.log(res, "res-------");

    if (res.status >= 200 && res.status < 400) {
      // 返回已经解析的 JSON 数据
      if (responseData.code === 40003) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      // 如果不等于200，说明请求后端判断，弹出后端返回错误信息
      if (responseData.code !== 0) {
        message.warning(responseData.msg);
      }
      return responseData;
    } else {
      // 在处理错误时使用 responseData
      console.log(responseData, "errorData");

      // 这里可以继续使用 responseData 处理其他逻辑
      // ...
      // 返回 Promise.reject(responseData) 表示请求失败
      return Promise.reject(responseData);
    }
  }) as Promise<R>;
}
