
import { Carousel } from 'antd';
import "./index.modules.less";

// 轮播图片
const swiperImgs = [
  new URL("@/assets/banner.png", import.meta.url)
    .href,
  new URL("@/assets/banner.png", import.meta.url)
    .href,
]

const hotList = [
  {
    name: "游戏名称游戏名称游戏名称",
    indexColor: '#F9ECD7',
    indexImg: new URL("@/assets/index1.png", import.meta.url).href,
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    type: "QQ",
    address: "来源包包 网址：192.168.1.105:8889",
    num: '0.6',
    time: '2024-9-10 12:36'
  },
  {
    name: "游戏名称游戏名称游戏名称",
    indexColor: '#D4E3F7',
    indexImg: new URL("@/assets/index2.png", import.meta.url).href,
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    type: "QQ",
    address: "来源包包 网址：192.168.1.105:8889",
    num: '0.6',
    time: '2024-9-10 12:36'
  },
  {
    name: "游戏名称游戏名称游戏名称",
    indexColor: '#F9D6D9',
    indexImg: new URL("@/assets/index3.png", import.meta.url).href,
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    type: "QQ",
    address: "来源包包 网址：192.168.1.105:8889",
    num: '0.6',
    time: '2024-9-10 12:36'
  },
  {
    name: "游戏名称游戏名称游戏名称",
    indexImg: '',
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    type: "QQ",
    address: "来源包包 网址：192.168.1.105:8889",
    num: '0.6',
    time: '2024-9-10 12:36'
  },
  {
    name: "游戏名称游戏名称游戏名称",
    indexImg: '',
    img: new URL("@/assets/testImg.png", import.meta.url).href,
    type: "QQ",
    address: "来源包包 网址：192.168.1.105:8889",
    num: '0.6',
    time: '2024-9-10 12:36'
  },
]
// 首页
export default function Personage() {
  return (
    <div className='homePage'>
      <Carousel
        className='swiperContainer'
        autoplay
        adaptiveHeight
        autoplaySpeed={2000}
        draggable
        infinite
      >
        {
          swiperImgs.map((item, index) => {
            return <img className='swiper-img' src={item} key={index} alt="" />
          })
        }
      </Carousel>

      {false && <div className='content'>
        <div className='contentItem'>
          <div className='contentItemTitle'>点击热度排行</div>
          <div className='contentItemList contentItemList1'>
            {
              hotList.map((item, index) => {
                const defaultIndexColor = '#F2F8FF';
                const indexColor = item?.indexColor ?? defaultIndexColor;
                return <div className={'ListItem'} style={{
                  background: `linear-gradient(to right, ${item?.indexImg ? indexColor : defaultIndexColor}, transparent 40%)`
                }} key={index}>
                  <div className='ListItemIndex'>
                    {item?.indexImg
                      ? <img src={item?.indexImg} alt="" />
                      : index + 1}
                  </div>
                  <img className='listImg' src={item?.img} alt="" />
                  <div className='listInfo'>
                    <div className='listInfoTitle'>
                      <div className='infoName'>
                        {item?.name}
                      </div>
                      <div className='infoType'>
                        {item?.type}
                      </div>
                      <div className='infoaddress'>
                        {item?.address}
                      </div>
                    </div>
                    <div className='listText'>
                      <div className='listTextNum'>
                        ￥{item?.num ?? '--'}
                        <span className='listTextUnit'>起</span>
                      </div>
                      <div className='listTimeStr'>
                        {item?.time}
                      </div>
                    </div>
                  </div>
                </div>
              })
            }
          </div>
        </div>
        <div className='contentItem'>
          <div className='contentItemTitle'>最具性价比</div>
          <div className='contentItemList contentItemList2'>
            {
              hotList.map((item, index) => {
                return <div className='ListItem' key={index}>
                  <img className='listImg' src={item?.img} alt="" />
                  <div className='listInfo'>
                    <div className='listInfoTitle'>
                      <div className='infoName'>
                        {item?.name}
                      </div>
                      <div className='infoType'>
                        {item?.type}
                      </div>
                      <div className='infoaddress'>
                        {item?.address}
                      </div>
                    </div>
                    <div className='listText'>
                      <div className='listTextNum'>
                        ￥{item?.num ?? '--'}
                        <span className='listTextUnit'>起</span>
                      </div>
                      <div className='listTimeStr'>
                        {item?.time}
                      </div>
                    </div>
                  </div>
                </div>
              })
            }
          </div>
        </div>
      </div>}
    </div>
  );
}
