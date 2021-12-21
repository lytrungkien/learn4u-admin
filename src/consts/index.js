export const URL = 'http://20.212.154.207:81';
export const token = window.localStorage.getItem("token-lingo-admin");
export const headers = { Authorization: `Bearer ${token}` };