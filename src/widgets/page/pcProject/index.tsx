/*
 * @Author: yy
 * @Date: 2024-09-14 15:36:50
 * @LastEditTime: 2024-09-30 15:03:19
 * @LastEditors: yy
 * @Description: 
 */

import { memo, useState, useEffect, useRef } from "react";
import { Tabs, Input, Space, Button, message } from 'antd';
import {
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
// import { emunStatus } from "@/store/global";
import "./index.modules.less";

import { ProjectList } from "@/api/useApi";
import { useNavigate } from "react-router-dom";

const hotList = [
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
  {
    name: "游戏名称游戏名称游戏名称",
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    num: '0.6',
  },
]
// PC项目
export default function PcProject() {
  // 当前tab
  const [activeKey, setActiveKey] = useState('1');
  // 是否初始
  const isInit = useRef(false);
  const TabItems = [
    {
      key: '1',
      label: 'QQ项目',
      children: <TabListEl initKey={'1'} activeKey={activeKey} isInit={isInit} />,
    },
    {
      key: '2',
      label: 'WX项目',
      children: <TabListEl initKey={'2'} activeKey={activeKey} isInit={isInit} />,
    },
  ]
  return (
    <div className='pcProjectPage'>
      <Tabs activeKey={activeKey} items={TabItems} onChange={(key) => {
        setActiveKey(key);
        isInit.current = false;
      }} />
    </div>
  );
}
const TabListEl = memo(({
  initKey,
  activeKey,
  isInit,
}: {
  initKey: string,
  activeKey: string,
  isInit: any,
}) => {
  const navigate = useNavigate();

  // 检索值
  const [searchValue, setSearchValue] = useState('');
  // 列表数据
  const [listData, setListData] = useState<{
    create_time: number,
    id: number,
    img: string,
    is_qq: 1 | 2,
    name: string,
    price: string,
    status: number,
    update_time: number,
  }[]>([])

  const getData = (name = searchValue) => {
    ProjectList({
      page: 1,
      // TODO: 请求分页
      page_size: 3000,
      is_qq: initKey === '1' ? 1 : 2,
      name,
    }).then((res: any) => {
      if (res?.code !== 0) {
        message.error(res?.msg || '请求失败')
      }
      setListData([...res?.data || []]);
    })
  }
  useEffect(() => {
    if (!isInit.current) {
      isInit.current = true;
      // 初始请求
      getData();
    }
  })
  return <div>
    <div className="custom-search-head">
      <span className="custom-search-head-item mr-[30px]">
        <span className="custom-search-head-item-title w-[70px] mr-[12px] text-right">项目名称:</span>
        <Input
          className="w-[200px]"
          value={searchValue}
          placeholder="请输入项目名称"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }
          }
        />
      </span>

      <span className="custom-search-head-item">
        <Space className="mt-[10px]">
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => {
              getData();
            }}
          >
            查询
          </Button>
          <Button
            type="dashed"
            icon={<SyncOutlined />}
            onClick={() => {
              setSearchValue('');
              getData('');
            }}
          >
            重置
          </Button>
        </Space>
      </span>
    </div>
    <div className='list'>
      {
        listData.map((item, index) => {
          return <div className='listItem' key={index} onClick={() => {
            navigate('/pcProject/details', {
              state: {
                id: item.id
              },
            });
          }}>
            <img className='listImg' src={item.img} alt="" />
            <div className='listItemInfo'>
              <div className='listItemTitle'>{item?.name ?? ''}</div>
              <div className='listTextNum'>￥{item?.price ?? '--'} <span className='listTextUnit'>起</span> </div>
            </div>
          </div>
        })
      }
    </div>
  </div>
}, (pre, next) => {
  const {
    initKey: preInitKey,
    activeKey: preActiveKey,
  } = pre;
  const {
    activeKey: nextActiveKey,
  } = next;
  return preInitKey !== nextActiveKey;
});
