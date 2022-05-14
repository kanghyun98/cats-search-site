// session storage를 위한 두 가지 func
export const callDataFunc = (key) => {
  const savedData = sessionStorage.getItem(key);
  return JSON.parse(savedData);
};

export const saveDataFunc = (key, value) => {
  const toJson = JSON.stringify(value);
  sessionStorage.setItem(key, toJson);
};
