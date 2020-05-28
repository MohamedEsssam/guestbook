import http from "./httpService";
import jwtDecode from "jwt-decode";
const apiEndpoint = "http://localhost:8000/api/user/";
http.setJwt(getJwt());

export async function login(info) {
  const { data, headers } = await http.post(apiEndpoint + "login", info);

  localStorage.setItem("token", headers["x-auth-token"]);

  return [data, headers];
}

export function register(data) {
  return http.post(apiEndpoint + "register", data);
}

export function logout() {
  localStorage.removeItem("token");
}

export function currentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem("token");
}
