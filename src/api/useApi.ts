import request from "./request";
interface UserInfotype {
  page: number | string;
  pageSize: number | string;
  account?: string;
}


export const Login = (data: any) => {
  //登录
  return request("POST", "/v1/login", data);
};
export const register = (data: any) => {
  //注册
  return request("POST", "/v1/register", data);
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
interface ProjectListType {
  page: number | string;
  page_size: number | string;
  // 1 q 2 w
  is_qq: 1 | 2;
  // 项目名称
  name?: string;
}
export const ProjectList = (data: ProjectListType) => {
  //PC项目列表
  return request(
    "GET",
    `/project/get/all?page=${data.page}&page_size=${
      data.page_size
    }&is_qq=${data.is_qq}&name=${data?.name}`
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
    `/project/get/info?price_id=${data.price_id}&package_id=${
      data.package_id
    }`
  );
};
