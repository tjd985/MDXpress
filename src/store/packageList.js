import { create } from "zustand";

function packageStore(set) {
  return {
    packageList: {},
    setPackage: packageInformation => {
      const [packageName, version] = packageInformation.split(" ");

      set(state => {
        state.packageList = {
          ...state.packageList,
          [packageName]: version,
        };

        return { ...state };
      });
    },
    clearPackageList: () => {
      set(state => {
        state.packageList = {};

        return { ...state };
      });
    },
  };
}

const usePackageStore = create(packageStore);

export default usePackageStore;
