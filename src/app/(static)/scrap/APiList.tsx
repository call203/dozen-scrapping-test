"use client";

import { Card, CardContent } from "@/components/ui/card";
import LoadingSpinner from "@/components/LoadingSpinner";
import ScrapTable from "./ScrapTable";
import ScrapTablePagination from "./ScrapTablePagination";
import { getApiList } from "@/lib/api/scrapApi";
import { IApiListResponse } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ErrorPopup from "@/components/popup/ErrorPopup";

const ApiList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const props = { pageSize: 10, pageIdx: currentPage };
  const [netWorkerror, setNetWorkerror] = useState<boolean>(true);
  const { isLoading, isError, data, error } = useQuery<IApiListResponse>({
    queryKey: ["apilist", props],
    queryFn: () => getApiList(props)
  });

  if (isError) {
    return (
      <ErrorPopup
        msg={error?.message}
        open={netWorkerror}
        handleErrorModal={setNetWorkerror}
      />
    );
  }

  return (
    <>
      <div className="font-semibold text-2xl pb-5">API 조회 리스트</div>
      <Card className="w-full overflow-x-auto">
        <CardContent>
          {/**로딩시 */}
          {isLoading ? (
            <LoadingSpinner />
          ) : data && Array.isArray(data.data.list) ? (
            <>
              {/** 테이블 */}
              <ScrapTable data={data.data.list} />
              {/** 페이지네이션 */}
              <div className="pt-5">
                <ScrapTablePagination
                  page={currentPage}
                  pageSize={data?.data.totalPage}
                  onPageChange={setCurrentPage}
                />
              </div>
              {/** 총 데이터 수 */}
              <div className="justify-end flex text-dark_gray text-sm py-0">
                Total : {data.data.totalCount}
              </div>
            </>
          ) : (
            <div className="text-center text-dark_gray flex justify-center items-center">
              조회하신 데이터가 없습니다.
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ApiList;
