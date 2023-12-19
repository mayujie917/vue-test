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

//  获取唯一标识
export function getExamineeByUserId(params) {
  return get(
    "http://www.jszhiping.com/prod-api/app/examinee/getExamineeByUserId"
  );
}
export function markHandle(params) {
  return put("http://www.jszhiping.com/prod-api/examRecord/scoreRecord/mark");
}
