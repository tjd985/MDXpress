const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

async function saveCurrentCode(code, id) {
  try {
    const requestURL = `${SERVER_DOMAIN}/id/${id === ":id" ? "first" : id}`;

    const response = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
      }),
      credentials: "include",
    });

    const result = await response.json();

    return result;
  } catch (err) {
    console.err(err);
  }
}

export default saveCurrentCode;
