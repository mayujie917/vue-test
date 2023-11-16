import { rowNormalData, rowErrorData } from "./data";

export const numberList = {
  0: "一",
  1: "二",
  2: "三",
  3: "四",
  4: "五",
  5: "六",
  6: "七",
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
    /*     let _normalArr = getRandomData(t, maxAllData.length);
    _normalArr.forEach((item) => {
      _normalData.push(allData[item]);
    }); */
    _normalData = [
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
    ];

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
      "1、根据所给的寄递物品图片，点击禁寄物品图片放入制定区域。（总分25分）",
    images: getSerialDataBy(5, 16, 4, 20),
    /*  images: [
      {
        url: "http://123.57.230.57:6011/assets/imgs/2/n_1.png",
        type: 1, //可寄送物品
        isChecked: false, // 是否已经选中
        desc: "玻璃杯",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/2/n_2.png",
        type: 1, //可寄送物品
        isChecked: false,
        desc: "纸巾",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/2/n_3.png",
        type: 1, //可寄送物品
        isChecked: false,
        desc: "书本",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/2/n_4.png",
        type: 1, //可寄送物品
        isChecked: false,
        desc: "户口本",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/2/n_5.png",
        type: 1, //可寄送物品
        isChecked: false,
        desc: "裤子",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/2/n_7.png",
        type: 1, //可寄送物品
        isChecked: false,
        desc: "玩具",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/2/n_8.png",
        type: 1, //可寄送物品
        isChecked: false,
        desc: "食品",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/2/n_9.png",
        type: 1, //可寄送物品
        isChecked: false,
        desc: "球拍",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/2/n_10.png",
        type: 1, //可寄送物品
        isChecked: false,
        desc: "圆珠笔",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/2/n_12.png",
        type: 1, //可寄送物品
        isChecked: false,
        desc: "手册",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/2/n_14.png",
        type: 1, //可寄送物品
        isChecked: false,
        desc: "牙签",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/2/n_15.png",
        type: 1, //可寄送物品
        isChecked: false,
        desc: "牙刷",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/2/n_16.png",
        type: 1, //可寄送物品
        isChecked: false,
        desc: "T恤",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/2/n_17.png",
        type: 1, //可寄送物品
        isChecked: false,
        desc: "晾衣架",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/2/n_18.png",
        type: 1, //可寄送物品
        isChecked: false,
        desc: "雨伞",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/2/b_17.png",
        type: 2, //禁寄送物品
        isChecked: false,
        desc: "存储卡",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/2/b_18.png",
        type: 2, //禁寄送物品
        isChecked: false,
        desc: "油漆",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/2/b_23.png",
        type: 2, //禁寄送物品
        isChecked: false,
        desc: "象牙",
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/2/b_25.png",
        type: 2, //禁寄送物品
        isChecked: false,
        desc: "樟脑油",
      },
    ], */
    correct_answer: "",
    incorrect_answers: [""],
    selectList: [],
    isCurrent: false,
  },
  {
    type: 8,
    question: "2、根据所给的寄递物品图片，点击物品进行查验。（总分25分）",
    images: getSerialDataBy(8, 5, 4, 5),
    isCurrent: false,
    /* images: [
			{
				url: "http://123.57.230.57:6011/assets/imgs/2/n_1.png",
				type: 1, //可寄送物品
				isChecked: false, // 是否已经选中
				desc: "玻璃杯",
				subImages: [
					{
						url: "http://123.57.230.57:6011/assets/imgs/2/n_2.png",
						type: 1, //可寄送物品
						isChecked: false,
						desc: "纸巾",
					},
					{
						url: "http://123.57.230.57:6011/assets/imgs/2/n_3.png",
						type: 1, //可寄送物品
						isChecked: false,
						desc: "书本",
					},
					{
						url: "http://123.57.230.57:6011/assets/imgs/2/n_4.png",
						type: 1, //可寄送物品
						isChecked: false,
						desc: "户口本",
					},
					{
						url: "http://123.57.230.57:6011/assets/imgs/2/n_5.png",
						type: 1, //可寄送物品
						isChecked: false,
						desc: "裤子",
					},
				],
			},
			{
				url: "http://123.57.230.57:6011/assets/imgs/2/n_2.png",
				type: 1, //可寄送物品
				isChecked: false,
				desc: "纸巾",
				subImages: [
					{
						url: "http://123.57.230.57:6011/assets/imgs/2/n_2.png",
						type: 1, //可寄送物品
						isChecked: false,
						desc: "纸巾",
					},
					{
						url: "http://123.57.230.57:6011/assets/imgs/2/n_3.png",
						type: 1, //可寄送物品
						isChecked: false,
						desc: "书本",
					},
					{
						url: "http://123.57.230.57:6011/assets/imgs/2/n_4.png",
						type: 1, //可寄送物品
						isChecked: false,
						desc: "户口本",
					},
					{
						url: "http://123.57.230.57:6011/assets/imgs/2/n_5.png",
						type: 1, //可寄送物品
						isChecked: false,
						desc: "裤子",
					},
				],
			},
			{
				url: "http://123.57.230.57:6011/assets/imgs/2/n_3.png",
				type: 1, //可寄送物品
				isChecked: false,
				desc: "书本",
				subImages: [
					{
						url: "http://123.57.230.57:6011/assets/imgs/2/n_2.png",
						type: 1, //可寄送物品
						isChecked: false,
						desc: "纸巾",
					},
					{
						url: "http://123.57.230.57:6011/assets/imgs/2/n_3.png",
						type: 1, //可寄送物品
						isChecked: false,
						desc: "书本",
					},
					{
						url: "http://123.57.230.57:6011/assets/imgs/2/n_4.png",
						type: 1, //可寄送物品
						isChecked: false,
						desc: "户口本",
					},
					{
						url: "http://123.57.230.57:6011/assets/imgs/2/n_5.png",
						type: 1, //可寄送物品
						isChecked: false,
						desc: "裤子",
					},
				],
			},
			{
				url: "http://123.57.230.57:6011/assets/imgs/2/n_4.png",
				type: 1, //可寄送物品
				isChecked: false,
				desc: "户口本",
				subImages: [
					{
						url: "http://123.57.230.57:6011/assets/imgs/2/n_2.png",
						type: 1, //可寄送物品
						isChecked: false,
						desc: "纸巾",
					},
					{
						url: "http://123.57.230.57:6011/assets/imgs/2/n_3.png",
						type: 1, //可寄送物品
						isChecked: false,
						desc: "书本",
					},
					{
						url: "http://123.57.230.57:6011/assets/imgs/2/n_4.png",
						type: 1, //可寄送物品
						isChecked: false,
						desc: "户口本",
					},
					{
						url: "http://123.57.230.57:6011/assets/imgs/2/n_5.png",
						type: 1, //可寄送物品
						isChecked: false,
						desc: "裤子",
					},
				],
			},
			{
				url: "http://123.57.230.57:6011/assets/imgs/2/n_5.png",
				type: 1, //可寄送物品
				isChecked: false,
				desc: "裤子",
				subImages: [
					{
						url: "http://123.57.230.57:6011/assets/imgs/2/n_2.png",
						type: 1, //可寄送物品
						isChecked: false,
						desc: "纸巾",
					},
					{
						url: "http://123.57.230.57:6011/assets/imgs/2/n_3.png",
						type: 1, //可寄送物品
						isChecked: false,
						desc: "书本",
					},
					{
						url: "http://123.57.230.57:6011/assets/imgs/2/n_4.png",
						type: 1, //可寄送物品
						isChecked: false,
						desc: "户口本",
					},
					{
						url: "http://123.57.230.57:6011/assets/imgs/2/n_5.png",
						type: 1, //可寄送物品
						isChecked: false,
						desc: "裤子",
					},
				],
			},
		], */
  },
  {
    // 3根据图片，选择缺少的省份
    type: 7,
    question: "3、根据所给面单寄达地名选择相对于省份名。（总分25分）",
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
      { cityValue: "2", cityName: "天津市" },
      { cityValue: "3", cityName: "上海市" },
      { cityValue: "4", cityName: "重庆市" },
      { cityValue: "5", cityName: "河北省" },
      { cityValue: "6", cityName: "山西省" },
      { cityValue: "7", cityName: "辽宁省" },
      { cityValue: "9", cityName: "黑龙江省" },
      { cityValue: "10", cityName: "江苏省" },
      { cityValue: "11", cityName: "浙江省" },
      { cityValue: "12", cityName: "安徽省" },
      { cityValue: "13", cityName: "福建省" },
      { cityValue: "14", cityName: "江西省" },
      { cityValue: "15", cityName: "山东省" },
      { cityValue: "16", cityName: "河南省" },
      { cityValue: "17", cityName: "湖北省" },
      { cityValue: "20", cityName: "海南省" },
      { cityValue: "21", cityName: "四川省" },
      { cityValue: "22", cityName: "贵州省" },
      { cityValue: "23", cityName: "云南省" },
    ],
    isCurrent: false,
  },
  {
    // 根据图片显示快递费用， 输入对应的费用
    type: 3, // 输入费用
    question:
      "4、根据所给的“国内快递基础资费表”，在横线处填写资费。（总分25分）",
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
    // value: [], // 输入的费用
    total: 0, // 资费总额
    imagesText: [],
    isCurrent: false,
  },

  {
    //  根据图片内容展示，依次排序配送顺序 路线
    type: 4,
    question:
      "5、某市东环路100cm号为投递站点，投递人员按照上述区域合理设计路线，保障邮件优先级别，同时在不违反交通规则的前提下，投递线路为最优。（投递出班时间为每日8:30，每投递一个邮件需要7分钟)",
    images: [
      {
        url: "http://123.57.230.57:6011/assets/imgs/map/1.jpg",
        url: "/assets/imgs/map/1.jpg",
        values: [17, 97, 23, 34, 13, 89, 77, 53, 71, 64], //正确配送路线
      },
    ],
    selectList: [
      {
        id: 17, //选项内容 对应实际正确的路线值
        value: "17", //选项值
        isChecked: false, // 是否选中
      },
      {
        id: 97, //选项内容
        value: "97", //选项值
        isChecked: false, // 是否选中
      },
      {
        id: 17, //选项内容
        value: "17", //选项值
        isChecked: false, // 是否选中
      },
      {
        id: 23, //选项内容
        value: "23", //选项值
        isChecked: false, // 是否选中
      },
      {
        id: 34, //选项内容
        value: "34", //选项值
        isChecked: false, // 是否选中
      },
      {
        id: 13, //选项内容
        value: "13", //选项值
        isChecked: false, // 是否选中
      },
      {
        id: 89, //选项内容
        value: "89", //选项值
        isChecked: false, // 是否选中
      },

      {
        id: 77, //选项内容
        value: "77", //选项值
        isChecked: false, // 是否选中
      },
      {
        id: 53, //选项内容
        value: "53", //选项值
        isChecked: false, // 是否选中
      },
      {
        id: 71, //选项内容
        value: "71", //选项值
        isChecked: false, // 是否选中
      },
      {
        id: 64, //选项内容
        value: "64", //选项值
        isChecked: false, // 是否选中
      },
    ],
    answers: [],
    isCurrent: false,
  },

  {
    // 4个视频，根据题目选择正确视频
    type: 1, // 答题类型 视频
    question: "6、投递员接收客户名片有偏字时，选择正确的场景.(本题总计10分)",
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
  },

  /* {
    //  根据图片展示的内容，选择对应的行业 与图片匹配
    type: 2, // 答题类型
    question:
      "4、在新增客户信息采集时，选出对应场景所属行业.(本题总计10分,选对一题得1分)",
    images: [
      {
        url: "http://123.57.230.57:6011/assets/imgs/5/2/3/1.png", //5_2_3
        isChecked: false,
        classType: 1, //对应的类别
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/5/2/3/2.png",
        isChecked: false,
        classType: 2,
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/5/2/3/3.png",
        isChecked: false,
        classType: 3,
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/5/2/3/4.png",
        isChecked: false,
        classType: 4,
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/5/2/3/5.png",
        isChecked: false,
        classType: 5,
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/5/2/3/6.png",
        isChecked: false,
        classType: 6,
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/5/2/3/7.png",
        isChecked: false,
        classType: 7,
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/5/2/3/8.png",
        isChecked: false,
        classType: 8,
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/5/2/3/9.png",
        isChecked: false,
        classType: 9,
      },
      {
        url: "http://123.57.230.57:6011/assets/imgs/5/2/3/10.png",
        isChecked: false,
        classType: 10,
      },
    ],
    imagesText: [
      {
        classType: 1, // 正确对应答案，
        answerValue: "",
        isChecked: false,
        text: "化工业",
      },
      {
        classType: 2,
        answerValue: "",
        isChecked: false,
        text: "保险业",
      },
      {
        classType: 3,
        answerValue: "",
        isChecked: false,
        text: "家电业",
      },
      {
        classType: 4,
        answerValue: "",
        isChecked: false,
        text: "机械制造业",
      },
      {
        classType: 5,
        answerValue: "",
        isChecked: false,
        text: "服装业",
      },
      {
        classType: 6,
        answerValue: "",
        isChecked: false,
        text: "物流业",
      },
      {
        classType: 7,
        answerValue: "",
        isChecked: false,
        text: "医药业",
      },
      {
        classType: 8,
        answerValue: "",
        isChecked: false,
        text: "批发零售业",
      },
      {
        classType: 9,
        answerValue: "",
        isChecked: false,
        text: "网上贸易业",
      },
      {
        classType: 10,
        answerValue: "",
        isChecked: false,
        text: "金融业",
      },
      {
        classType: -1,
        answerValue: "",
        isChecked: false,
        text: "建筑业",
      },
      {
        classType: -2,
        answerValue: "",
        isChecked: false,
        text: "通信/IT业",
      },
    ],
  }, */

  /* {
    // 根据题目，排除超出范围的快件，剩余快件排序
    type: 6,
    question:
      "5、你的派送区域为扬州市秋雨路1-100门牌号,首先请将非投送范围的快件挑出,然后将剩余的快件按门牌从小到大的顺序进行排列.(本题总计25分，选对非投送范围得5分，派送顺序没排列正确1件的1分)",
    minValue: 1, // 配送范围起止号
    maxValue: 100,
    rowList: [
      {
        text: "扬州市秋雨路",
        serialNumber: 1, // 序列号
        value: 1,
        isChecked: false,
      },
      {
        text: "扬州市秋雨路",
        serialNumber: 2, // 序列号
        value: 2,
        isChecked: false,
      },
      {
        text: "扬州市秋雨路",
        serialNumber: 3, // 序列号
        value: 3,
        isChecked: false,
      },
      {
        text: "扬州市秋雨路",
        serialNumber: 5, // 序列号
        value: 5,
        isChecked: false,
      },
      {
        text: "扬州市秋雨路",
        serialNumber: 6, // 序列号
        value: 6,
        isChecked: false,
      },
      {
        text: "扬州市秋雨路",
        serialNumber: 7, // 序列号
        value: 7,
        isChecked: false,
      },
      {
        text: "扬州市秋雨路",
        serialNumber: 8, // 序列号
        value: 8,
        isChecked: false,
      },
      {
        text: "扬州市秋雨路",
        serialNumber: 9, // 序列号
        value: 9,
        isChecked: false,
      },
      {
        text: "扬州市秋雨路",
        serialNumber: 10, // 序列号
        value: 10,
        isChecked: false,
      },
      {
        text: "扬州市秋雨路",
        serialNumber: 11, // 序列号
        value: 11,
        isChecked: false,
      },
      {
        text: "扬州市秋雨路",
        serialNumber: 12,
        value: 12,
        isChecked: false,
      },
      {
        text: "扬州市秋雨路",
        serialNumber: 13,
        value: 13,
        isChecked: false,
      },
      {
        text: "扬州市秋雨路",
        serialNumber: 150,
        value: 150,
        isChecked: false,
      },
    ],
    selectList: [], //选中排序的数据
  }, */
];
