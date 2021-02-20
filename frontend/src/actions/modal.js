import { OPEN_AUTH, CLOSE_AUTH } from "./types";

export const openAuth = (authType) => {
  return { type: OPEN_AUTH, payload: authType };
};

export const closeAuth = (authType) => {
  return { type: CLOSE_AUTH, payload: authType };
};