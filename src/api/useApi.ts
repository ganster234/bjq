import request from "./request";
interface UserInfotype {
  page: number | string;
  pageSize: number | string;
  account?: string;
}

export const detailsMost = (data: any) => {
  //金额列表
  return request("GET", `/open/get/open/info?order_id=${data.order_id}`);
};

export const openlist = (data: any) => {
  //获取强开列表
  return request(
    "GET",
    `/open/get/open/list?page=${data.page}&page_size=${data.pageSize}`
  );
};
export const getQkperjct = (data: any) => {
  //获取强开项目下拉选择
  return request("GET", "/open/get/price", data);
};
export const lasttime = (data: any) => {
  //上传强开
  return request("POST", "/open/add/open", data);
};

export const Login = (data: any) => {
  //登录
  return request("POST", "/user/login", data);
};
export const register = (data: any) => {
  //注册
  return request("POST", "/user/register", data);
};
export const moneyList = (data: UserInfotype) => {
  //金额列表
  return request(
    "GET",
    `/user/account/order_list?page=${data.page}&page_size=${
      data.pageSize
    }&account=${data.account ? data.account : ""}`
  );
};

// 项目列表请求参数

export const ProjectList = (data: any) => {
  //PC项目列表
  return request(
    "GET",
    `/project/get/all?page=${data.page}&page_size=${data.page_size}&is_qq=${
      data.is_qq
    }&is_app=${data.is_app}&is_web=${data.is_web}&is_mini=${
      data.is_mini || 0
    }&name=${data?.name}`
  );
};

// 项目列表详情请求参数
interface ProjectDetailsType {
  // 项目id
  price_id: number;
  // 套餐 10000日卡 10001 周卡 10002 月卡
  package_id: 10000 | 10001 | 10002;
}

export const ProjectDetails = (data: ProjectDetailsType) => {
  //PC项目列表详情
  return request(
    "GET",
    `/project/get/info?price_id=${data.price_id}&package_id=${data.package_id}`
  );
};
