import { create } from "zustand";

type ScrollType = {
  left: number;
  top: number;
};

interface ScrollState {
  scroll: ScrollType;
  setScroll: (scroll: ScrollType) => void;
}

const useScrollStore = create<ScrollState>()(set => ({
  scroll: { left: 0, top: 0 },
  setScroll: (scroll: ScrollType) =>
    set(state => {
      const { left, top } = scroll;

      state.scroll = {
        left,
        top,
      };

      return { ...state };
    }),
}));

export default useScrollStore;
