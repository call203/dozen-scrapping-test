import { getScrapData } from "@/lib/api/scrapApi";
import { IApiList, ScrapDataProps, ScrapDataResponse } from "@/lib/types";
import useApiStore from "@/store/apiStore";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

/**
 * 1. Scrap data api 호출 로직
 * 2. Scrap data를 담고 있는 popup open/close
 */
const useScrapData = () => {
  const [props, setProps] = useState<ScrapDataProps | null>(null);
  const { addApiClikcedList } = useApiStore();
  const [popupOpen, setPopupOpen] = useState(false);

  const {
    data: scrapData,
    refetch,
    isError,
    error
  } = useQuery<ScrapDataResponse>({
    queryKey: ["scrapData", props],
    queryFn: () => getScrapData(props),
    enabled: !!props
  });

  //스크래핑 데이터 popup
  const handlePopupOpen = useCallback(() => {
    setPopupOpen((prevPopupOpen) => !prevPopupOpen);
  }, []);

  const handleClickRow = useCallback(
    (rowData: IApiList) => {
      // 호출시간 저장 & 호출 히스토리 리스트에 추가
      rowData.clickedTime = new Date().toISOString();
      if (!rowData.bookmark) rowData.bookmark = false;
      addApiClikcedList(rowData);
      setProps({ mdulCustCd: rowData.mdulCustCd, apiCd: rowData.apiCd });
      handlePopupOpen();
    },
    [addApiClikcedList, handlePopupOpen]
  );

  //호출버튼 클릭시 scrap data api 호출
  useEffect(() => {
    if (props) {
      refetch();
    }
  }, [props, refetch]);

  return {
    isError,
    error,
    scrapData,
    popupOpen,
    handleClickRow,
    handlePopupOpen
  };
};

export default useScrapData;
