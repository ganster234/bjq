import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import route from "../userouter";
import styled from "@emotion/styled";
import useTokenStore from "@/store/token";
import { useLocation, useNavigate } from "react-router-dom";

const MyMenu = styled(Menu)`
  background-color: #20222a;
  .ant-menu-item {
    color: white;
  }
  .ant-menu-submenu-title {
    color: white;
  }
  .ant-menu-item-selected {
    background-color: #f1f0ff !important;
    border-radius: 0px;
    color: #453bc8 !important;
    border-left: 4px solid #695dff;
  }
  .ant-menu-item-active {
    border-radius: 0px;
    color: #2773f2 !important;
  }
`;

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): any => ({
  key,
  icon,
  children,
  label,
  type,
});
export interface Menu_Item {
  label: string;
  key: string;
  icon?: string;
}
export const menuConfig = [
  {
    label: "首页",
    key: "/",
    icon: "icon1",
  },
  {
    label: "Q项目",
    icon: "setpasswd",
    children: [
      {
        label: "网页项目",
        icon: "",
        key: "/webpage",
      },
      {
        label: "APP项目",
        icon: "",
        key: "/qapppage",
      },
    ],
  },
  {
    label: "WX项目",
    icon: "setpasswd",
    children: [
      {
        label: "网页项目",
        icon: "",
        key: "/wwebpage",
      },
      {
        label: "APP项目",
        icon: "",
        key: "/wqapppage",
      },
      {
        label: "小程序项目",
        icon: "",
        key: "/smallprogram",
      },
      {
        label: "试玩项目",
        icon: "",
        key: "/demo",
      },
    ],
  },

  {
    label: "强开列表",
    key: "/forceopening",
    icon: "icon2",
  },
  {
    label: "账号列表",
    key: "/accountlist",
    icon: "icon4",
  },
];
const PackingMu = (props: { coll: boolean }) => {
  const navigate = useNavigate();
  const userInfo: any = useTokenStore.getState().userInfo;
  const [openKeys, setOpenKeys] = useState([window.location.pathname]);

  const generateMenuItems = (itemsConfig: any, openKeys: any) => {
    return itemsConfig
      .filter(
        (item: any) => !item.roles || item.roles.includes(userInfo.username)
      )
      .map((item: any) => {
        const iconPath =
          openKeys[0] === item.key ? `after${item.icon}` : item.icon;
        const children = item.children
          ? generateMenuItems(item.children, openKeys)
          : undefined;
        return getItem(
          item.label,
          item.key,
          <img
            className="w-[14px] h-[14px]"
            src={item.icon ? `/MenuIcon/${iconPath}.png` : ""}
          />,
          children
        );
      });
  };

  const menuItems = generateMenuItems(menuConfig, openKeys);

  const handleMenuClick = (el: { key: string; keyPath: string[] }) => {
    setOpenKeys(el.keyPath);
    navigate(el.key);
  };

  return (
    <div>
      <div className="text-white text-md mb-2 border-b-1 border-white bg-[#20222a] font-extrabold flex justify-center h-[64px] items-center">
        {!props.coll ? (
          <img className="w-[76%]" src="/homeicon.png" alt="" />
        ) : (
          <div className="cube-box48">
            <div className="cube48">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>
      <MyMenu
        mode="inline"
        theme="light"
        defaultSelectedKeys={openKeys}
        defaultOpenKeys={openKeys}
        items={menuItems}
        onClick={handleMenuClick}
      />
    </div>
  );
};

export default PackingMu;
