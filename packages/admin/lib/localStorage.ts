// localStorage.js
export const getLocalState = (key: string, parse = true) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return parse ? JSON.parse(serializedState) : serializedState;
  } catch (err) {
    return undefined;
  }
};

export const setLocalState = (key: string, value: any, stringify = true) => {
  try {
    const serializedState = stringify ? JSON.stringify(value) : value.toString();
    localStorage.setItem(key, serializedState);
  } catch {
    // ignore write errors
  }
};

export const removeLocalState = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore write errors
  }
};
