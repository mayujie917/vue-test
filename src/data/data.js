export const list = [
	{
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
	},
	{
		// 5大题 5-2系列   图片和对应的类别绑定
		type: 2, // 答题类型 视频
		question: "1、投递员接收客户名片有偏字时，选择正确的场景.(本题总计10分)",
		images: [
			{
				url: "/src/assets/imgs/2/n_1.png", //5_2_3
				isChecked: false,
				classType: 1, //对应的类别
			},
		],
		imagesText: [
			{
				classType: 1,
				isChecked: false,
				text: "化工业",
			},
			{
				classType: 1,
				isChecked: false,
				text: "保险业",
			},
			{
				classType: 1,
				isChecked: false,
				text: "家电业",
			},
			{
				classType: 1,
				isChecked: false,
				text: "机械制造业",
			},
			{
				classType: 1,
				isChecked: false,
				isChecked: false,
				text: "服装业",
			},
			{
				classType: 1,
				isChecked: false,
				text: "物流业",
			},
			{
				classType: 1,
				isChecked: false,
				text: "医药业",
			},
			{
				classType: 1,
				isChecked: false,
				text: "批发零售业",
			},
			{
				classType: 1,
				isChecked: false,
				text: "网上贸易业",
			},
			{
				classType: 1,
				isChecked: false,
				text: "金融业",
			},
			{
				classType: 1,
				isChecked: false,
				text: "建筑业",
			},
			{
				classType: 1,
				isChecked: false,
				text: "通信/IT业",
			},
		],
	},
	{
		//2答题 1_2_1 输入快递费用 根据图片输入每个问题的费用
		type: 3, // 输入费用
		question: "请根据自费表，填入正确的资费总额",
		images: [
			{
				url: "/src/assets/imgs/jisuan/jisuan_1.png", //5_2_3
				values: [3,5,42,8,7], //对应的费用实际费用
			},
		],
		// 条目
		inputText: [
			{
				text: "1.江苏宿迁收寄1件到苏州的国内快递，重量350克，计算资费(共)",
				inputValue: "",//输入的费用
			},
			{
				text: "2.江苏宿迁收寄1件到南京的国内快递，重量1 公斤，计算资费(共)",
				inputValue: "",
			},
			{
				text: "3.江苏宿迁收寄1件到海南的国内快递，重量3公斤，计算资费(共)",
				inputValue: "",
			},
			{
				text: "4.江苏宿迁收寄1件到湖南的国内快递，重量1 公斤，计算资费(共)",
				inputValue: "",
			},
			{
				text: "5.江苏宿迁收寄3件到吉林的国内快递，重量500克，计算资费(共)",
				inputValue: "",
			},
		],
		// inputValue: [], // 输入的费用
		total: 0, // 资费总额
		imagesText: [],
	},
  {
    // 3大题 排序配送
    type:4,

  },
];