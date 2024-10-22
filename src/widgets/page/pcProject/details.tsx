import { useLocation } from "react-router-dom";
import { ProjectDetails } from "@/api/useApi";
import { useEffect, useState } from "react";
import PublicNavTitle from "@/component/PublicNavTitle";
export default function Details() {
  const { state } = useLocation();
  const { id: price_id } = state ?? {};
  const [dtitleDta, setdtitleDta]: any = useState({});
  const [xiangmu, setxiangmu]: any = useState([]);
  useEffect(() => {
    ProjectDetails({
      price_id,
      package_id: 10000,
    }).then((res: any) => {
      if (res.code == 0) {
        console.log(res.data, "sssss");

        setdtitleDta(res.data);
        setxiangmu(res.data.detail);
      }
    });
  }, []);
  return (
    <div>
      <PublicNavTitle hasgoBack title={"返回"} />
      <nav className=" p-[20px] w-full flex justify-center items-center ">
        <img
          className=" w-[55px]  h-[55px] "
          src={dtitleDta?.img || ""}
          alt=""
        />
        <p className=" text-[20px] ml-3 font-extrabold ">
          {dtitleDta?.name || "-"}
        </p>
      </nav>
      <section className=" flex  items-center flex-col ">
        {xiangmu.map((el: any, index: number) => (
          <ul
            key={index}
            className=" my-4  p-3 rounded-lg  shadow-lg  w-[300px] bg-[#f1ebf7] "
          >
            <li className="flex">
              <p>来源网站：</p>
              <p className=" text-[red] ">{el?.type || "-"}</p>
            </li>
            <li className="flex my-2">
              <p className=" text-[#812526] ">金额(起)：</p>
              <p>{el?.price || "-"}</p>
            </li>
            <li className="flex">
              <p>网址：</p>
              <p
                onClick={() => {
                  window.open(el.url);
                }}
                className="  text-primary-500"
              >
                {el?.url || "-"}
              </p>
            </li>
          </ul>
        ))}
      </section>
    </div>
  );
}
