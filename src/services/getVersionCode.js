const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

async function getVersionCode(id, version) {
  try {
    const requestURL = `${SERVER_DOMAIN}/id/${id === ":id" ? "first" : id}/version/${version === ":version" ? "first" : version}`;

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

export default getVersionCode;
