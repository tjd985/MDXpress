interface BundleCodeType {
  packageInformation: string;
  bundledPackageCode: string;
}

interface VersionCodeResponseType {
  result: string;
  status: number;
  content?: {
    targetCode: string;
    bundleCodeList: Array<BundleCodeType>;
  };
  message?: string;
}

export { BundleCodeType, VersionCodeResponseType };
