const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

interface LatestVersionType {
  version: number;
  code: string;
  packageList: { packageName: string };
}

interface VersionType {
  version: number;
  code: string;
  packageList: {
    [packageName: string]: string;
  };
  expireAt: Date;
}

interface SaveCodeResponseType {
  result: string;
  status: number;
  content: {
    latestVersion: LatestVersionType;
    temporaryUser: {
      version: Array<VersionType>;
      _id: string;
    };
  };
}

async function saveCurrentCode(
  code: string,
  id: string,
  packageList: { [packageName: string]: string },
): Promise<SaveCodeResponseType | undefined> {
  try {
    const requestURL = `${SERVER_DOMAIN}/id/${id === ":id" ? "first" : id}`;

    const response = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        packageList,
      }),
      credentials: "include",
    });

    const result = await response.json();

    return result;
  } catch (err) {
    console.log(err);
  }
}

export default saveCurrentCode;
