import { List } from "@/data/index.js";

export let data = {
  name: "express",
  data() {
    return {
      tipsModal: false, //提示弹窗
      tipsTitle: "该物品已经选择过了！", // 提示内容
      previewModal: false, // 大图预览
      previewObj: {}, // 当前预览图片
      currentIndex: 0, //当前大题题号
      subIndex: 0, //当前答题下的题号
      currentData: {
        selectList: [],
      }, //当前问题
      list: [], //原始数据
      selectedData: [], // 当前已选中的数据，每次切换题，从原数据更具checked 重新获取
    };
  },

  mounted() {
    this.list = List;
    // 初始 取每个大题里面的第一个小题
    // this.currentData = this.list[this.currentIndex].children[0];
    this.$set(
      this,
      "currentData",
      this.list[this.currentIndex].children[this.subIndex]
    );
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
    previewImgHandle(item, index) {
      console.log(22333, item);
      if (this.selectedData.length == 4) return;
      if (item.isChecked) {
        // 判断是否已经选过
        this.tipsTitle = "该物品已经选择过了！";
        this.tipsModal = true;
        return false;
      }
      this.previewObj = item;
      this.previewModal = true;
    },
    // 确认选中图片
    selectImgHandle() {
      this.previewModal = false;
      this.previewObj.isChecked = true;
      this.selectedData.push(this.previewObj);
      this.list[this.currentIndex].children[this.subIndex].images.forEach(
        (item) => {
          if (item.url == this.previewObj.url) {
            item.isChecked = true;
          }
        }
      );
    },
    cancelPrevView() {
      this.previewObj.isChecked = false;
      this.previewModal = false;
    },
    // 取消已经选中图片
    cancelSelectedHandle(item, index) {
      let _data = this.list[this.currentIndex].children[this.subIndex];
      _data.images.forEach((el) => {
        if (el.url == item.url) {
          el.isChecked = false;
          console.log("el", el);
        }
      });
      // this.list[this.currentIndex].children[this.subIndex] = _data;
      this.$set(this, "currentData", _data);
      this.selectedData.splice(index, 1);
    },

    // 上一题
    preBtn() {
      if (this.currentIndex <= 0) return this.$message("已经是第一题！");
      --this.currentIndex;
      this.repairData();
    },
    // 下一题
    nextBtn() {
      if (this.currentIndex >= this.list.length - 1)
        return this.$message("已经是最后一题！");
      ++this.currentIndex;
      this.repairData();
    },
    repairData() {
      this.subIndex = 0;
      let _tempArr = this.list[this.currentIndex].children[this.subIndex];
      this.$set(this, "currentData", _tempArr);
      this.selectedData = [];
      if (_tempArr.images && _tempArr.images.length) {
        _tempArr.images.forEach((item) => {
          if (item.isChecked) {
            this.selectedData.push(item);
          }
        });
      }
      if (_tempArr.selectList && _tempArr.selectList.length) {
        _tempArr.selectList.forEach((item) => {
          if (item.isChecked) {
            this.selectedData.push(item);
          }
        });
      }
    },
  },
};
