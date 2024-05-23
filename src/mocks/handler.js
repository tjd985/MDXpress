import { http, HttpResponse } from "msw";

const requestPackageURL = "/package/:package";
const requestBoilerPlateURL = "/id/:id/version/:version";
const requestSaveURL = "/id/:id";

const allPackages = ["lodash", "nanoid"];

const handlers = [
  http.get(requestBoilerPlateURL, ({ params }) => {
    const { id, version } = params;

    if (id === "first" && version === "first") {
      return HttpResponse.json({
        result: "OK",
        status: 200,
        content: {
          targetCode: "boilerPlate code",
          bundleCodeList: [],
        },
      });
    }

    return HttpResponse.json({
      result: "OK",
      status: 200,
      content: {
        targetCode: "saved code",
        bundleCodeList: [
          {
            packageInformation: "lodash 1.0",
            bundledPackageCode: "bundled package code",
          },
        ],
      },
    });
  }),
  http.get(requestPackageURL, ({ params }) => {
    const { package: packageName } = params;

    const isAvailable = allPackages.includes(packageName);

    if (!isAvailable) {
      return HttpResponse.JSON({
        status: 500,
        message: "Internal Server Error",
      });
    }

    return HttpResponse.json({
      result: "OK",
      status: 200,
      content: {
        packageInformation: "lodash 1.0",
        bundledPackageCode: "bundled package code",
      },
    });
  }),
  http.post(requestSaveURL, () => {
    return HttpResponse.json({
      result: "OK",
      status: 200,
      content: {
        latestVersion: "someVersion",
        temporaryUser: "someUserId",
      },
    });
  }),
];

export default handlers;
