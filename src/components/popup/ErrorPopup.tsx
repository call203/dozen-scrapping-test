import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { FC } from "react";

interface ErrorPopupProps {
  msg: string;
  open: boolean;
  handleErrorModal: (open: boolean) => void;
}

const ErrorPopup: FC<ErrorPopupProps> = ({ msg, open, handleErrorModal }) => {
  return (
    <Dialog open={open} onOpenChange={handleErrorModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>에러</DialogTitle>
          <DialogDescription>
            <div>{msg}</div>
            <div>네트워크 에러: 고객센터로 문의해주세요</div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorPopup;
