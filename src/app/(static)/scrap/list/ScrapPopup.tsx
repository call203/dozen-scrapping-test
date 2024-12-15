import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrapDataResponse } from "@/lib/types";

import { FC } from "react";

interface ScrapPopupProps {
  open: boolean;
  data: ScrapDataResponse;
  handlePopupOpen: () => void;
}

const ScrapPopup: FC<ScrapPopupProps> = (props) => {
  const { data, open, handlePopupOpen } = props;

  return (
    <Dialog open={open} onOpenChange={handlePopupOpen}>
      <DialogTitle />
      <DialogContent>
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
            <TableRow key="values">
              {Object.values(data.data.out).map((value, index) => (
                <TableCell key={index}>{JSON.stringify(value)}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default ScrapPopup;
