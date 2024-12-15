import { authApi } from "./authApi";
import { ApiListProps, IApiListResponse } from "../types";

export const getApiList = async (
  props: ApiListProps
): Promise<IApiListResponse> => {
  const res = await authApi.get("/admin/api/user/api/list", {
    params: { ...props },
  });

  return res.data;
};
