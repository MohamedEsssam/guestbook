import http from "./httpService";
const apiEndpointMessage = "http://localhost:8000/api/message/";
const apiEndpointReplay = "http://localhost:8000/api/replay/";

export async function getMessages() {
  return await http.get(apiEndpointMessage);
}

export async function postMessage(data) {
  return await http.post(apiEndpointMessage, data);
}

export function updateMessage(data) {
  return http.put(apiEndpointMessage, data);
}

export function deleteMessage(data) {
  return http.delete(apiEndpointMessage, data);
}

export function addReplay(data) {
  return http.post(apiEndpointReplay, data);
}

export function deleteReplay(data) {
  return http.post(apiEndpointReplay, data);
}
