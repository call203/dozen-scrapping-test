"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";
import { APILISTHEADERDATA } from "@/lib/data";
import { IApiList } from "@/lib/types";
import { FC } from "react";
import ScrapPopup from "./ScrapPopup";
import useScrapData from "@/hook/useScrapData";
import { Button } from "@/components/ui/button";

interface ScrapTableProps {
  data: IApiList[];
}

const ScrapTable: FC<ScrapTableProps> = ({ data }) => {
  const {
    scrapData,
    popupOpen,
    handleClickRow,
    handlePopupOpen,
    isError,
    error
  } = useScrapData();

  return (
    <>
      {scrapData && (
        <ScrapPopup
          data={scrapData}
          open={popupOpen}
          isError={isError}
          error={error}
          handlePopupOpen={handlePopupOpen}
        />
      )}
      <Table>
        <TableHeader>
          <TableRow>
            {APILISTHEADERDATA.map((title, index) => {
              return (
                <TableHead key={index} className="py-3 text-black font-bold">
                  {title}
                </TableHead>
              );
            })}
            <TableHead className="py-3 text-black font-bold">
              호출버튼
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row, index) => {
            return (
              <TableRow key={index} className="text-dark_gray">
                <TableCell className="min-w-[120px] py-3">
                  {row.apiNm}
                </TableCell>
                <TableCell className="min-w-[120px]">{row.apiCd}</TableCell>
                <TableCell className="min-w-[120px]">{row.apiDesc}</TableCell>
                <TableCell className="min-w-[120px]">
                  {row.mdulCustCd}
                </TableCell>
                <TableCell className="min-w-[120px]">{row.mdulNm}</TableCell>
                <TableCell className="min-w-[120px]">{row.kwrdCd}</TableCell>
                <TableCell className="min-w-[120px]">{row.kwrdNm}</TableCell>
                <TableCell className="min-w-[120px]">{row.prvr}</TableCell>
                <TableCell className="min-w-[120px]">
                  <Button
                    className="bg-blue hover:bg-low_gray"
                    onClick={() => handleClickRow(row)}
                  >
                    호출하기
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default ScrapTable;
