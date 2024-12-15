import { IApiList } from "@/lib/types";
import { create } from "zustand";
interface apiStore {
  netWorError: boolean;
  apiCilkedList: IApiList[];
  addApiClikcedList: (payload: IApiList) => void;
  handleBookMark: (index: number) => void;
  sortListByTimeDesc: () => void;
  sortListByTimeAsc: () => void;
}

const useApiStore = create<apiStore>((set) => ({
  apiCilkedList: [],
  netWorError: false,
  /** API 히스토리 리스트에 아이템 추가 */
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
        //있다면 날짜만 수정
      } else {
        const newList = [...state.apiCilkedList];
        newList[exist].clickedTime = new Date().toISOString();
        return { apiCilkedList: newList };
      }
    }),
  /** 북마크 상태 바꾸기 */
  handleBookMark: (payload) =>
    set((state) => {
      const newList = [...state.apiCilkedList];
      newList[payload].bookmark = !newList[payload].bookmark;
      return { apiCilkedList: newList };
    }),
  /** 최신순으로 정렬 */
  sortListByTimeDesc: () => {
    set((state) => {
      const sorted = [...state.apiCilkedList].sort((a, b) => {
        if (a.bookmark && !b.bookmark) return -1;
        if (!a.bookmark && b.bookmark) return 1;
        const timeA = new Date(a.clickedTime).getTime();
        const timeB = new Date(b.clickedTime).getTime();
        return timeB - timeA;
      });

      return { apiCilkedList: sorted };
    });
  },
  /** 오래된 순으로 정렬 */
  sortListByTimeAsc: () => {
    set((state) => {
      const sorted = [...state.apiCilkedList].sort((a, b) => {
        if (a.bookmark && !b.bookmark) return -1;
        if (!a.bookmark && b.bookmark) return 1;
        const timeA = new Date(a.clickedTime).getTime();
        const timeB = new Date(b.clickedTime).getTime();
        return timeA - timeB;
      });

      return { apiCilkedList: sorted };
    });
  }
}));

export default useApiStore;
