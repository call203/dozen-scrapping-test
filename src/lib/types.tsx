export interface ILoginResponse {
  errYn: string;
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

export interface ScrapDataProps {
  mdulCustCd?: string;
  apiCd?: string;
}

export interface ScrapDataResponse {
  errYn: string;
  code: string;
  msg: string;
  data: {
    out: {
      code: string;
      msg: string;
      data: object;
    };
  };
}

export interface IApiListResponse {
  errYn: string;
  code: string;
  msg: string;
  data: {
    list: IApiList[];
    totalCount: number;
    totalPage: number;
  };
}

export interface IApiList {
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
  mdulNm: string;
  bookmark: boolean;
  clickedTime: string;
}
