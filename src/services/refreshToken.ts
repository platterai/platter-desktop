import axios from "axios";
import Cookies from "js-cookie";
import { NEXT_PUBLIC_API_URL } from "../constants/env";

import {
  getCookieByName,
  getLocalStorageItem,
  setCookie,
  setLocalStorageItem,
} from "../util/helpers";

export const refreshToken = async () => {
  try {
    const _refreshToken = getLocalStorageItem("refreshToken");
    let response = await axios.post(`${NEXT_PUBLIC_API_URL}/v1/auth/refresh`, {
      refreshToken: _refreshToken,
    });

    if (response?.status === 201) {
      const responseData = response.data.data;
      const tokenExp = new Date().getTime() + 86400 * 1000;
      const refreshTokenExp = new Date().getTime() + 259200 * 1000;

      setLocalStorageItem("token", responseData.accessToken);
      setLocalStorageItem("tokenExp", `${tokenExp}`); // 1 day
      setLocalStorageItem("refreshToken", responseData.refreshToken);
      setLocalStorageItem("refreshTokenExp", `${refreshTokenExp}`); // 3 days
      return responseData.accessToken;
    }
    exit();
  } catch (error) {
    exit();
    throw error;
  }
};

export const exit = async () => {
  Cookies.remove("token");
  localStorage.removeItem("user");
};
