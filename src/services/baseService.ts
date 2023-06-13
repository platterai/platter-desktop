import axios, { AxiosResponse } from "axios";
import { NEXT_PUBLIC_API_URL } from "../constants/env";
import { getCookieByName } from "../util/helpers";

import { refreshToken } from "./refreshToken";

interface requestGetProps<T> {
  withAuth?: boolean;
  params?: Record<string, unknown>;
  token?: string;
}

export const requestGet = async <T>(
  url: string,
  { withAuth = true, params, token }: requestGetProps<T>
): Promise<T> => {
  const _token = await getCookieByName("token");
  const GET_response = async (bT: string): Promise<AxiosResponse<T>> =>
    axios.get(`${NEXT_PUBLIC_API_URL}${url}`, {
      params,
      headers: {
        ...(withAuth && {
          Authorization: `Bearer ${bT}`,
        }),
      },
    });
  let response;
  try {
    response = await GET_response((_token as string) ?? (token as string));
    return response?.data;
  } catch (error: any) {
    if (error?.response?.data?.statusCode === 401) {
      let newToken = await refreshToken();
      response = await GET_response(newToken as string);
      return response?.data;
    }
    throw error;
  }
};

interface requestPostProps<T> {
  withAuth?: boolean;
  data?: T;
  token?: string;
}

export const requestPost = async <T>(
  url: string,
  { withAuth = true, data, token }: requestPostProps<T>
): Promise<T> => {
  const _token = await getCookieByName("token");
  const POST_response = async (bT: string): Promise<AxiosResponse<T>> =>
    axios.post(`${NEXT_PUBLIC_API_URL}${url}`, data, {
      headers: {
        ...(withAuth && {
          Authorization: `Bearer ${bT}`,
        }),
      },
    });

  let response;
  try {
    response = await POST_response((_token as string) ?? (token as string));
    return response?.data;
  } catch (error: any) {
    if (error?.response?.data?.statusCode === 401) {
      let newToken = await refreshToken();
      response = await POST_response(newToken as string);
      return response?.data;
    }
    throw error;
  }
};

interface requestPatchProps<T> {
  withAuth?: boolean;
  data?: T;
  token?: string;
}

export const requestPatch = async <T>(
  url: string,
  { withAuth = true, data, token }: requestPatchProps<T>
): Promise<T> => {
  const _token = await getCookieByName("token");
  const PATCH_response = async (bT: string): Promise<AxiosResponse<T>> =>
    axios.patch(`${NEXT_PUBLIC_API_URL}${url}`, data, {
      headers: {
        ...(withAuth && {
          Authorization: `Bearer ${bT}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        }),
      },
    });

  let response;
  try {
    response = await PATCH_response((_token as string) ?? (token as string));
    return response?.data;
  } catch (error: any) {
    if (error?.response?.data?.statusCode === 401) {
      let newToken = await refreshToken();
      response = await PATCH_response(newToken as string);
      return response?.data;
    }
    throw error;
  }
};
