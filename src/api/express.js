import { get } from "../utils/request";

export function getTypeOneList(params) {
  return get("/system/questionBody/listAllA",params);
}