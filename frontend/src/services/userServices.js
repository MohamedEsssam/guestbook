import http from "./httpService";
const apiEndpoint = "http://localhost:8000/api/user/";

export async function login(data) {
  return await http.post(apiEndpoint + "login", data);
}

export function register(data) {
  return http.post(apiEndpoint + "register", data);
}
