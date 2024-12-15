"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { ScrapDataResponse } from "@/lib/types";

import { FC } from "react";

interface ScrapPopupProps {
  open: boolean;
  data: ScrapDataResponse;
  handlePopupOpen: () => void;
}

/**scrap data 호출 및 팝업에 표시*/
const ScrapPopup: FC<ScrapPopupProps> = (props) => {
  const { data, open, handlePopupOpen } = props;

  return (
    <Dialog open={open} onOpenChange={handlePopupOpen}>
      <DialogTitle />
      <DialogContent className="rounded-xl">
        <DialogHeader>
          <DialogTitle />
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              {Object.keys(data.data.out).map((key) => (
                <TableHead key={key}>{key}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              {Object.values(data.data.out).map((value, index) => (
                <TableCell height={300} className="min-w-[120px]" key={index}>
                  {JSON.stringify(value)}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default ScrapPopup;
