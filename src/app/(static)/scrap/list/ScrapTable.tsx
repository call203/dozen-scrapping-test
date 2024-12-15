import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";
import { getScrapData } from "@/lib/api/scrapApi";
import { APILISTHEADERDATA } from "@/lib/data";
import { IApiList, ScrapDataProps, ScrapDataResponse } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import ScrapPopup from "./ScrapPopup";

interface ScrapTableProps {
  data: IApiList[];
}

const ScrapTable: FC<ScrapTableProps> = ({ data }) => {
  const [props, setProps] = useState<ScrapDataProps | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const { data: scrapData, refetch } = useQuery<ScrapDataResponse>({
    queryKey: ["apilist", props],
    queryFn: () => getScrapData(props),
    enabled: false
  });

  const handleClickRow = (rowData: IApiList) => {
    setProps({ mdulCustCd: rowData.mdulCustCd, apiCd: rowData.apiCd });
    handlePopupOpen();
  };

  useEffect(() => {
    if (props) {
      refetch();
    }
  }, [props, refetch]);

  const handlePopupOpen = () => {
    setPopupOpen(!popupOpen);
  };

  useEffect(() => {
    console.log(JSON.stringify(scrapData?.data));
  }, [scrapData]);

  return (
    <>
      {scrapData && (
        <ScrapPopup
          data={scrapData}
          open={popupOpen}
          handlePopupOpen={handlePopupOpen}
        />
      )}
      <Table>
        <TableHeader>
          <TableRow>
            {APILISTHEADERDATA.map((title, index) => {
              return (
                <TableHead
                  key={index}
                  className={`py-3 text-black font-bold ${
                    index === APILISTHEADERDATA.length - 1
                      ? "text-end"
                      : "text-start"
                  } `}
                >
                  {title}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row, index) => {
            return (
              <TableRow
                key={index}
                className="text-dark_gray"
                onClick={() => handleClickRow(row)}
              >
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
                <TableCell className="min-w-[120px] text-end">
                  {row.prvr}
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
