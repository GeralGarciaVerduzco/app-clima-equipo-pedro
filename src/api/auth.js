import api, { setAuthToken } from "./client";

export async function register(email, password) {
  const res = await api.post("/auth/register", { email, password });
  const { accessToken, refreshToken } = res.data;

  
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  setAuthToken(accessToken);

  return res.data;
}

export async function login(email, password) {
  const res = await api.post("/auth/login", { email, password });
  
  const { accessToken, refreshToken } = res.data;

  localStorage.setItem("accessToken", accessToken);
  
  localStorage.setItem("refreshToken", refreshToken);
  
  setAuthToken(accessToken);

  return res.data;
}




export async function refresh() {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) throw new Error("No hay token disponible");

  const res = await api.post("/auth/refresh", { refreshToken });

  const { accessToken, refreshToken: newRefresh } = res.data;

  localStorage.setItem("accessToken", accessToken);

  localStorage.setItem("refreshToken", newRefresh);

  setAuthToken(accessToken);

  return res.data;
}



export function logout() {
  localStorage.removeItem("accessToken");

  localStorage.removeItem("refreshToken");

  setAuthToken(null);

}
