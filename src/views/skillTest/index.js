import { List } from "@/data/index.js";

export let data = {
	name: "express",
	data() {
		return {
			currentIndex: 1, //当前大题题号
			subIndex: 0, //当前答题下的题号
			currentData: {
				selectList: [],
			}, //当前问题
			list: [], //原始数据
			selectedData: [], // 图文多选，已选中的数据
			previewModal:false, // 大图预览
      previewObj:{}, // 当前预览图片
		};
	},

	mounted() {
		this.list = List;
		// 初始 取每个大题里面的第一个小题
		this.currentData = this.list[this.currentIndex].children[0];
	},

	methods: {
		/**
		 * 1.单选
		 * @param {*} index
		 */
		clickSelectItem(item, index) {},
		/**
		 * 带有图片的多选
		 * @param {*} e
		 */
		selectItemHandle(item) {
			item.isChecked = !item.isChecked;
			if (item.isChecked) {
				this.selectedData.push(item);
			} else {
				item.isChecked = false;
				let _i = this.selectedData.findIndex((e) => e.id == item.id);
				console.log("index", _i);
				this.selectedData.splice(_i, 1);
			}
		},
    /**
     * 2大题
     */
    // 预览大图
    previewImgHandle(item){
      this.previewObj = item;
      this.previewModal = true; 
    },
    // 选中图片
    selectImgHandle(){
      this.previewModal = false;
    },

		preBtn() {},
		nextBtn() {},
	},
};