export const list = [
  /*   {
    // 5大题 5-1系列
    type: 1, // 答题类型 视频
    question: "1、投递员接收客户名片有偏字时，选择正确的场景.(本题总计10分)",
    videos: [
      {
        url: "/src/assets/videos/1_dui.mp4",
        isChecked: false, //是否选中
        isTrue: true, // 标记是否是正确答案 true 正确，false 错误
      },
      {
        url: "/src/assets/videos/2_cuo.mp4",
        isChecked: false,
        isTrue: false,
      },
      {
        url: "/src/assets/videos/3_cuo.mp4",
        isChecked: false,
        isTrue: false,
      },
      {
        url: "/src/assets/videos/4_cuo.mp4",
        isChecked: false,
        isTrue: false,
      },
    ],
  }, */
  /*  {
    // 5大题 5-2系列   图片和对应的类别绑定
    type: 2, // 答题类型 视频
    question:
      "在新增客户信息采集时，选出对应场景所属行业.(本题总计10分,选对一题得1分)",
    images: [
      {
        url: "/src/assets/imgs/5/2/3/1.png", //5_2_3
        isChecked: false,
        classType: 1, //对应的类别
      },
      {
        url: "/src/assets/imgs/5/2/3/2.png",
        isChecked: false,
        classType: 2,
      },
      {
        url: "/src/assets/imgs/5/2/3/3.png",
        isChecked: false,
        classType: 3,
      },
      {
        url: "/src/assets/imgs/5/2/3/4.png",
        isChecked: false,
        classType: 4,
      },
      {
        url: "/src/assets/imgs/5/2/3/5.png",
        isChecked: false,
        classType: 5,
      },
      {
        url: "/src/assets/imgs/5/2/3/6.png",
        isChecked: false,
        classType: 6,
      },
      {
        url: "/src/assets/imgs/5/2/3/7.png",
        isChecked: false,
        classType: 7,
      },
      {
        url: "/src/assets/imgs/5/2/3/8.png",
        isChecked: false,
        classType: 8,
      },
      {
        url: "/src/assets/imgs/5/2/3/9.png",
        isChecked: false,
        classType: 9,
      },
      {
        url: "/src/assets/imgs/5/2/3/10.png",
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
  {
    //2答题 1_2_1 输入快递费用 根据图片输入每个问题的费用
    type: 3, // 输入费用
    question: "请根据自费表，填入正确的资费总额",
    images: [
      {
        url: "/src/assets/imgs/jisuan/jisuan_1.png", //5_2_3
        values: [3, 5, 42, 8, 7], //对应的费用实际费用
      },
    ],
    // 条目
    inputText: [
      {
        text: "1.江苏宿迁收寄1件到苏州的国内快递，重量350克，计算资费(共)",
        value: "", //输入的费用
        realValue: 3, //实际费用
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
  },
  {
    // 3大题 排序配送
    type: 4,
    question:
      "1、某市东环路100cm号为投递站点，投递人员按照上述区域合理设计路线，保障邮件优先级，同时在不违反交通规则的前提下，投递线路为最优。（投递出班时间为每日8:30，每投递一个邮件需要7分钟）",
    images: [
      {
        url: "http://123.57.230.57:6011/images/1.png",
        values: [17, 97, 23, 34, 13, 89, 77, 53, 71, 64], //正确配送路线
      },
    ],
    selectList: [
      {
        id: 17, //选项内容
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
  },
];
