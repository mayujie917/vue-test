<template>
  <div class="page-wrapper">
    <div class="qs-wrapper">
      <div class="qs-content">
        <div class="qs-desc">
          <p class="desc-text">{{ currentData.question }}</p>
        </div>
        <!-- 视频 ，四个视频，选择正确的 -->
        <!-- <div class="qs-select-wrapper" v-if="currentData.type == 1">
          <div class="qs-video-box">
            <div class="video-item" v-for="(item, index) in currentData.videos" :key="index">
              <video controls>
                <source :src="item.url" type="video/ogg">
              </video>
              <el-checkbox v-model="item.isChecked" size="medium" @change="radioChange(item, index)"></el-checkbox>
            </div>
          </div>
        </div> -->
        <!-- 根据图片匹配属于那个行业类别 -->
        <!-- <div class="qs-select-wrapper" v-if="currentData.type == 2">
          <div class="qs-img">
            <el-carousel :autoplay="false" type="card" arrow="always" indicator-position="outside" height="200px"
              @change="carouselChange">
              <el-carousel-item v-for="(item, index) in currentData.images" :key="index">
                <img :src="item.url" />
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="qs-select">
            <div class="qs-select-list list-item-btns">
              <el-button class="list-item-btn" v-for="(item, index) in currentData.imagesText" :key="index"
                :type="item.isChecked ? 'primary' : 'default'" round size="medium"
                @click="selectTradeHandle(item, index)">
                {{ item.text }}
              </el-button>
            </div>
          </div>
        </div> -->
        <!-- 填写根据资费，填写费用 -->
       <!--  <div class="qs-select-wrapper" v-if="currentData.type == 3">
          <div class="qs-img">
            <img :src="currentData.images[0].url" />
          </div>
          <div class="qs-select">
            <div class="qs-select-input-box">
              <div class="qs-select-input" v-for="(item, index) in currentData.inputText" :key="index">
                <p class="qs-text">
                  {{ item.text }}
                  <input class="qs-input" v-model="item.value" type="number" pattern="[0-9]*" :maxlength="3"
                    @change="changeHandle(item, index)" />
                  <span>元。</span>
                </p>
              </div>
            </div>
          </div>
        </div> -->
        <!-- 图片描述类型 按照上述区域合理设计路线 -->
        <!-- <div class="qs-select-wrapper" v-if="currentData.type == 4">
          <div class="qs-img">
            <img :src="currentData.images[0].url" />
          </div>
          <div class="qs-select">
            <div class="qs-select-area">
              <div class="qs-select-area-item">
                <p class="select-area-item" v-for="item in selectedData" :key="index">{{ item.value }}</p>
              </div>
            </div>
            <div class="qs-select-list">
              <p class="list-item" v-for="(item, index) in currentData.selectList"
                :class="item.isChecked ? 'list-item-active' : ''" :key="index" @click="selectItemHandle(item)">
                {{ item.value }}
              </p>
            </div>
          </div>
        </div> -->
        <!-- 多张图片，选出某几禁寄送的 -->
        <!-- <div class="qs-select-wrapper" v-if="currentData.type == 5">
          <div class="qs-img-box">
            <div class="qs-img-list" v-for="(item, index) in currentData.images" @click="previewImgHandle(item, index)">
              <img :src="item.url" />
            </div>
          </div>
          <div class="qs-select">
            <div class="qs-select-area">
              <div class="qs-select-area-item qs-select-area-item-img">
                <img :src="item.url" alt="" v-for="(item, index) in selectedData" :key="index"
                  @click="cancelSelectedHandle(item, index)">
              </div>
            </div>
          </div>
        </div> -->
        <!-- 剔除超出配送范围的，对其它配送的排序 -->
        <div class="qs-select-wrapper" v-if="currentData.type == 6">
          <div class="qs-serial-box">
            <div class="qs-serial-list" :class="item.isChecked ?'qs-serial-list-active':''" v-for="(item, index) in currentData.selectList">
              <!-- <img :src="item.url" /> -->
              <p>{{ item.text }}{{ item.serialNumber }}号</p>
            </div>
          </div>
          <div class="qs-select">
            <div class="qs-select-area">
              <div class="qs-select-area-item qs-select-area-item-img">
                <img :src="item.url" alt="" v-for="(item, index) in selectedData" :key="index"
                  @click="cancelSelectedHandle(item, index)">
              </div>
            </div>
          </div>
        </div>
        <!-- 选择题类型 -->
        <!-- <div class="qs-select-wrapper" v-if="currentData.type == 2">
          <div class="qs-select-radio-list">
            <label v-for="(item, index) in currentData.selectList" :key="index">
              <div class="radio-list-item" @click="clickSelectItem(item, index)">
                <p>{{ index + 1 }}、</p>
                <input type='radio' :value="item.value" :checked="item.isChecked" />
                <div>{{ item.label }}</div>
              </div>
            </label>
          </div>
        </div> -->
      </div>
      <div class="qs-btns">
        <el-button size="small" @click="preBtn">上一题</el-button>
        <el-button type="" size="small" @click="nextBtn">下一题</el-button>
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
        <el-button type="primary" size="mini" @click="() => tipsModal = false">确定</el-button>
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