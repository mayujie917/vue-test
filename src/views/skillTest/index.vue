<template>
  <div class="page-wrapper">
    <div class="qs-wrapper">
      <div>
        <div class="qs-desc">
          <p class="desc-text">{{ currentIndex + 1 }}、{{ currentData.question }}</p>
        </div>
        <!-- 图片描述类型 -->
        <div class="qs-select-wrapper" v-if="currentData.type == 1">
          <div class="qs-img">
            <img :src="currentData.imgUrl"  />
          </div>
          <div class="qs-select">
            <div class="qs-select-area">
              <div class="qs-select-area-item">
                <div  class="select-area-item" v-for="item in selectedData" :key="index">{{ item.label }}</div>
              </div>
            </div>
            <div class="qs-select-list">
              <div class="list-item" v-for="(item) in currentData.selectList ||[]"
                :class="item.isChecked ? 'list-item-active' : ''" :key="item.id" 
                @click="selectItemHandle(item)">{{ item.label }}</div>
            </div>
          </div>
        </div>
        <!-- 选择题类型 -->
        <div class="qs-select-wrapper" v-if="currentData.type == 2">
          <div class="qs-select-radio-list">
            <label v-for="(item, index) in currentData.selectList" :key="index">
              <div class="radio-list-item"  @click="clickSelectItem(item,index)" hover-class="highSelectColor">
                <p>{{ index + 1 }}、</p>
                <input type='radio' :value="item.value" :checked="item.isChecked" />
                <div>{{ item.label }}</div>
              </div>
            </label>
          </div>
        </div>
        <div class="qs-btns">
          <button type="" @click="preBtn">上一题</button>
          <button type="" @click="nextBtn">下一题</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { List } from '@/data/index.js';
export default {
  name: 'express',
  data () {
    return {
      currentIndex: 0, //当前大题题号
      subIndex: 0,//当前答题下的题号
      currentData: {}, //当前问题
      List: [], //原始数据
      selectedData: [], // 图文多选，已选中的数据
    };
  },

  mounted () {
    this.List = List;
    // 初始胡 大题是否有多个小题
    if(this.List[this.currentIndex].children.length > 0){
      this.currentData = this.List[this.currentIndex].children[0];
    }else{
      this.currentData = this.List[this.currentIndex];
    }
  },

  methods: {
    /**
* 单选
* @param {*} index 
*/
    clickSelectItem (item,index) {
    },
    /**
     * 带有图片的多选
     * @param {*} e 
     */
    selectItemHandle (item) {
      console.log(2333,item);
      let _i = this.selectedData.findIndex(item => item.id == item.id);
      if (_i == -1) {
        this.selectedData.push(item);
        // this.currentData.selectList[index].isChecked = true;
        item.isChecked = true;
      } else {
        this.selectedData.splice(_i, 1);
        item.isChecked = false;
      }
    },
    
    preBtn(){

    },
    nextBtn(){

    }
  },
};
</script>

<style lang="less" scoped>
/* pages/questions/index.wxss */

.page-wrapper {
  width: 100%;
  height: 100%;

  .qs-wrapper {
    box-sizing: border-box;
    padding: 0 1%;

    .qs-desc {
      box-sizing: border-box;

      /* padding: 0 5%; */
      .desc-text {
        display: block;
        font-size: 14px;
        font-weight: 600;
        padding: 0 2%;
        margin-bottom: 3px;
      }

      .desc-tip {
        display: block;
        font-size: 13px;
      }

    }

    .qs-select-wrapper {
      .qs-img {
        box-sizing: border-box;
        width: 100%;
        padding: 5px;

        img {
          width: 100%;
          /* height: 100px; */
          max-height: 200px;
        }

      }

      .qs-select {
        box-sizing: border-box;

        .qs-select-area {
          width: 100%;
          position: relative;
          box-sizing: border-box;
          border: 5px solid rgb(137, 175, 245);
          background: rgb(235, 234, 234);
          border-radius: 50px;
          padding: 1% 5%;
          .qs-select-area-item {
            width: 100%;
            // min-height: 70px;
            height: 55px;
            // background: red;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: wrap;
            box-sizing: border-box;
            .select-area-item {
              // width: 18px;
              padding: 2%;
              text-align: center;
              background: rgb(192, 214, 255);
              margin: 0 1% 0 0;
              border-radius: 15%;
            }
          }
        }
        .qs-select-list {
          width: 100%;
          /* min-height: 100px; */
          display: flex;
          align-items: center;
          justify-content:center;
          flex-wrap: wrap;
          box-sizing: border-box;
          margin-top: 10px;
          .list-item {
            // width: 18px;
            padding: 2%;
            text-align: center;
            background: #f8f4ed;
            margin: 0 1% 1% 1%;
            border-radius: 15%;
          }
          .list-item-active {
            background: rgb(192, 214, 255);
          }
        }
      }
      .qs-select-radio-list {
        margin-top: 10px;
        .radio-list-item {
          display: flex;
          margin-bottom: 5px;
        }
      }
    }
    .qs-btns{
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
}




.highSelectColor {
  /* // 添加点击效果 */
  background-color: #c0c4c3;
}
</style>