import { list, numberList, getSerialDataBy } from "@/data/index.js";
import draggable from "vuedraggable";

import {
  getTypeAList,
  getTypeBList,
  getTypeCList,
  getTypeDList,
} from "./../../api/express";

export let data = {
  name: "express",
  components: { draggable },
  data() {
    return {
      tipsModal: false, //提示弹窗
      tipsTitle: "该物品已经选择过了！", // 提示内容
      previewModal: false, // 大图预览
      previewObj: {}, // 当前预览图片
      carouselIndex: 0, //轮播图索引
      cityValue: "", // 当前选择省份

      showSubImage: false,

      currentIndex: 0, //当前大题题号
      subIndex: 0, //当前答题下的题号
      circleIndex: 0, // 上下 左右箭头标记
      currentData: {}, //当前问题
      list: [], //原始数据
      selectedData: [], // 当前已选中的数据，每次切换题，从原数据更具checked 重新获取
      numberList: numberList,
    };
  },

  mounted() {
    list.forEach((item) => {
      if (item.type == 5) {
        item.images.forEach((el) => {
          if (el.subImages) {
            delete el.subImages;
          }
        });
      }
    });
    this.list = list;
    this.currentData = this.list[this.currentIndex];
    this.getData();
  },

  methods: {
    getData() {
      Promise.all([
        getTypeAList(),
        getTypeBList(),
        getTypeCList(),
        getTypeDList(),
      ]).then((res) => {
        console.log("res", res);
      });
    },
    /**
     * type 1 类别 视频选中
     */
    radioChange(item, index) {
      if (item.isChecked) {
        let _temp = JSON.parse(
          JSON.stringify(this.list[this.currentIndex].videos)
        );
        _temp.forEach((el) => {
          if (el.url != item.url) {
            el.isChecked = false;
          }
        });
        this.list[this.currentIndex].videos = _temp;
      }
    },
    /**
     * type 2 选择图片对应的行业
     */
    selectTradeHandle(item, index) {
      let _data = this.list[this.currentIndex];
      if (item.isChecked) {
        item.isChecked = false;
        _data.imagesText[index].answerValue = "";
      } else {
        item.isChecked = true;
        // 匹配当前行业类别对应的图片
        _data.imagesText[index].answerValue =
          _data.images[this.carouselIndex].classType;
      }
      this.$set(this, "currentData", _data);
    },
    carouselChange(index) {
      this.carouselIndex = index;
    },
    /**
     * type 3 根据图片资费，输入费用
     * 比对输入输入费用value 和真实费用realValue
     */
    changeHandle(val) {
      console.log("111", val);
      // TODO 判断是否有输入值、值是否是数字
    },
    // 循环列表，下一个
    nextCircle() {
      let _total = this.currentData.inputText.length;
      if (this.circleIndex <= 0) return this.$message("已经是最后一个了！");
      --this.circleIndex;
    },
    // 上一个
    preCircle() {
      let _total = this.currentData.inputText.length;
      if (this.circleIndex >= _total - 1)
        return this.$message("已经是第一个了！");
      ++this.circleIndex;
    },

    /**
     * type 4 根据图片，选择配送路线
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
     * type 5 ,多张图片中，选出禁寄物品
     */
    // 已经选中的 上一个、下一个时跳过
    nextCircleImgSpecial() {
      if (this.circleIndex == 0) return;
      let _temp = this.currentData.images.slice(0, this.circleIndex).reverse();
      let _index = _temp.findIndex((item) => !item.isChecked);
      if (_index != -1) {
        let _subIndex = this.currentData.images.findIndex(
          (item) => item.desc == _temp[_index].desc
        );
        if (_subIndex != -1) {
          this.circleIndex = _subIndex;
        }
      }
    },
    preCircleImgSpecial() {
      let _temp = this.currentData.images[this.circleIndex + 1];
      if (_temp && _temp.isChecked) {
        ++this.circleIndex;
        this.preCircleImgSpecial();
      } else {
        if (this.circleIndex < this.currentData.images.length - 1) {
          ++this.circleIndex;
        } else {
          return this.$message("已经是最后一个了！");
        }
      }
    },

    nextCircleImg() {
      if (this.circleIndex <= 0) {
        return this.$message("已经是第一个了！");
      }
      --this.circleIndex;
    },
    preCircleImg() {
      let _total = this.currentData.images.length;
      if (this.circleIndex >= _total - 1)
        return this.$message("已经是最后一个了！");
      ++this.circleIndex;
    },
    // 直接选中图片
    selectCircleImgHandle() {
      if (this.selectedData.length == 4) return;
      let _temp = this.currentData.images[this.circleIndex];
      if (_temp.isChecked) {
        // 判断是否已经选过
        this.tipsTitle = "该物品已经选择过了！";
        this.tipsModal = true;
        return false;
      }
      this.previewObj = _temp;
      this.selectImgHandle();
    },
    // 1.预览大图
    /*  previewImgHandle() {
      if (this.selectedData.length == 4) return;
      let _temp = this.currentData.images[this.circleIndex];
      if (_temp.isChecked) {
        // 判断是否已经选过
        this.tipsTitle = "该物品已经选择过了！";
        this.tipsModal = true;
        return false;
      }
      this.previewObj = _temp;
      this.previewModal = true;
    }, */
    // 2.确认选中图片
    selectImgHandle() {
      this.previewModal = false;
      this.previewObj.isChecked = true;
      this.selectedData.push(this.previewObj);
      this.list[this.currentIndex].images.forEach((item) => {
        if (item.url == this.previewObj.url) {
          item.isChecked = true;
        }
      });
    },
    // 3.关闭预览
    cancelPrevView() {
      this.previewObj.isChecked = false;
      this.previewModal = false;
    },
    // 4.取消已经选中图片
    cancelSelectedHandle(item, index) {
      let _data = this.list[this.currentIndex];
      _data.images.forEach((el) => {
        if (el.url == item.url) {
          el.isChecked = false;
        }
      });
      this.$set(this, "currentData", _data);
      this.selectedData.splice(index, 1);
    },

    /**
     * type 6 选出超出配送范围的编号，剩余标号排序
     *
     */
    serialClickHandle(item, index) {
      if (item.isChecked) {
        item.isChecked = false;
        let _index = this.selectedData.findIndex(
          (el) => el.value == item.value
        );
        if (_index != -1) {
          this.selectedData[_index].isChecked = false;
          this.selectedData.splice(_index, 1);
          this.list[this.currentIndex].selectList = this.selectedData;
        }
      } else {
        item.isChecked = true;
        this.selectedData.push(item);
        this.list[this.currentIndex].selectList = this.selectedData;
      }
      this.$set(this, "currentData", this.list[this.currentIndex]);
    },
    /**
     * type 7 根据图片，选择对应的身份
     * @returns
     */
    cityChange(val) {
      let _data = this.list[this.currentIndex];
      let _tag = _data.citys.filter((item) => item.cityValue == val);
      _data.images[this.circleIndex].selectValue = _tag[0]["cityName"];
    },
    /**
     * type 8 从当前类别中，选出禁寄的物品
     * @returns
     */
    currentImgTypeView() {
      this.showSubImage = true;
      let _currentData = this.currentData.images[this.circleIndex];

      if (this.selectedData.length > 4) return;
      if (!_currentData.isChecked) {
        _currentData.isChecked = true;
        this.selectedData.push(_currentData);
      }
      this.subImages = _currentData.subImages;
      console.log("list", this.list);
      console.log("currentData", this.currentData);
      console.log("selectedData", this.currentData);
    },
    back() {
      this.showSubImage = false;
    },
    // 点击进入第几题
    nextItem(index) {
      console.log(1111, this.list[this.currentIndex]);
      this.currentIndex = index;
      this.currentData = this.list[this.currentIndex];
      this.circleIndex = 0;
      this.showSubImage = false;
      this.repairData();
      console.log("list", this.list);
    },
    repairData() {
      this.subIndex = 0;
      let _tempArr = this.list[this.currentIndex];
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
    /**
     * 1.每次判断当前是否是最后一个
     *  - 不是最后一题，校验当前题是否已做完：没有做完提示有题未答，已经做完，自动跳转到下一题
     *  - 是最后一题，校验前面题是否都已经作答，有未作答的提示，已经全部做完，二次提示是否提交
     */
    // 提交
    submitHandle() {
      if (this.currentIndex < this.list.length - 1) {
        // 根据不同题type判断
        const { type, images } = this.currentData;
        let flag = false;
        if (type == 5) {
          let _temp = images.filter((item) => item.isChecked);
          _temp.length < 4 ? (flag = true) : (flag = false);
        } else if (type == 8) {
          let _temp = images.filter((item) => item.isChecked);
          _temp.length < 4 ? (flag = true) : (flag = false);
        } else if (type == 7) {
          let _temp = images.filter((item) => !item.selectValue);
          _temp.length ? (flag = true) : (flag = false);
        } else if (type == 3) {
          let _tempInputText = this.currentData.inputText;
          let _temp = _tempInputText.filter((item) => !item.value);
          _temp.length ? (flag = true) : (flag = false);
        } else if (type == 4) {
          let _tempSelectList = this.currentData.selectList;
          let _temp = _tempSelectList.every((item) => !item.isChecked);
          _temp ? (flag = true) : (flag = false);
        } else if (type == 1) {
          let _tempVideos = this.currentData.videos;
          let _temp = _tempVideos.every((item) => !item.isChecked);
          _temp ? (flag = true) : (flag = false);
        }
        if (flag) {
          return this.$message.warning("当前题未作答完，请作答？");
        } else {
          // 自动跳转下一题
          this.nextItem(this.currentIndex + 1);
        }
      } else {
      }
    },
    // 重置
    resetHandle() {},
  },
};
