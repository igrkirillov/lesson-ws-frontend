import config from "./config.json";
import User from "./User";
import Message from "./Message";

const baseUrl = config.serverUrl;
const wsUrl = config.wsUrl;

export async function createNewUserOnServer(name) {
  const url = baseUrl + "/new-user";
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name
    })
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.status === "ok") {
        return parseUserJson(json.user);
      } else {
        throw new Error(json.message);
      }
    });
}

function parseUserJson(json) {
  return new User(json.id, json.name);
}

export function createWebSocket() {
  return new WebSocket(wsUrl);
}

export function addWsMessageListener(ws, messageCallback, usersCallback) {
  ws.addEventListener("message", (event) => {
    const json = JSON.parse(event.data);
    if (json && json.type && json.type === "send") {
      messageCallback(parseMessageJson(json));
    } else {
      usersCallback(parseUsersJson(json));
    }
  });
}

export function sendWsMessage(ws, message) {
  ws.send(JSON.stringify({...message, type: "send"}));
}

export function sendWsExit(ws, user) {
  ws.send(JSON.stringify({type: "exit", user: user}));
}

function parseMessageJson(json) {
  return new Message(parseUserJson(json.user), new Date(json.dateTime), json.text);
}

function parseUsersJson(arrayJson) {
  return arrayJson.map(dtoJson => new User(dtoJson.id, dtoJson.name));
}
