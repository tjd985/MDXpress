import { create } from "zustand";

interface PackageStore {
  packageList: { [packageName: string]: string };
  setPackage: (packageInformation: string) => void;
}

const usePackageStore = create<PackageStore>()(set => ({
  packageList: {},
  setPackage: packageInformation =>
    set(state => {
      const [packageName, version] = packageInformation.split(" ");

      state.packageList = {
        ...state.packageList,
        [packageName]: version,
      };

      return { ...state };
    }),
  clearPackageList: () =>
    set(state => {
      state.packageList = {};

      return { ...state };
    }),
}));

// function packageStore(set) {
//   return {
//     packageList: {},
//     setPackage: packageInformation => {
//       const [packageName, version] = packageInformation.split(" ");

//       set(state => {
//         state.packageList = {
//           ...state.packageList,
//           [packageName]: version,
//         };

//         return { ...state };
//       });
//     },
//     clearPackageList: () => {
//       set(state => {
//         state.packageList = {};

//         return { ...state };
//       });
//     },
//   };
// }

// const usePackageStore = create(packageStore);

export default usePackageStore;
