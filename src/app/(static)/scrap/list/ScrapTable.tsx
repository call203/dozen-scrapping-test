import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { APILISTHEADERDATA } from "@/lib/data";
import { IApiList } from "@/lib/types";
import { FC } from "react";

interface ScrapTableProps {
  data: IApiList[];
}

const ScrapTable: FC<ScrapTableProps> = ({ data }) => {
  return (
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
            <TableRow key={index} className="text-dark_gray">
              <TableCell className="min-w-[120px] py-3">{row.apiNm}</TableCell>
              <TableCell className="min-w-[120px]">{row.apiCd}</TableCell>
              <TableCell className="min-w-[120px]">{row.apiDesc}</TableCell>
              <TableCell className="min-w-[120px]">{row.mdulCustCd}</TableCell>
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
  );
};

export default ScrapTable;
