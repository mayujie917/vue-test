<template>
  <div class="page-wrapper">
    <div class="qs-wrapper">
      <div class="qs-content">
        <div class="qs-desc">
          <p class="desc-text">{{ currentData.question }}</p>
        </div>
        <!-- 图片描述类型 -->
        <div class="qs-select-wrapper" v-if="currentData.type == 1">
          <div class="qs-img">
            <img :src="currentData.imgUrl"  />
          </div>
          <div class="qs-select">
            <div class="qs-select-area">
              <div class="qs-select-area-item">
                <p  class="select-area-item" v-for="item in selectedData" :key="index">{{ item.label }}</p>
              </div>
            </div>
            <div class="qs-select-list">
              <p class="list-item" v-for="(item,index) in currentData.selectList"
                :class="item.isChecked ? 'list-item-active' : ''" :key="index" 
                @click="selectItemHandle(item)">{{ item.label }}</p>
            </div>
          </div>
        </div>
        <!-- 选择题类型 -->
        <div class="qs-select-wrapper" v-if="currentData.type == 2">
          <div class="qs-select-radio-list">
            <label v-for="(item, index) in currentData.selectList" :key="index">
              <div class="radio-list-item"  @click="clickSelectItem(item,index)" >
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
// import { List } from '@/data/index.js';
import { data } from "./index";
export default data;
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>