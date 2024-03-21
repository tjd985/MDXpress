import { create } from "zustand";

function scrollStore(set) {
  return {
    scroll: {},
    setScroll: ({ left, top }) => {
      set(state => {
        state.scroll = {
          left,
          top,
        };

        return { ...state };
      });
    },
  };
}

const useScrollStore = create(scrollStore);

export default useScrollStore;
