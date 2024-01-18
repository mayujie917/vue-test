import {
  list,
  numberList,
  getSerialDataBy,
  getCityData,
} from "@/data/index.js";
import draggable from "vuedraggable";

import {
  getTypeAList,
  getTypeBList,
  getTypeCList,
  getTypeDList,
  getTypeEList,
  getExamineeByUserId,
  markHandle,
} from "./../../api/express";
import { cityList } from "../../data/index.js";

export let data = {
  name: "express",
  components: { draggable },
  data() {
    return {
      orientation: "landscape", // 横屏、竖屏
      tipsModal: false, //提示弹窗
      tipsTitle: "该物品已经选择过了！", // 提示内容
      previewModal: false, // 大图预览
      previewObj: {}, // 当前预览图片
      carouselIndex: 0, //轮播图索引
      cityValue: "", // 当前选择省份 id
      cityValueName: "", // 当前选择省份名称
      cityListShow: false,
      showNumberShow: false, // 数字键盘

      showSubImage: false,
      cityData: [],

      currentIndex: 0, //当前大题题号
      subIndex: 0, //当前答题下的题号
      circleIndex: 0, // 上下 左右箭头标记
      currentData: {}, //当前问题
      list: [], //原始数据
      selectedData: [], // 当前已选中的数据，每次切换题，从原数据更具checked 重新获取
      // dragSelectedData: [],
      numberList: numberList,
      indexList: [],
      checkboxList: [], //type 9
      checkboxValue: [],
      showGif: true,
      examineeId: "",
      isFinished: false, // 是否提交完成
      flashImg: "", // 路线导向图
    };
  },

  async mounted() {
    this.checkOrientation(); // 页面加载时立即调用一次

    window.addEventListener("resize", () => {
      this.checkOrientation(); // 监听窗口大小变化事件
    });

    this.cityData = getCityData();

    this.list = [];
    await this.getData();

    setTimeout(() => {
      this.showGif = false;
    }, 5000);
    if (this.$route.query.token) {
      const { token, skillExamId } = this.$route.query;
      this.token = token;
      localStorage.setItem("token", this.token);
      this.skillExamId = skillExamId;
      this.getExamineeId();
    }
  },
  watch: {
    list: {
      handler(nv) {
        this.indexList = [];
        nv.forEach((item) => {
          this.watchItem(item);
        });
        console.log("indexList", this.indexList);
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    //获取 examineeId
    getExamineeId() {
      getExamineeByUserId().then((res) => {
        if (res.code == 200) {
          this.examineeId = res.data.examineeId;
        } else {
          console.log(res.msg);
        }
      });
    },
    getData() {
      Promise.all([
        getTypeAList(),
        getTypeBList(),
        getTypeCList(),
        getTypeDList(),
        getTypeEList(),
      ]).then((res) => {
        res.forEach((item, index) => {
          if (item.response_code == 0) {
            let _data = item.results[0];
            if (_data.questionType == 3) {
              //快递资费
              _data.inputText = _data.question2Type4List;
              _data.images = [{ url: _data.url }];
              let _tempArr =
                _data.question2Type4List &&
                _data.question2Type4List[0].inputTextList;
              _tempArr.forEach((item, index) => {
                _data.inputText[index].realValue = item.realValue;
              });
            } else if (_data.questionType == 4) {
              //配送路线
              _data.selectValue = "";
              _data.images = [{ url: _data.url }];
              _data.selectList = _data.question3TypeList;
            } else if (
              _data.questionType == 5 ||
              _data.questionType == 6 ||
              _data.questionType == 8 ||
              _data.questionType == 9
            ) {
              _data.images.forEach((item) => {
                item.isChecked = false;
              });
            } else if (_data.questionType == 7) {
              //省份
              _data.images = _data.question2Type3List;
            }
            _data.question = `${index + 1}、${_data.question}`;
            this.list.push(_data);
            console.log("list", this.list);
          }
        });
        this.list.forEach((item) => {
          item.type = item.questionType;
        });
        this.currentData = this.list[this.currentIndex];
        // this.indexList = [0];
        console.log("currentData", this.currentData);
        console.log("list", this.list);
      });
    },
    watchItem(item) {
      const { type, images } = item;
      if (type == 3) {
        let _tempInputText = item.inputText;
        let _temp = _tempInputText.filter((e) => e.value).length == 5;
        if (_temp) {
          this.indexList.push(type);
        }
        // return { flag: _temp, type };
      } else if (type == 4) {
        let _tempSelectList = item.selectList;
        let _temp = _tempSelectList.filter((e) => e.isChecked).length;
        if (_temp) {
          this.indexList.push(type);
        }
      } else if (type == 5) {
        let _temp = images.filter((e) => e.isChecked).length == 4; // 全部作答 flag:true
        if (_temp) {
          this.indexList.push(type);
        }
      } else if (type == 6) {
        let _temp = images.filter((e) => e.isChecked).length == 2;
        if (_temp) {
          this.indexList.push(type);
        }
      } else if (type == 7) {
        let _temp =
          images.filter((e) => e.selectValue).length == cityList.length;
        if (_temp) {
          this.indexList.push(type);
        }
      } else if (type == 8) {
        let _temp = images.filter((e) => e.isChecked).length == 2;
        if (_temp) {
          this.indexList.push(type);
        }
      } else if (type == 9) {
        if (this.checkboxValue.length == item.selectValue.split(",").length) {
          this.indexList.push(type);
        }
      }
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
    // changeHandle(val) {
    //   console.log("111", val);
    // },
    chargeClick() {
      console.log("circleIndex", this.circleIndex);
      this.showNumberShow = true;
    },
    // 循环列表，下一个
    nextCircle() {
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
      console.log(233, item);
      this.currentData.selectValue = item;
      this.currentData.selectList.forEach((e) => {
        if (item != e.value) {
          e.isChecked = false;
        } else {
          e.isChecked = true;
          this.flashImg = e.urlVar;
        }
      });
    },
    // type 9
    selectCheckboxHandle(data) {
      console.log(2333, data);
      // 最多选择
      if (data.length > this.currentData.selectValue.split(",").length) {
        let _data = data.splice(0, data.length - 1);
        data = _data;
        this.checkboxValue = data;
        return;
      }
      this.checkboxValue = data;
      this.checkboxList = [];
      this.currentData.images.forEach((item) => (item.isChecked = false));
      data.forEach((item) => {
        this.currentData.images.forEach((e) => {
          if (e.desc == item) {
            e.isChecked = true;
            this.checkboxList.push(e);
          }
        });
      });
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
    // type 6
    selectCircleImgTypeSixHandle() {
      if (this.selectedData.length == 2) return;
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
    cityInputFocus() {
      this.cityListShow = true;
    },
    /**
     * type 7 根据图片，选择对应的身份
     * @returns
     */
    cityChange(data) {
      let _data = this.currentData;
      _data.images[this.circleIndex].selectValue = data["cityValue"];
      _data.images[this.circleIndex].cityName = data["cityName"];
      this.cityListShow = false;
      this.cityValueName = data.cityName;
      this.cityValue = data.cityValue;
    },
    /**
     * type 8 从当前类别中，选出禁寄的物品
     * @returns
     */
    currentImgTypeView() {
      this.showSubImage = true;
      this.showGif = false;
      let _currentData = this.currentData.images[this.circleIndex];
      this.subImages = _currentData.subImages;
    },
    confirmSelect() {
      let _currentData = this.currentData.images[this.circleIndex];
      if (this.selectedData.length >= 2) return;
      if (!_currentData.isChecked) {
        _currentData.isChecked = true;
        this.selectedData.push(_currentData);
      }
    },
    back() {
      this.showSubImage = false;
    },
    // 点击进入第几题
    nextItem(index) {
      // if (!this.indexList.includes(index)) {
      //   this.indexList.push(index);
      // }
      this.currentIndex = index;
      this.currentData = this.list[this.currentIndex];
      console.log("currentData", this.currentData);
      // 检查当前题是否已作答
      let { flag, type } = this.checkCurrentItem(this.currentData);
      console.log("flag", flag);
      console.log("type", type);
      this.circleIndex = 0;
      this.showSubImage = false;
      this.repairData();
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
      this.$forceUpdate();
    },
    /**
     * 1.每次判断当前是否是最后一个
     *  - 不是最后一题，校验当前题是否已做完：没有做完提示有题未答，已经做完，自动跳转到下一题
     *  - 是最后一题，校验前面题是否都已经作答，有未作答的提示，已经全部做完，二次提示是否提交
     */
    // 提交
    submitHandle() {
      if (this.currentIndex < this.list.length - 1) {
        ++this.currentIndex;
        this.nextItem(this.currentIndex);
      } else {
        // 全部已作答，计算总分
        this.list.forEach((item) => {
          item.score = this.countScore(item);
        });
        let _score = 0; // 总分
        this.list.forEach((item) => {
          _score += item.score;
        });
        let params = {
          examineeId: this.examineeId,
          skillExamId: this.skillExamId,
          skillScore: _score,
          skillScoreTable: this.getContextStr(), // 文本内容
        };
        let { flag, type } = this.checkItem();
        if (type && !flag) {
          let _index = 0;
          this.list.forEach((item, index) => {
            if (item.type == type) {
              _index = index;
            }
          });
          return this.$message.warning(
            `第${_index + 1}项题未作答，请检查并进行作答`
          );
        } else {
          this.$confirm("已全部作答完毕，是否提交试卷!", "提示", {
            confirmButtonText: "是",
            cancelButtonText: "否",
            type: "warning",
            center: true, //文字居中显示
            // showCancelButton: false, //不显示取消按钮
            showClose: false, //是否显示右上角的x
            closeOnClickModal: false, //是否可以点击空白处关闭弹窗
          }).then(() => {
            // 提交
            markHandle(params).then((res) => {
              if (res.code == 200) {
                this.$message.success("提交成功！");
                this.isFinished = true;
              }
            });
          });
        }
      }
    },
    // 计算每个题的得分
    countScore(item) {
      if (item.type == 1) {
        let _selectItem = item.videos.filter((item) => item.isChecked);
        let _current = _selectItem[0];
        if (_current.isTrue) {
          return 20;
        } else {
          return 0;
        }
      } else if (item.type == 3) {
        // 运费
        // let _selectItem = item.inputText.filter((item) => item.value != "");
        let _count = 0;
        item.inputText.forEach((item) => {
          if (item.value == item.realValue) {
            _count += 1;
          }
        });
        return _count * 4;
      } else if (item.type == 4) {
        // 配送路线 单选
        let score = 0;
        item.selectList.forEach((item) => {
          if (item.isChecked && item.isRealValue) {
            score = 20; //满分
          }
        });
        return score;
      } else if (item.type == 5) {
        // 20个物品中选择4个违禁品
        // 1.选中的物品
        let _selectItem = item.images.filter((item) => item.isChecked);
        // 2.选中物品中是违禁品数量
        let _count = _selectItem.filter((item) => item.type == 2);
        return _count.length * 5;
      } else if (item.type == 6) {
        // 1.选中的物品
        let _selectItem = item.images.filter((item) => item.isChecked);
        // 2.选中物品中是违禁品数量
        let _count = _selectItem.filter((item) => item.type == 2);
        return _count.length * 10;
      } else if (item.type == 7) {
        // 匹配省份
        let _count = 0;
        item.images.forEach((item) => {
          if (item.cityValue == item.selectValue) {
            _count += 1;
          }
        });
        return _count * 20;
      } else if (item.type == 8) {
        // 1.选中的物品
        let _selectItem = item.images.filter((item) => item.isChecked);
        // 2.选中物品中是违禁品数量
        let _count = _selectItem.filter((item) => item.type == 2);
        let _score = _count.length * 10;
        return _score;
      } else if (item.type == 9) {
        let _temp = this.checkboxList.map((item) => item.desc);
        let _rightTemp = item.selectValue;
        // 选中数据和正确数据比较
        if (
          _rightTemp.length == _temp.join(",").length &&
          _rightTemp.toString() == _temp.join(",").toString()
        ) {
          return 20;
        } else {
          return 0;
        }
      }
    },
    // 检查所有题否已作答
    checkItem() {
      // 根据不同题type判断
      let flag = false;
      for (const item of this.list) {
        const { type, images } = item;
        if (type == 3) {
          let _tempInputText = item.inputText;
          let _temp =
            _tempInputText.filter((e) => e.value).length ==
            _tempInputText.length;
          if (!_temp) {
            return { flag: _temp, type };
          }
        } else if (type == 4) {
          let _tempSelectList = item.selectList;
          let _temp = _tempSelectList.every((e) => !e.isChecked);
          if (_temp) {
            return { flag: !_temp, type };
          }
        } else if (type == 5) {
          let _temp = images.filter((e) => e.isChecked).length == 4;
          if (!_temp) {
            return { flag: _temp, type };
          }
        } else if (type == 6) {
          let _temp = images.filter((e) => e.isChecked).length == 2;
          if (!_temp) {
            return { flag: _temp, type };
          }
        } else if (type == 7) {
          let _temp =
            images.filter((e) => e.selectValue).length == cityList.length;
          if (!_temp) {
            return { flag: _temp, type };
          }
        } else if (type == 8) {
          let _temp = images.filter((e) => e.isChecked).length == 2;
          if (!_temp) {
            return { flag: _temp, type };
          }
        } else if (type == 9) {
          if (this.checkboxValue.length != item.selectValue.split(",").length) {
            return {
              flag: false,
              type,
            };
          }
        }
      }
      return { flag: true, type: -1 };
    },
    // 当前项是否已作答
    checkCurrentItem(item) {
      let flag = false;
      debugger;
      const { type, images } = item;
      if (type == 3) {
        let _tempInputText = item.inputText;
        let _temp = _tempInputText.filter((e) => e.value).length == 5;
        return { flag: _temp, type };
      } else if (type == 4) {
        let _tempSelectList = item.selectList;
        let _temp = _tempSelectList.filter((e) => e.isChecked).length == 1;
        return { flag: _temp, type };
      } else if (type == 5) {
        let _temp = images.filter((e) => e.isChecked).length == 4; // 全部作答 flag:true
        return { flag: _temp, type };
      } else if (type == 6) {
        let _temp = images.filter((e) => e.isChecked).length == 2;
        return { flag, type };
      } else if (type == 7) {
        let _temp =
          images.filter((e) => e.selectValue).length == cityList.length;
        return { flag: _temp, type };
      } else if (type == 8) {
        let _temp = images.filter((e) => e.isChecked).length == 2;
        return { flag: _temp, type };
      } else if (type == 9) {
        return { flag: this.checkboxValue.length == 4, type };
      }
    },
    // 获取每个题的文本内容
    getContextStr() {
      let str = "";
      this.list.forEach((item) => {
        str += `<p>${item.question}</p><br>`;
        let _items = []; //所有的物品
        let _choseItems = []; // 选择的物品
        let _rightItems = []; // 正确物品
        if (item.type == 8) {
          item.images.forEach((tag) => {
            _items.push(tag.desc);
            tag.subImages.forEach((el) => {
              _items.push(el.desc);
            });
            if (tag.type == 1) {
              _rightItems.push(tag);
            }
            if (tag.isChecked) {
              _choseItems.push(tag);
            }
          });
          str += `<p>${_items.join("、")}</p><br>
          <p>正确答案：</p><br>
          <p>${_rightItems.join("、")}</p><br>
          <p>考生答案：</p><br>
          <p>${_choseItems.join("、")}</p><br>`;
        } else if (item.type == 5) {
          item.images.forEach((tag) => {
            _items.push(tag.desc);
            if (tag.type == 1) {
              _rightItems.push(tag);
            }
            if (tag.isChecked) {
              _choseItems.push(tag);
            }
          });
          str += `<p>${_items.join("、")}</p><br>
          <p>正确答案：</p><br>
          <p>${_rightItems.join("、")}</p><br>
          <p>考生答案：</p><br>
          <p>${_choseItems.join("、")}</p><br>`;
        } else if (item.type == 3) {
          item.inputText.forEach((tag) => {
            _items.push(tag.url);
            _rightItems.push(tag.realValue);
            _choseItems.push(tag.value);
          });
          str += `<p>${_items.join("、")}</p><br>
          <p>正确答案：</p><br>
          <p>${_rightItems.join("、")}</p><br>
          <p>考生答案：</p><br>
          <p>${_choseItems.join("、")}</p><br>`;
        } else if (item.type == 7) {
          item.images.forEach((tag) => {
            cityList.forEach((el) => {
              if (el.cityValue == tag.cityValue) {
                _rightItems.push(el.cityName);
              }
              if (el.cityValue == tag.selectValue) {
                _choseItems.push(el.cityName);
              }
            });
            _choseItems.push(tag.cityName);
            str += `<p>__${_items.join("、")}</p><br>
            <p>正确答案：</p><br>
            <p>${_rightItems.join("、")}</p><br>
            <p>考生答案：</p><br>
            <p>${_choseItems.join("、")}</p><br>`;
          });
        } else if (item.type == 4) {
          item.selectList.forEach((item) => {
            if (item.isChecked) {
              _choseItems = item.value.split("-");
            }
            if (item.isRealValue) {
              _rightItems = item.value.split("-");
            }
          });
          str += `<p>正确答案：</p><br>
            <p>${_rightItems.join("、")}</p><br>
            <p>考生答案：</p><br>
            <p>${_choseItems.join("、")}</p><br>`;
        } else if (item.type == 6) {
          item.images.forEach((tag) => {
            _items.push(tag.desc);
            if (tag.type == 1) {
              _rightItems.push(tag);
            }
            if (tag.isChecked) {
              _rightItems.push(tag);
            }
          });
          str += `<p>__${_items.join("、")}</p><br>
            <p>正确答案：</p><br>
            <p>${_rightItems.join("、")}</p><br>
            <p>考生答案：</p><br>
            <p>${_choseItems.join("、")}</p><br>`;
        } else if (item.type == 9) {
          // 已选择内容
          let _temp = this.checkboxList.map((item) => item.desc);
          item.images.forEach((tag) => {
            _items.push(tag.url);
          });
          _temp.forEach((el) => {
            item.images.forEach((k) => {
              if (el == k.desc) {
                _choseItems.push(k.url);
              }
            });
          });
          let _rightTemp = item.selectValue.split(",");
          _rightTemp.forEach((m) => {
            item.images.forEach((el) => {
              if (m == el.desc) {
                _rightItems.push(el.desc);
              }
            });
          });
          str += `<p>__${_items.join("、")}</p><br>
            <p>正确答案：</p><br>
            <p>${_rightItems.join("、")}</p><br>
            <p>考生答案：</p><br>
            <p>${_choseItems.join("、")}</p><br>`;
        }
      });
      return str;
    },
    // 重置
    resetHandle() {
      const { type } = this.currentData;
      this.currentData.isCurrent = false;
      this.currentData.isDone = false;
      this.currentData.score = false;
      if (type == 1) {
        this.currentData.videos.forEach((item) => {
          item.isChecked = false;
        });
      } else if (type == 3) {
        this.currentData.inputText.forEach((item) => {
          item.value = "";
        });
        this.currentData.total = 0;
      } else if (type == 4) {
        this.currentData.selectList.forEach((item) => {
          item.isChecked = false;
        });
        this.currentData.selectValue = "";
      } else if (type == 5 || type == 6 || type == 8) {
        this.currentData.images.forEach((item) => {
          item.isChecked = false;
        });
      } else if (type == 7) {
        this.currentData.images.forEach((item) => {
          item.selectValue = "";
        });
        this.cityValue = "";
        this.cityValueName = "";
      } else if (type == 9) {
        this.currentData.images.forEach((item) => {
          item.isChecked = false;
        });
        this.checkboxValue = [];
        this.checkboxList = [];
      }

      this.circleIndex = 0;
      this.showSubImage = false;
      this.repairData();
    },
    checkOrientation() {
      const mediaQuery = window.matchMedia("(orientation: landscape)");
      import("@/assets/styles/landscape.less").then(() => {
        this.orientation = "landscape"; // 切换到横屏模式
      });
      /* if (mediaQuery.matches) {
        import("@/assets/styles/landscape.less").then(() => {
          this.orientation = "landscape"; // 切换到横屏模式
        });
      } else {
        import("@/assets/styles/portrait.less").then(() => {
          this.orientation = "portrait"; // 切换到默认或其他模式
        });
      } */
    },
    // 计算容器
    numberClick(num) {
      // this.currentData.inputText[circleIndex].value;
      let _price = this.currentData.inputText[this.circleIndex].value || "";
      _price += num;
      this.currentData.inputText[this.circleIndex].value = _price;
    },
    // 确认
    numberConfirm() {
      // this.currentData.inputText[this.circleIndex].value;
      this.showNumberShow = false;
    },
    // 取消
    numberCancel() {
      this.currentData.inputText[this.circleIndex].value = "";
      this.showNumberShow = false;
      console.log("currentData", this.currentData);
    },
  },
};
