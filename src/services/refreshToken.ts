import axios from "axios";
import Cookies from "js-cookie";

import { getCookieByName, setCookie } from "../util/helpers";

export const refreshToken = async () => {
  try {
    const _refreshToken = await getCookieByName("refreshToken");
    let response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/refresh`,
      { refreshToken: _refreshToken }
    );

    if (response?.status === 201) {
      setCookie("token", response.data.data.accessToken, 86400); // 1 day
      setCookie("refreshToken", response.data.data.refreshToken, 259200); // 3 days

      return response.data.data.accessToken;
    }
    exit();
  } catch (error) {
    exit();
    throw error;
  }
};

export const exit = async () => {
  Cookies.remove("token");
  localStorage.removeItem("selectedAvatarPath");
  localStorage.removeItem("user");
};
