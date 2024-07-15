interface PackageResponseType {
  result: string;
  status: number;
  content?: {
    packageInformation: string;
    bundledPackageCode: string;
  };
  message?: string;
}

export default PackageResponseType;
