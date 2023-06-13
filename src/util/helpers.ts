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

export function getCookieByName(name: string) {
  const cookieString = document.cookie;
  const cookies = cookieString.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      console.log(`${name} cookie fetched!`);
      return cookie.substring(name.length + 1);
    }
  }

  return null;
}

export function setCookie(name: string, value: string, maxAge: number = 86400) {
  const _maxAge = `max-age=${maxAge}`;
  const cookieString = `${name}=${value}; ${_maxAge}`;
  document.cookie = cookieString;
  console.log(`${name} cookie set!`);
}

export const setWindowSize = (w: number, h: number) => {
  appWindow.setSize(new LogicalSize(w, h));
  appWindow.setMaxSize(new LogicalSize(w + 200, h + 200));
  appWindow.setMinSize(new LogicalSize(w - 200, h - 200));
};

export const setWindowCenter = () => {
  appWindow.center();
};

export const saveConversationID = () => {
  appWindow.center();
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
