import { appWindow, LogicalSize } from "@tauri-apps/api/window";
import { isArray, omit } from "lodash";
import { Datum, IBarchart } from "../types/app";

export const anchorLink = (url: string, newTab: boolean) => {
  const link = document.createElement("a");
  link.href = url;
  link.style.display = "none";
  if (newTab) {
    link.target = "_blank";
  }
  document.body.appendChild(link);
  link.click();
};

export const checkCookie = (cookieName: string) => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${cookieName}=`)) {
      console.log(`${cookieName} cookie found!`);
      return true;
    }
  }

  console.log(`${cookieName} cookie not found!`);
  return false;
};

export const setWindowSize = (w: number, h: number) => {
  appWindow.setSize(new LogicalSize(w, h));
  appWindow.setMaxSize(new LogicalSize(w + 200, h + 200));
  appWindow.setMinSize(new LogicalSize(w - 200, h - 200));
};

export const cleanChartData = (_data: IBarchart) => {
  let newData = _data?.data?.map((item: Datum) => {
    const cleanItem =
      item?.marker?.color && !isArray(item?.marker?.color)
        ? omit(item, ["marker"])
        : item;
    return cleanItem;
  });

  let newLayout = omit(_data?.layout, ["coloraxis"]);

  const result = {
    data: newData,
    layout: newLayout,
  };

  return result;
};
