const TOKEN_KEY = "token";

export const login = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return localStorage.getItem(TOKEN_KEY);
  }

  return "";
};

export const logout = () => {
  localStorage.clear()
};

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }

  return false;
};
