import { get } from "../utils/request";

export function getTypeAList(params) {
  return get("/system/questionBody/listAllA", params);
}
export function getTypeBList(params) {
  return get("/system/questionBody/listAllB", params);
}
export function getTypeCList(params) {
  return get("/system/questionBody/listAllC", params);
}
export function getTypeDList(params) {
  return get("/system/questionBody/listAllD", params);
}
export function name(params) {}
