import { http, HttpResponse } from "msw";
import CONSTANTS from "../constants/constants";

const {
  MOCK_REQUEST_PACKAGE_URL,
  MOCK_REQUEST_BOILERPLATE_URL,
  MOCK_REQUEST_SAVE_URL,
} = CONSTANTS;
const allPackages = ["lodash", "nanoid"];

const handlers = [
  http.get(MOCK_REQUEST_BOILERPLATE_URL, ({ params }) => {
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
  http.get(MOCK_REQUEST_PACKAGE_URL, ({ params }) => {
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
  http.post(MOCK_REQUEST_SAVE_URL, () => {
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
