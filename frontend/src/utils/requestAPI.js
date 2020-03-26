const PORT = '3000';

const sendRequest = (
  requestBody,
  { route, method },
  params = false,
  authentication = false
) => {
  let url = `https://localhost:${PORT}${route}`;
  let headers;

  if (!!params) {
    url = url + `${params}`;
  }

  if (!!authentication) {
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + authentication
    };
  } else {
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
  }

  return fetch(url, {
    method: method,
    headers: headers,
    body: JSON.stringify(requestBody)
  });
};

export default {
  sendRequest
};
