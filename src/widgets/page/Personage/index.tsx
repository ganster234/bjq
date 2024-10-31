import { Carousel } from "antd";
import "./index.modules.less";
import { useWindowWidth } from "@/store/utile";
import { useEffect, useState } from "react";
import { homePage } from "@/api/useApi";
import { decryptData } from "@/store/utile";
import dayjs from "dayjs";
import { Tabs, Tab } from "@nextui-org/react";

// 首页
export default function Personage() {
  const windowWidth = useWindowWidth(); //监听页面宽度
  const colorArr = ["#F9ECD7", "#D4E3F7", "#F9D6D9"];
  const [leftDate, setleftDate] = useState<any>([]);
  const [rigtDate, setrigtDate] = useState<any>([]);
  useEffect(() => {
    homePage({ is_sort: 1 }).then((res: any) => {
      //左边
      if (res.code === 0) {
        const decryptedData = decryptData(res?.data);
        // console.log(decryptedData, "llllllllllllllllllllf");
        setleftDate(decryptedData);
      }
    });
    homePage({ is_sort: 2 }).then((res: any) => {
      //右边
      if (res.code === 0) {
        const decryptedData = decryptData(res?.data);
        // console.log(decryptedData, "rrrrrrrrrrrrrrrrrrt");
        setrigtDate(decryptedData);
      }
    });
  }, []);
  return (
    <div className="homePage">
      <Carousel
        className="swiperContainer"
        autoplay
        adaptiveHeight
        autoplaySpeed={5000}
        draggable
        infinite
      >
        {[0, 1, 2].map((item) => (
          <img
            key={item}
            // className=" w-[100%] "
            src={
              windowWidth > 600
                ? `/banner${item}.png`
                : `/phonebanner${item}.svg`
            }
            alt=""
          />
        ))}
      </Carousel>

      {windowWidth > 850 ? (
        <div className="content">
          <div className="contentItem">
            <div className="contentItemTitle">点击热度排行</div>
            <div className="contentItemList contentItemList1">
              {leftDate.map((item: any, index: number) => {
                const defaultIndexColor = "#F2F8FF";
                const indexColor = colorArr[index] ?? defaultIndexColor;
                return (
                  <div
                    className={"ListItem"}
                    style={{
                      background: `linear-gradient(to right, ${
                        item?.img ? indexColor : defaultIndexColor
                      }, transparent 40%)`,
                    }}
                    key={index}
                  >
                    <div className="ListItemIndex">
                      {index == 0 || index == 1 || index == 2 ? (
                        <img src={`/index${index + 1}.png`} alt="" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <img className="listImg" src={item?.img} alt="" />
                    <div className="listInfo">
                      <div className="listInfoTitle">
                        <div className="infoName">{item?.name}</div>&nbsp;&nbsp;
                        <div className="infoaddress">
                          来源{item?.type} 网址：{item?.url}
                        </div>
                      </div>
                      <div className="listText">
                        <div className="listTextNum">
                          ￥{item?.price ?? "--"}
                          <span className="listTextUnit">起</span>
                        </div>
                        <div className="listTimeStr">
                          {dayjs().format("YYYY-MM-DD-HH:mm")}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="contentItem">
            <div className="contentItemTitle">最具性价比</div>
            <div className="contentItemList contentItemList2">
              {rigtDate.map((item: any, index: number) => {
                return (
                  <div className="ListItem" key={index}>
                    <img className="listImg" src={item?.img} alt="" />
                    <div className="listInfo">
                      <div className="listInfoTitle">
                        <div className="infoName">{item?.name}</div>&nbsp;&nbsp;
                        <div className="infoaddress">
                          来源{item?.type} 网址：{item?.url}
                        </div>
                      </div>
                      <div className="listText">
                        <div className="listTextNum">
                          ￥{item?.price ?? "--"}
                          <span className="listTextUnit">起</span>
                        </div>
                        <div className="listTimeStr">
                          {dayjs().format("YYYY-MM-DD-HH:mm")}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Tabs color="primary" aria-label="Options">
            <Tab key="热度排行" title="热度排行">
              <div className="content">
                <div className="contentItem">
                  <div className="contentItemTitle">点击热度排行</div>
                  <div className="contentItemList contentItemList1">
                    {leftDate.map((item: any, index: number) => {
                      const defaultIndexColor = "#F2F8FF";
                      const indexColor = colorArr[index] ?? defaultIndexColor;
                      return (
                        <div
                          className={"ListItem"}
                          style={{
                            background: `linear-gradient(to right, ${
                              item?.img ? indexColor : defaultIndexColor
                            }, transparent 40%)`,
                          }}
                          key={index}
                        >
                          <img className="listImg" src={item?.img} alt="" />
                          <div className="listInfo">
                            <div className="listInfoTitle">
                              <div className="infoName">{item?.name}</div>
                              &nbsp;&nbsp;
                              <div className="infoaddress">
                                来源{item?.type} 网址：{item?.url}
                              </div>
                            </div>
                            <div className="listText">
                              <div className="listTextNum">
                                ￥{item?.price ?? "--"}
                                <span className="listTextUnit">起</span>
                              </div>
                              <div className="listTimeStr">
                                {dayjs().format("YYYY-MM-DD-HH:mm")}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Tab>
            <Tab key="最具性价比" title="最具性价比">
              <div className="content">
                <div className="contentItem">
                  <div className="contentItemTitle">最具性价比</div>
                  <div className="contentItemList contentItemList2">
                    {rigtDate.map((item: any, index: number) => {
                      return (
                        <div className="ListItem" key={index}>
                          <img className="listImg" src={item?.img} alt="" />
                          <div className="listInfo">
                            <div className="listInfoTitle">
                              <div className="infoName">{item?.name}</div>
                              &nbsp;&nbsp;
                              <div className="infoaddress">
                                来源{item?.type} 网址：{item?.url}
                              </div>
                            </div>
                            <div className="listText">
                              <div className="listTextNum">
                                ￥{item?.price ?? "--"}
                                <span className="listTextUnit">起</span>
                              </div>
                              <div className="listTimeStr">
                                {dayjs().format("YYYY-MM-DD-HH:mm")}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      )}
    </div>
  );
}
