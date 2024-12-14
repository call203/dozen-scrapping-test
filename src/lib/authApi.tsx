import axios from "axios";
import { ILoginResponse, LoginInputProps } from "./types";
import { jwtDecode } from "jwt-decode";

const apiURL = process.env.NEXT_PUBLIC_API_ENDPOINT;

/***
 * Cookie vs localStroge ==> localStroge
 * 1. 모든 요청마다 쿠키가 함께 전송되는데 성능이 떨어지는 원인
 * 2. Access Token의 길이가 짧고 refresh token을 도입한다면 보안 상승됨
 */

//axios 인스턴스 생성
export const authApi = axios.create({
  baseURL: apiURL,
});
authApi.defaults.headers.common["Content-Type"] = "application/json";

//로그아웃
const logout = () => {
  localStorage.removeItem("accessToken");
  //로그인 페이지로 리다이렉트
  window.location.href = "/";
};

// 토큰의 만료 시간을 확인하는 함수
const getTokenExpiration = (token: string): number | null => {
  try {
    const decodedToken = jwtDecode(token);
    if (!decodedToken.exp) {
      console.error("Token does not have an expiration (exp) field.");
      return null;
    }

    return decodedToken.exp * 1000; // exp는 초 단위이므로 밀리초로 변환
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

// 토큰이 만료되었는지 체크
const isTokenExpired = (token: string): boolean => {
  const expirationTime = getTokenExpiration(token);
  if (!expirationTime) return true;

  const currentTime = new Date().getTime();

  return currentTime > expirationTime;
};

//요청 interceptor
authApi.interceptors.request.use(
  (config) => {
    // const accessToken: string | null = localStorage.getItem("accessToken");
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWNhdGlvbiI6ImRvem5fcmVjcnVpdDAzIiwiaXNEb3puIjoiVVNFUiIsImFwaUtleSI6InA0Tkx4dmRWYU5pTFJHWE92R2R5WFg2MTN2Mk9HWnVRZ2FSc01oRG80a3Q1WHpJZUd0SEFuZ0RKZmdnK3ZHVk1CcFZpcE1iNW0xMFRaSmhwL3IyYkdvTkkxNmE0Y0dRTjFhTjJvbWFneitRPSIsImlhdCI6MTczNDEwMzA2OSwiZXhwIjoxNzM0MTg5NDY5fQ.jplrV4s1e0n-y1khLAtW7dzq4Wx-4bqI7wmA5G5wVNk";
    //토큰이 있다면
    if (accessToken) {
      //토큰 만료 체크
      if (isTokenExpired(accessToken)) {
        logout();
      } else {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      //토큰이 없다면
    } else {
      logout();
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

//응답 interceptor
authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response } = error;
    const isLoginPage = window.location.pathname === "/";

    if (response?.status === 401 && !isLoginPage) {
      logout(); // 로그인 페이지가 아닌 경우 로그아웃
    }
    return Promise.reject(error);
  }
);

export const loginUser = async (user: LoginInputProps) => {
  const res = await authApi.post<ILoginResponse>(
    "/admin/api/recruit/login-check",
    user
  );
  return res.data;
};
