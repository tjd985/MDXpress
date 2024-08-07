import PackageResponseType from "../types/PackageResponse.ts";

const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

async function getBundlePackageCode(
  packageName: string,
): Promise<PackageResponseType | undefined> {
  try {
    const requestURL = `${SERVER_DOMAIN}/package/${packageName}`;

    const response = await fetch(requestURL, {
      method: "GET",
      credentials: "include",
    });

    const result = await response.json();

    return result;
  } catch (err) {
    console.log(err);
  }
}

export default getBundlePackageCode;
