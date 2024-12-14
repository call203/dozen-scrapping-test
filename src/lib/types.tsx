export interface ILoginResponse {
  errYMN: string;
  code: string;
  msg: string;
  data: {
    accessToken: string;
  };
}

export interface LoginInputProps {
  admUserId: string;
  userPw: string;
}

export interface ApiListProps {
  pageSize?: number;
  pageIdx?: number;
}

export interface IApiListResponse {
  admUserId: string;
  apiNm: string;
  apiDesc: string;
  apiCd: string;
  kwrdCd: string;
  kwrdNm: string;
  prvr: string;
  apiCdUid: string;
  apiLogStus: string;
  changeAble: string;
  cmnCdLginType: string;
  cmnCdLginTypeNm: string;
  mdulCustCd: string;
  mdculNm: string;
}
