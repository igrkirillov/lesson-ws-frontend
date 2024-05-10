import config from "./config.json";
import User from "./User";

const baseUrl = config.serverUrl;

export async function createNewUserOnServer(name) {
  const url = baseUrl + "/new-user";
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      name: name
    }
  })
    .then((response) => response.json())
    .then((json) => parseDtoJson(json));
}

function parseDtoJson(json) {
  return new User(json.id, json.name);
}
