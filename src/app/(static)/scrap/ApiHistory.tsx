"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useApiStore from "@/store/apiStore";
import { BookmarkIcon, BookmarkFilledIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const ApiHistory = () => {
  const {
    apiCilkedList,
    handleBookMark,
    sortListByTimeDesc,
    sortListByTimeAsc
  } = useApiStore();
  const [selectedValue, setSelectedValue] = useState("timeDesc");

  //처음 초기에 최신순으로 정렬
  useEffect(() => {
    sortListByTimeAsc();
  }, [sortListByTimeAsc]);

  //최신순과 오래된 순의 대한 정렬 함수 호출
  useEffect(() => {
    if (selectedValue === "timeDesc") {
      sortListByTimeDesc();
    } else {
      sortListByTimeAsc();
    }
  }, [selectedValue, sortListByTimeAsc, sortListByTimeDesc]);

  //정렬방법 select 값 변경
  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <>
      <div className="font-semibold text-2xl pb-5">API 호출 히스토리</div>
      <div className="flex space-x-4 pb-4">
        {/* 정렬 버튼 */}
        <div className="flex w-full justify-end ">
          <Select value={selectedValue} onValueChange={handleChange}>
            <SelectTrigger className="w-[180px] bg-white border p-2 rounded">
              <SelectValue placeholder="정렬 방법" />
            </SelectTrigger>
            <SelectContent className="text-dark_gray bg-white border p-2 rounded shadow-lg">
              <SelectGroup>
                <SelectItem value="timeDesc">최신순</SelectItem>
                <SelectItem value="timeAsc">오래된 순</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/** 카드 형식 리스트 */}
      <div className="grid grid-cols-1  gap-4">
        {apiCilkedList.length > 0 ? (
          apiCilkedList.map((data, index) => {
            return (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex flex-col">
                    <div className="flex flex-row sm:justify-start justify-between">
                      <p className="font-bold mr-5">{data.apiNm}</p>
                      {/**북마크 */}
                      {data.bookmark ? (
                        <BookmarkFilledIcon
                          onClick={() => handleBookMark(index)}
                          color="#1570EF"
                          className="w-5 h-5"
                        />
                      ) : (
                        <BookmarkIcon
                          onClick={() => handleBookMark(index)}
                          color="#1570EF"
                          className="w-5 h-5"
                        />
                      )}
                    </div>

                    <div className="sm:flex-row sm:items-baseline sm:justify-between flex-col flex">
                      <div className="flex flex-col sm:flex-row">
                        <p className="mr-5">api 코드 : {data.apiCd}</p>
                        <p className="mr-5">모듈 코드 : {data.mdulCustCd}</p>
                        <p className="mr-5">모듈 이름 : {data.mdulNm}</p>
                        <p className="mr-5 text-gray-500">
                          호출 시간 :{" "}
                          {data.clickedTime &&
                            format(data.clickedTime, "yyyy-MM-dd HH:mm:ss")}
                        </p>
                      </div>
                      <Button className="bg-blue hover:bg-low_gray mt-3 sm:mt-0">
                        조회하기
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="text-dark_gray h-full text-center">
            아직 호출하신 API가 없습니다.
          </div>
        )}
      </div>
    </>
  );
};

export default ApiHistory;
