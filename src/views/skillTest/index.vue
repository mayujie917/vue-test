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
            <img :src="currentData.imgUrl" />
          </div>
          <div class="qs-select">
            <div class="qs-select-area">
              <div class="qs-select-area-item">
                <p class="select-area-item" v-for="item in selectedData" :key="index">{{ item.label }}</p>
              </div>
            </div>
            <div class="qs-select-list">
              <p class="list-item" v-for="(item, index) in currentData.selectList"
                :class="item.isChecked ? 'list-item-active' : ''" :key="index" @click="selectItemHandle(item)">{{
                  item.label }}</p>
            </div>
          </div>
        </div>
        <!-- 多张图片，选出某几张 -->
        <div class="qs-select-wrapper" v-if="currentData.type == 3">
          <div class="qs-img-box">
            <div class="qs-img-list" v-for="item in currentData.images" @click="previewImgHandle(item, index)">
              <img :src="item.url" />
            </div>
          </div>
          <div class="qs-select">
            <div class="qs-select-area">
              <div class="qs-select-area-item qs-select-area-item-img">
                <img :src="item.url" alt="" v-for="item in selectedData" :key="index" @click="cancelSelectedHandle(item,index)">
              </div>
            </div>
          </div>
        </div>
        <!-- 选择题类型 -->
        <div class="qs-select-wrapper" v-if="currentData.type == 2">
          <div class="qs-select-radio-list">
            <label v-for="(item, index) in currentData.selectList" :key="index">
              <div class="radio-list-item" @click="clickSelectItem(item, index)" hover-class="highSelectColor">
                <p>{{ index + 1 }}、</p>
                <input type='radio' :value="item.value" :checked="item.isChecked" />
                <div>{{ item.label }}</div>
              </div>
            </label>
          </div>
        </div>
        <div class="qs-btns">
          <el-button size="small" @click="preBtn">上一题</el-button>
          <el-button type="" size="small" @click="nextBtn">下一题</el-button>
        </div>
      </div>
    </div>
    <!-- 大图预览 -->
    <div class="preview" v-show="previewModal">
      <div class="preview-img">
        <img :src="previewObj.url" alt="">
      </div>
      <div class="pre-btn">
        <el-button type="" size="small" @click="cancelPrevView">取消</el-button>
        <el-button type="primary" size="small" @click="selectImgHandle">确定</el-button>
      </div>
    </div>
    <!-- 提示 -->
    <div class="tips" v-show="tipsModal">
      <div class="tips-box">
        <p class="tips-title">{{ tipsTitle }}</p>
        <el-button type="primary" size="mini" @click="()=> tipsModal=false">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { data } from "./index";
export default data;
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>