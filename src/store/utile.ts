import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

type DebounceFn = (...args: any[]) => void;
// 防抖
export function debounce(func: DebounceFn, delay: number = 3000): DebounceFn {
  let timer: number | undefined;

  return function (this: any, ...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
// 节流
export function throttle(func: DebounceFn, delay: number = 3000): DebounceFn {
  let timeout: number | undefined;

  return function (this: any, ...args: any[]) {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = undefined;
        func.apply(this, args);
      }, delay);
    }
  };
}

export const goFullScreen = () => {
  //全屏网页
  const element = document.documentElement;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if ((element as any).mozRequestFullScreen) {
    // Firefox
    (element as any).mozRequestFullScreen();
  } else if ((element as any).webkitRequestFullscreen) {
    // Chrome, Safari 和 Opera
    (element as any).webkitRequestFullscreen();
  } else if ((element as any).msRequestFullscreen) {
    // IE/Edge
    (element as any).msRequestFullscreen();
  }
};

export const exitFullScreen = () => {
  //缩小全屏网页
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if ((document as any).mozCancelFullScreen) {
    (document as any).mozCancelFullScreen();
  } else if ((document as any).webkitExitFullscreen) {
    (document as any).webkitExitFullscreen();
  } else if ((document as any).msExitFullscreen) {
    (document as any).msExitFullscreen();
  }
};

export function useWindowWidth() {
  //监听页面宽度
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

//登录背景
export const loginBg = () => {
  const elems: NodeListOf<HTMLElement> =
    document.querySelectorAll(".laya-please");
  const layer3 = document.querySelector(".layer-3") as HTMLElement;
  const layer4 = document.querySelector(".layer-4") as HTMLElement;
  const layer5 = document.querySelector(".layer-5") as HTMLElement;
  const layer6 = document.querySelector(".layer-6") as HTMLElement;
  const layer7 = document.querySelector(".layer-7") as HTMLElement;
  const layer8 = document.querySelector(".layer-8") as HTMLElement;

  setTimeout(() => {
    elems.forEach((elem) => {
      elem.style.animation = "none";
    });
  }, 1500);

  document.body.addEventListener("mousemove", (e: MouseEvent) => {
    const target = e.currentTarget as HTMLElement;

    if (!target.dataset.triggered) {
      elems.forEach((elem) => {
        if (elem.getAttribute("style")) {
          elem.style.transition = "all .5s";
          elem.style.transform = "none";
        }
      });
    }
    target.dataset.triggered = "true";

    const width = window.innerWidth / 2;
    const mouseMoved2 = (width - e.pageX) / 50;
    const mouseMoved3 = (width - e.pageX) / 40;
    const mouseMoved4 = (width - e.pageX) / 30;
    const mouseMoved5 = (width - e.pageX) / 20;
    const mouseMoved6 = (width - e.pageX) / 10;
    const mouseMoved7 = (width - e.pageX) / 5;

    if (layer3) layer3.style.transform = `translateX(${mouseMoved2}px)`;
    if (layer4) layer4.style.transform = `translateX(${mouseMoved3}px)`;
    if (layer5) layer5.style.transform = `translateX(${mouseMoved4}px)`;
    if (layer6) layer6.style.transform = `translateX(${mouseMoved5}px)`;
    if (layer7) layer7.style.transform = `translateX(${mouseMoved6}px)`;
    if (layer8) layer8.style.transform = `translateX(${mouseMoved7}px)`;
  });

  document.body.addEventListener("mouseleave", () => {
    elems.forEach((elem) => {
      elem.style.transition = "all .5s";
      elem.style.transform = "none";
    });
  });

  document.body.addEventListener("mouseenter", () => {
    elems.forEach((elem) => {
      setTimeout(() => {
        elem.style.transition = "none";
      }, 500);
    });
  });
};

//解密算法
export const decryptData = (encryptedData: any) => {
  if (typeof encryptedData === "string" && encryptedData.trim() === "") {
    // 数据为空
    return [];
  }

  // 密钥和 IV，需要与后端保持一致
  const key = CryptoJS.enc.Utf8.parse("glt6h61ta7kisow7");
  const iv = CryptoJS.enc.Utf8.parse("4hrivgw5s342f9b2");

  // 步骤 1：Base64 解码后端返回的加密数据
  const encryptedHexStr = CryptoJS.enc.Base64.parse(encryptedData);

  // 步骤 2：使用 AES-128-CBC 算法解密
  const decryptedData = CryptoJS.AES.decrypt(
    { ciphertext: encryptedHexStr },
    key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  // 将解密得到的 WordArray 转换为 Utf8 字符串
  const decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);

  // 步骤 3：Base64 解码解密得到的字符串
  const jsonStr = atob(decryptedStr);

  // 步骤 4：解析 JSON 字符串
  const result = JSON.parse(jsonStr);

  return result;
};

export function exportToTxt(data: any, filename = "export.txt") {
  // 格式化内容：移除 username，用 '----' 分割字段，每个对象换行
  const content = data
    .map(
      (item: any) => `${item.app_name}----${item.account}----${item.username}`
    )
    .join("\n");

  // 创建一个 Blob 对象，指定文件内容和 MIME 类型
  const blob = new Blob([content], { type: "text/plain" });

  // 创建一个链接元素用于触发下载
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;

  // 自动触发下载并移除链接
  link.click();
  URL.revokeObjectURL(link.href); // 释放内存
}
