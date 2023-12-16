import { rowNormalData, rowErrorData } from "./data";

export const numberList = {
  0: "一",
  1: "二",
  2: "三",
  3: "四",
  4: "五",
  5: "六",
  6: "七",
  7: "八",
  8: "九",
  9: "十",
};
let normalList = [];
/**
 *
 * @param {*} type 答题类型
 * @param {*} t  可寄送物品数量
 * @param {*} f  不可寄送物品数量
 * @param {*} total  题的数量
 */
export function getSerialDataBy(type, t, f, total) {
  if (type == 5) {
    let _rowNormalData = JSON.parse(JSON.stringify(rowNormalData));
    let _rowErrorData = JSON.parse(JSON.stringify(rowErrorData));
    // 16 件 ，可寄送物品， 4 件不可寄送物品
    normalList = [];
    let normalData = getRandomData(t, _rowNormalData.length); //可寄送数据
    normalList = [];
    let errorData = getRandomData(f, _rowErrorData.length); // 不可寄数据
    normalList = [];
    let mixData = [];
    normalData.forEach((item) => {
      mixData.push(_rowNormalData[item]);
    });
    errorData.forEach((item) => {
      mixData.push(_rowErrorData[item]);
    });
    let randomArr = getRandomData(20, total);
    normalList = [];
    let targetData = [];
    randomArr.forEach((item) => {
      targetData.push(mixData[item]);
    });
    return targetData;
  } else if (type == 6) {
    let _rowNormalData = JSON.parse(JSON.stringify(rowNormalData));
    let _rowErrorData = JSON.parse(JSON.stringify(rowErrorData));
    // 16 件 ，可寄送物品， 4 件不可寄送物品
    normalList = [];
    let normalData = getRandomData(t, _rowNormalData.length); //可寄送数据
    normalList = [];
    let errorData = getRandomData(f, _rowErrorData.length); // 不可寄数据
    normalList = [];
    let mixData = [];
    normalData.forEach((item) => {
      mixData.push(_rowNormalData[item]);
    });
    errorData.forEach((item) => {
      mixData.push(_rowErrorData[item]);
    });
    let randomArr = getRandomData(10, total);
    normalList = [];
    let targetData = [];
    randomArr.forEach((item) => {
      targetData.push(mixData[item]);
    });
    return targetData;
  } else if (type == 8) {
    let _rowNormalData = JSON.parse(JSON.stringify(rowNormalData));
    let _rowErrorData = JSON.parse(JSON.stringify(rowErrorData));
    //寄递 物品5件，每件里面有4 小件
    let allData = [..._rowNormalData, ..._rowErrorData];
    let maxAllData = [];
    normalList = [];
    let maxArray = getRandomData(5, allData.length - 1);
    maxArray.forEach((item) => {
      maxAllData.push(allData[item]); // 正常、禁寄物品，混合后的数据
    });

    normalList = [];
    let _normalData = [];
    let _normalArr = getRandomData(t, maxAllData.length);
    _normalArr.forEach((item) => {
      _normalData.push(allData[item]);
    });
    /*  _normalData = [
      {
        url: "http://123.57.230.57:6011/assets/imgs/normal/毛绒玩具.png",
        type: 1,
        isChecked: false,
        desc: "毛绒玩具",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/normal/鞋子.png",
        type: 1,
        isChecked: false,
        desc: "鞋子",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/normal/衣服.png",
        type: 1,
        isChecked: false,
        desc: "衣服",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/normal/雨伞.png",
        type: 1,
        isChecked: false,
        desc: "雨伞",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/normal/裤子.png",
        type: 1,
        isChecked: false,
        desc: "裤子",
      },
    ]; */

    _normalData.forEach((item) => {
      normalList = [];
      item.subImages = [];
      let _arr = getRandomData(f, maxAllData.length);
      _arr.forEach((el) => {
        item.subImages.push(allData[el]);
      });
    });
    return _normalData;
  }
}

function getRandomData(t, total) {
  let _random = Math.floor(Math.random() * total);
  if (normalList.length < t) {
    if (normalList.indexOf(_random) == -1) normalList.push(_random);
    getRandomData(t, total);
  }
  return normalList;
}

