import usePackageStore from "../store/packageList.ts";

interface BundlePackage {
  bundledPackageCode: string;
  packageInformation: string;
}

function useLoadPackage() {
  const { packageList, setPackage } = usePackageStore();

  function loadPackage(bundleCodeList: Array<BundlePackage>) {
    bundleCodeList.forEach(bundleCode => {
      const { packageInformation, bundledPackageCode } = bundleCode;

      if (packageList[packageInformation.split(" ")[0]]) {
        return;
      }

      const packageBlob = new Blob([bundledPackageCode], {
        type: "application/javascript",
      });

      const packageBlobURL = URL.createObjectURL(packageBlob);
      const packageScriptEl = document.createElement("script");

      packageScriptEl.src = packageBlobURL;
      document.body.append(packageScriptEl);

      setPackage(packageInformation);
    });
  }

  return loadPackage;
}

export default useLoadPackage;
