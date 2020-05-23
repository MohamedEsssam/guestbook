import http from "./httpService";
const apiEndpointMessage = "http://localhost:8000/api/message/";
const apiEndpointReply = "http://localhost:8000/api/reply/";

export async function getMessage(id) {
  return await http.get(apiEndpointMessage + `${id}`);
}

export async function getMessages() {
  return await http.get(apiEndpointMessage);
}

export async function postMessage(data) {
  return await http.post(apiEndpointMessage, data);
}

export function updateMessage(data, messageId) {
  return http.put(apiEndpointMessage + `${messageId}`, data);
}

export function deleteMessage(data, messageId) {
  return http.delete(apiEndpointMessage + `${messageId}`, { data });
}

export function addReply(data) {
  return http.post(apiEndpointReply, data);
}

export function deleteReply(data) {
  return http.post(apiEndpointReply, data);
}