export const list = [
  {
    // 1多张图片中，选出禁寄物品
    type: 5,
    question:
      "1、根据所给的寄递物品图片，<span style='color: #f00;font-weight: 700;'>点击</span>禁寄物品图片放入制定区域。",
    images: getSerialDataBy(5, 16, 4, 20),
    correct_answer: "",
    incorrect_answers: [""],
    selectList: [],
    isCurrent: false,
    isDone: false, // 当前题是否已作答
    score: 0, //得分
    totalScore: 20, //当前题分值
  },
  {
    type: 8,
    question:
      "2、根据所给的寄递物品图片，<span style='color: #f00;font-weight: 700;'>点击</span>物品进行查验。",
    images: getSerialDataBy(8, 5, 4, 5),
    isCurrent: false,
    isDone: false,
    score: 0,
    totalScore: 20,
  },
  {
    // 根据图片显示快递费用， 输入对应的费用
    type: 3, // 输入费用
    question: "4、根据所给的“国内快递基础资费表”，在横线处填写资费",
    images: [
      {
        url: "http://123.57.230.57:6011/assets/imgs/jisuan/1-1.jpg",
        // values: [3, 5, 42, 8, 7], //对应的费用实际费用
      },
    ],
    // 条目
    inputText: [
      {
        text: "1.江苏宿迁收寄1件到苏州的国内快递，重量350克，计算资费(共)",
        value: "", //输入的费用
        realValue: 3, //实际费用   value、realValue比较计算费用
      },
      {
        text: "2.江苏宿迁收寄1件到南京的国内快递，重量1 公斤，计算资费(共)",
        value: "",
        realValue: 5,
      },
      {
        text: "3.江苏宿迁收寄1件到海南的国内快递，重量3公斤，计算资费(共)",
        value: "",
        realValue: 42,
      },
      {
        text: "4.江苏宿迁收寄1件到湖南的国内快递，重量1 公斤，计算资费(共)",
        value: "",
        realValue: 8,
      },
      {
        text: "5.江苏宿迁收寄3件到吉林的国内快递，重量500克，计算资费(共)",
        value: "",
        realValue: 7,
      },
    ],
    total: 0, // 资费总额
    imagesText: [],
    isCurrent: false,
    isDone: false,
    score: 0,
    totalScore: 20,
  },

  {
    type: 6,
    question:
      "4.根据显示的快递物品，进行智能快递箱派送预处理，<span style='color: #f00;font-weight: 700;'>点击</span>不能投递的物品图片放入下方。",
    images: getSerialDataBy(6, 8, 2, 10),
    isCurrent: false,
    isDone: false,
    score: 0,
    totalScore: 20,
  },
  {
    // 3根据图片，选择缺少的省份
    type: 7,
    question: "3、根据所给面单寄达地名选择相对于省份名。",
    images: [
      {
        url: "http://123.57.230.57:6011/assets/imgs/1/1.png",
        cityValue: "1",
        cityName: "北京市",
        selectValue: "",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/1/2.png",
        cityValue: "2",
        cityName: "天津市",
        selectValue: "",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/1/3.png",
        cityValue: "3",
        cityName: "上海市",
        selectValue: "",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/1/4.png",
        cityValue: "4",
        cityName: "重庆市",
        selectValue: "",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/1/5.png",
        cityValue: "5",
        cityName: "河北省",
        selectValue: "",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/1/6.png",
        cityValue: "6",
        cityName: "山西省",
        selectValue: "",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/1/7.png",
        cityValue: "7",
        cityName: "辽宁省",
        selectValue: "",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/1/9.png",
        cityValue: "9",
        cityName: "黑龙江省",
        selectValue: "",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/1/10.png",
        cityValue: "10",
        cityName: "江苏省",
        selectValue: "",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/1/11.png",
        cityValue: "11",
        cityName: "浙江省",
        selectValue: "",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/1/12.png",
        cityValue: "12",
        cityName: "安徽省",
        selectValue: "",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/1/13.png",
        cityValue: "13",
        cityName: "福建省",
        selectValue: "",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/1/14.png",
        cityValue: "14",
        cityName: "江西省",
        selectValue: "",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/1/15.png",
        cityValue: "15",
        cityName: "山东省",
        selectValue: "",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/1/16.png",
        cityValue: "16",
        cityName: "河南省",
        selectValue: "",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/1/17.png",
        cityValue: "17",
        cityName: "湖北省",
        selectValue: "",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/1/20.png",
        cityValue: "20",
        cityName: "海南省",
        selectValue: "",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/1/21.png",
        cityValue: "21",
        cityName: "四川省",
        selectValue: "",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/1/22.png",
        cityValue: "22",
        cityName: "贵州省",
        selectValue: "",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/1/23.png",
        cityValue: "23",
        cityName: "云南省",
        selectValue: "",
      },
    ],
    citys: [
      { cityValue: "1", cityName: "北京市" },
      { cityValue: "17", cityName: "湖北省" },
      { cityValue: "2", cityName: "天津市" },
      { cityValue: "5", cityName: "河北省" },
      { cityValue: "3", cityName: "上海市" },
      { cityValue: "6", cityName: "山西省" },
      { cityValue: "14", cityName: "江西省" },
      { cityValue: "13", cityName: "福建省" },
      { cityValue: "4", cityName: "重庆市" },
      { cityValue: "16", cityName: "河南省" },
      { cityValue: "11", cityName: "浙江省" },
      { cityValue: "15", cityName: "山东省" },
      { cityValue: "7", cityName: "辽宁省" },
      { cityValue: "9", cityName: "黑龙江省" },
      { cityValue: "10", cityName: "江苏省" },
      { cityValue: "22", cityName: "贵州省" },
      { cityValue: "12", cityName: "安徽省" },
      { cityValue: "20", cityName: "海南省" },
      { cityValue: "23", cityName: "云南省" },
      { cityValue: "21", cityName: "四川省" },
    ],
    isCurrent: false,
    isDone: false,
    score: 0,
    totalScore: 20,
  },
  {
    // 4个视频，根据题目选择正确视频
    type: 1, // 答题类型 视频
    question: "6、投递员接收客户名片有偏字时，选择正确的场景。",
    videos: [
      {
        url: "http://123.57.230.57:6011/assets/videos/1_dui.mp4",
        isChecked: false, //是否选中
        isTrue: true, // 标记是否是正确答案 true 正确，false 错误
      },
      {
        url: "http://123.57.230.57:6011/assets/videos/2_cuo.mp4",
        isChecked: false,
        isTrue: false,
      },
      {
        url: "http://123.57.230.57:6011/assets/videos/3_cuo.mp4",
        isChecked: false,
        isTrue: false,
      },
      {
        url: "http://123.57.230.57:6011/assets/videos/4_cuo.mp4",
        isChecked: false,
        isTrue: false,
      },
    ],
    isCurrent: false,
    isDone: false,
    score: 0,
  },
  {
    type: 9,
    // question: "5.当客户投诉 (快递签收未收到) 时，选出正确的投诉处理流程",
    question:
      "5.当客户投诉（遗失和破损）时，选出正确的投诉处理流程。（总分：10分）",

    images: [
      {
        id: 1,
        text: "回访收件人，确定收件人是否解决",
        index: 3, //选择顺序
        isTrue: true, // 是否是正确选项，
        isChecked: false, // 是否已选择
      },
      {
        id: 2,
        text: "半小时内电联投诉人，并耐心听取客户诉求",
        index: 1,
        isTrue: true, // 是否是正确选项，
        isChecked: false, // 是否已选择
      },
      {
        id: 3,
        text: "让客户自己联系总公司处理",
        index: 4,
        isTrue: false, // 是否是正确选项，
        isChecked: false, // 是否已选择
      },
      {
        id: 4,
        text: "核实情况，并积极处理",
        index: 2,
        isTrue: true, // 是否是正确选项，
        isChecked: false, // 是否已选择
      },
      {
        id: 5,
        text: "有空的时候电联客户了解情况",
        index: -1, //不是正确选项，顺序为-1
        isTrue: false, // 是否是正确选项，
        isChecked: false, // 是否已选择
      },
    ],
    selectValue: [1, 2, 3, 4], // 正确选择顺序
    isCurrent: false,
    isDone: false,
    score: 0,
    totalScore: 20,
  },

  {
    //  根据图片内容展示，依次排序配送顺序 路线
    type: 4,
    question:
      "5、某市东环路100cm号为投递站点，投递人员按照上述区域合理设计路线，保障邮件优先级别，同时在不违反交通规则的前提下，投递线路为最优。（投递出班时间为每日8:30，每投递一个邮件需要7分钟)",
    images: [
      {
        url: "http://123.57.230.57:6011/assets/imgs/map/1.jpg",
        // url: "/assets/imgs/map/1.jpg",
        // values: [97, 77, 89, 13, 23, 34, 17, 53, 71, 64, 100], //正确配送路线
      },
    ],
    selectValue: "1", // 正确答案
    selectList: [
      {
        id: 1,
        value: "100-89-13-23-97-71-64-17-53-77-100",
        isChecked: false,
        isRealValue: true,
      },
      {
        id: 2,
        value: "100-13-23-97-34-53-71-64-17-88-77-100",
        isChecked: false,
        isRealValue: false,
      },
      {
        id: 3,
        value: "100-77-89-17-23-97-53-71-64-34-84-100",
        isChecked: false,
        isRealValue: false,
      },
    ],
    answers: [],
    isCurrent: false,
    isDone: false,
    totalScore: 20, //分值
  },
];
