import Ticket from "./Ticket";
import config from "./config.json";

const baseUrl = config.serverUrl;

export async function allTicketsFromServer() {
  const url = makeUrl({
    method: "allTickets",
  });
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => response.json())
    .then((json) => parseDtoArrayJson(json));
}

export async function saveTicketOnServer(dto) {
  const url = makeUrl({
    method: "createTicket",
  });
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: encodeToUrlEncodedFormat(dto),
  })
    .then((response) => response.json())
    .then((json) => parseDtoJson(json));
}

export async function deleteByIdOnServer(dto) {
  const url = makeUrl({
    method: "deleteById",
    id: dto.id,
  });
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((response) => console.log(response));
}

export async function updateByIdOnServer(dto) {
  const url = makeUrl({
    method: "updateById",
    id: dto.id,
  });
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: encodeToUrlEncodedFormat(dto),
  })
    .then((response) => response.json())
    .then((json) => parseDtoJson(json));
}

export async function ticketByIdFromServer(dto) {
  const url = makeUrl({
    method: "ticketById",
    id: dto.id,
  });
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => response.json())
    .then((json) => parseDtoJson(json));
}

function encodeToUrlEncodedFormat(dto) {
  let body = [];
  for (const key of Object.keys(dto)) {
    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(dto[key]);
    body.push(encodedKey + "=" + encodedValue);
  }
  return body.join("&");
}

function makeUrl(queryParams) {
  const queryParamsMap = new Map(Object.entries(queryParams || {}));
  let url = baseUrl;
  if (queryParamsMap.size > 0) {
    url += "?";
  }
  let index = 0;
  for (const entry of queryParamsMap.entries()) {
    if (index !== 0) {
      url += "&";
    }
    url += entry[0] + "=" + entry[1];
    ++index;
  }
  return url;
}

function parseDtoJson(json) {
  return new Ticket(
    json.id,
    json.name,
    json.status === "true",
    json.description,
    new Date(json.created)
  );
}

function parseDtoArrayJson(jsonArray) {
  const array = [];
  if (jsonArray) {
    for (const dtoJson of jsonArray) {
      array.push(parseDtoJson(dtoJson));
    }
  }
  return array;
}
