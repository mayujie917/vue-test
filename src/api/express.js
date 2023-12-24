import { get, put } from "../utils/request";

// http://127.0.0.1:8089/system/question/listAll 第一项
// http://127.0.0.1:8089/system/question/listAll2 第二项
// http://127.0.0.1:8089/system/question/listAll3 第三项
// http://127.0.0.1:8089/system/question/listAll3 第四项
// http://127.0.0.1:8089/system/question/listAll5 第五项

export function getTypeAList(params) {
  return get("/system/question/listAll", params);
}
export function getTypeBList(params) {
  return get("/system/question/listAll2", params);
}
export function getTypeCList(params) {
  return get("/system/question/listAll3", params);
}
export function getTypeDList(params) {
  return get("/system/question/listAll4", params);
}
export function getTypeEList(params) {
  return get("/system/question/listAll5", params);
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
