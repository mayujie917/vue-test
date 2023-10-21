export const List = [
  {
    // 大题
    id: 1,
    category: "1",
    children: [
      // 大题下的小题
      {
        type: "1",
        difficulty: "Easy",
        question:
          "1、某市东环路100cm号为投递站点，投递人员按照上述区域合理设计路线，保障邮件优先级，同时在不违反交通规则的前提下，投递线路为最优。（投递出班时间为每日8:30，每投递一个邮件需要7分钟）",
        imgUrl: "http://123.57.230.57:6011/images/1.png",
        images: [],
        correct_answer: "17,97,23,34,13,89,77,53,71,64",
        incorrect_answers: [""],
        selectList: [
          {
            id: 1,
            label: "1", //选项内容
            value: "1", //选项值
            isChecked: false, // 是否选中
          },
          {
            id: 2,
            label: "2", //选项内容
            value: "2", //选项值
            isChecked: false, // 是否选中
          },
          {
            id: 3,
            label: "3", //选项内容
            value: "3", //选项值
            isChecked: false, // 是否选中
          },
        ],
      },
    ],
  },

  {
    // 大题2 多个图片
    id: 1,
    category: "1",
    children: [
      // 大题下的小题
      {
        type: "3",
        difficulty: "Easy",
        question:
          "1、请从一下寄递物品图片中选出禁寄物品。(本题总计20分,选对一题5分)",
        imgUrl: "", //单个图片，根据图片做题
        images: [
          {
            url: "/src/assets/imgs/2/n_1.png",
            type: 1, //可寄送物品
            isChecked: false,
          },
          {
            url: "/src/assets/imgs/2/n_2.png",
            type: 1, //可寄送物品
            isChecked: false,
          },
          {
            url: "/src/assets/imgs/2/n_3.png",
            type: 1, //可寄送物品
            isChecked: false,
          },
          {
            url: "/src/assets/imgs/2/n_4.png",
            type: 1, //可寄送物品
            isChecked: false,
          },
          {
            url: "/src/assets/imgs/2/n_5.png",
            type: 1, //可寄送物品
            isChecked: false,
          },
          {
            url: "/src/assets/imgs/2/n_7.png",
            type: 1, //可寄送物品
            isChecked: false,
          },
          {
            url: "/src/assets/imgs/2/n_8.png",
            type: 1, //可寄送物品
            isChecked: false,
          },
          {
            url: "/src/assets/imgs/2/n_9.png",
            type: 1, //可寄送物品
            isChecked: false,
          },
          {
            url: "/src/assets/imgs/2/n_10.png",
            type: 1, //可寄送物品
            isChecked: false,
          },
          {
            url: "/src/assets/imgs/2/n_12.png",
            type: 1, //可寄送物品
            isChecked: false,
          },
          {
            url: "/src/assets/imgs/2/n_14.png",
            type: 1, //可寄送物品
            isChecked: false,
          },
          {
            url: "/src/assets/imgs/2/n_15.png",
            type: 1, //可寄送物品
            isChecked: false,
          },
          {
            url: "/src/assets/imgs/2/n_16.png",
            type: 1, //可寄送物品
            isChecked: false,
          },
          {
            url: "/src/assets/imgs/2/n_17.png",
            type: 1, //可寄送物品
            isChecked: false,
          },
          {
            url: "/src/assets/imgs/2/n_18.png",
            type: 1, //可寄送物品
            isChecked: false,
          },
          {
            url: "/src/assets/imgs/2/b_17.png",
            type: 2, //禁寄送物品
            isChecked: false,
          },
          {
            url: "/src/assets/imgs/2/b_18.png",
            type: 2, //禁寄送物品
            isChecked: false,
          },
          {
            url: "/src/assets/imgs/2/b_23.png",
            type: 2, //禁寄送物品
            isChecked: false,
          },
          {
            url: "/src/assets/imgs/2/b_25.png",
            type: 2, //禁寄送物品
            isChecked: false,
          },
        ],
        correct_answer: "17,97,23,34,13,89,77,53,71,64",
        incorrect_answers: [""],
        selectList: [],
      },
    ],
  },

  {
    // 视频，选择一个
    id: 1,
    category: "1",
    children: [
      // 大题下的小题
      {
        type: "4", // 视频
        difficulty: "Easy",
        question:
          "1、投递员接收客户名片有偏字时，选择正确的场景.(本题总计10分)",
        imgUrl: "", //单个图片，根据图片做题
        images: [],
        videos: [
          {
            url: "/src/assets/videos/1_dui.mp4",
            isChecked: false,
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
        correct_answer: "17,97,23,34,13,89,77,53,71,64",
        incorrect_answers: [""],
        selectList: [],
      },
    ],
  },
];
