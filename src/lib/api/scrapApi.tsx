import { authApi } from "./authApi";
import {
  ApiListProps,
  IApiListResponse,
  ScrapDataProps,
  ScrapDataResponse
} from "../types";

export const getApiList = async (
  props: ApiListProps
): Promise<IApiListResponse> => {
  const res = await authApi.get("/admin/api/user/api/list", {
    params: { ...props }
  });

  return res.data;
};

export const getScrapData = async (
  props: ScrapDataProps
): Promise<ScrapDataResponse> => {
  const res = await authApi.get("/admin/api/recruit/scrp-recruit", {
    params: { ...props }
  });

  return res.data;
};
