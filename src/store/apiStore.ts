import { IApiList } from "@/lib/types";
import { create } from "zustand";
interface apiStore {
  netWorError: boolean;
  apiCilkedList: IApiList[];
  addApiClikcedList: (payload: IApiList) => void;
}

const useApiStore = create<apiStore>((set) => ({
  apiCilkedList: [],
  netWorError: false,
  addApiClikcedList: (payload) =>
    set((state) => {
      // 이미 리스트에 존재하는지 확인
      const exist = state.apiCilkedList.findIndex(
        (i) => i.mdulCustCd === payload.mdulCustCd
      );
      if (exist === -1) {
        return {
          apiCilkedList: [...state.apiCilkedList, payload]
        };
      }
      return state;
    })
}));

export default useApiStore;
