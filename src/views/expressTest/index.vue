<template>
  <div class="page-wrapper">
    <div class="qs-wrapper">
      <div class="qs-content">
        <div class="qs-desc">
          <p class="desc-text">{{ currentData.question }}</p>
        </div>
        <!-- 多张图片，选出某几禁寄送的 -->
        <div class="qs-select-wrapper" v-if="currentData.type == 5">
          <div class="qs-img-box-wrapper">
            <div class="qs-img-box">
              <p class="arrow" @click="nextCircleImgSpecial"><i class="el-icon-arrow-left"></i></p>
              <div class="qs-img-item" @click="selectCircleImgHandle">
                <img :src="currentData.images[circleIndex].url" />
              </div>
              <p class="arrow" @click="preCircleImgSpecial"><i class="el-icon-arrow-right"></i></p>
            </div>
            <div>
              <p class="total">{{ currentData.images[circleIndex].desc }}</p>
              <p class="total">{{ circleIndex + 1 }}/{{ currentData.images.length }}</p>
            </div>
          </div>
          <div class="qs-select">
            <div class="qs-select-area">
              <div class="qs-select-area-item qs-select-area-item-img">
                <div class="qs-select-bg">
                  <div class="select-bg-item">
                    <p>1</p>
                    <p>禁忌物品</p>
                  </div>
                  <div class="select-bg-item">
                    <p>2</p>
                    <p>禁忌物品</p>
                  </div>
                  <div class="select-bg-item">
                    <p>3</p>
                    <p>禁忌物品</p>
                  </div>
                  <div class="select-bg-item">
                    <p>4</p>
                    <p>禁忌物品</p>
                  </div>
                </div>
                <img :src="item.url" alt="" v-for="(item, index) in selectedData" :key="index"
                  @click="cancelSelectedHandle(item, index)">
              </div>
            </div>
          </div>
        </div>

        <!-- 对寄送物品查验，选出禁寄物品 -->
        <div class="qs-select-wrapper" v-if="currentData.type == 8">
          <div class="qs-img-box-wrapper">
            <div v-if="!showSubImage">
              <div class="qs-img-box">
                <p class="arrow" @click="nextCircleImg"><i class="el-icon-arrow-left"></i></p>
                <div class="qs-img-item" @click="currentImgTypeView">
                  <img :src="currentData.images[circleIndex].url" />
                </div>
                <p class="arrow" @click="preCircleImg"><i class="el-icon-arrow-right"></i></p>
              </div>
              <div>
                <p class="total">{{ currentData.images[circleIndex].desc }}</p>
                <p class="total">{{ circleIndex + 1 }}/{{ currentData.images.length }}</p>
              </div>
            </div>
            <div class="sub-images" v-else>
              <div class="sub-images-list">
                <div class="sub-images-item" v-for="subItem in subImages">
                  <img :src="subItem.url" alt="">
                  <p class="sub-item-desc">{{ subItem.desc }}</p>
                </div>
              </div>
              <p class="back-btn"><el-button type="text" icon="el-icon-back" @click="back">返回</el-button></p>
            </div>
          </div>
          <div class="qs-select">
            <div class="qs-select-area">
              <div class="qs-select-area-item qs-select-area-item-img">
                <div class="qs-select-bg">
                  <div class="select-bg-item">
                    <p>1</p>
                    <p>禁忌物品</p>
                  </div>
                  <div class="select-bg-item">
                    <p>2</p>
                    <p>禁忌物品</p>
                  </div>
                  <div class="select-bg-item">
                    <p>3</p>
                    <p>禁忌物品</p>
                  </div>
                  <div class="select-bg-item">
                    <p>4</p>
                    <p>禁忌物品</p>
                  </div>
                </div>
                <img :src="item.url" alt="" v-for="(item, index) in selectedData" :key="index"
                  @click="cancelSelectedHandle(item, index)">
              </div>
            </div>
          </div>
        </div>
        <!-- 根据资费，填写费用 -->
        <div class="qs-select-wrapper" v-if="currentData.type == 3">
          <div class="qs-img qs-cost">
            <img :src="currentData.images[0].url" />
          </div>
          <div class="qs-select">
            <div class="qs-select-input-box">
              <p class="arrow" @click="nextCircle"><i class="el-icon-arrow-up"></i></p>
              <div class="qs-select-input">
                <p class="qs-text">
                  {{ currentData.inputText[circleIndex].text }}
                  <input class="qs-input" v-model="currentData.inputText[circleIndex].value" type="number"
                    pattern="[0-9]*" :maxlength="3" @change="changeHandle()" />
                  <span>元。</span>
                </p>
              </div>
              <p class="arrow" @click="preCircle"><i class="el-icon-arrow-down"></i></p>
            </div>
            <p class='subTotal'>{{ circleIndex + 1 }}/{{ currentData.inputText.length }}</p>
          </div>
        </div>
        <!-- 图片描述类型 按照上述区域合理设计路线 -->
        <div class="qs-select-wrapper" v-if="currentData.type == 4">
          <div class="qs-img qs-other-img">
            <img :src="currentData.images[0].url" />
          </div>
          <div class="qs-select">
            <div class="qs-select-area">
              <draggable class="qs-select-area-item qs-select-drag" v-model="selectedData">
                <p class="select-area-item" v-for="item in selectedData" :key="index">{{ item.value }}</p>
              </draggable>
            </div>
            <div class="qs-select-list">
              <p class="list-item" v-for="(item, index) in currentData.selectList"
                :class="item.isChecked ? 'list-item-active' : ''" :key="index" @click="selectItemHandle(item)">
                {{ item.value }}
              </p>
            </div>
          </div>
        </div>

        <!-- 根据图片，选择对应省份 -->
        <div class="qs-select-wrapper" v-if="currentData.type == 7">
          <div class="qs-img-box-wrapper qs-img-box-charge">
            <div class="qs-img-box-charge-city">
              <div class="qs-img-box">
                <p class="arrow" @click="nextCircleImg"><i class="el-icon-arrow-left"></i></p>
                <div class="qs-img-item qs-img-city">
                  <img :src="currentData.images[circleIndex].url" />
                  <span class="city-name"
                    :class="currentData.images[circleIndex].selectValue == '' ? 'city-name-fade' : ''">
                    {{ currentData.images[circleIndex].selectValue }}
                  </span>
                </div>
                <p class="arrow" @click="preCircleImg"><i class="el-icon-arrow-right"></i></p>
              </div>
              <div>
                <p class="total">{{ circleIndex + 1 }}/{{ currentData.images.length }}</p>
              </div>
            </div>
            <div class="city-select">
              <el-select v-model="cityValue" placeholder="请选择省份" @change="cityChange">
                <el-option v-for="item in currentData.citys" :key="item.cityValue" :label="item.cityName"
                  :value="item.cityValue">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>

        <!-- 视频 ，四个视频，选择正确的 -->
        <div class="qs-select-wrapper" v-if="currentData.type == 1">
          <div class="qs-video-box">
            <div class="video-item" v-for="(item, index) in currentData.videos" :key="index">
              <video :src="item.url" controls></video>
              <el-checkbox v-model="item.isChecked" size="medium" @change="radioChange(item, index)"></el-checkbox>
            </div>
          </div>
        </div>

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

        <!-- 剔除超出配送范围的，对其它配送的排序 -->
        <!-- <div class="qs-select-wrapper" v-if="currentData.type == 6">
          <div class="qs-serial-box">
            <div class="qs-serial-list" :class="item.isChecked ? 'qs-serial-list-active' : ''"
              v-for="(item, index) in currentData.rowList" @click="serialClickHandle(item, index)">
              <p>{{ item.text }}{{ item.serialNumber }}号</p>
            </div>
          </div>
          <div class="qs-select">
            <div class="qs-select-area">
              <div class="qs-select-area-item">
                <p class="select-area-item" v-for="(item, index) in selectedData">{{ item.serialNumber }}号</p>
              </div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="qs-options">
        <div class="options-btn">
          <el-button size="small" type="success" @click="submitHandle">提交</el-button>
          <el-button size="small" type="primary" @click="resetHandle">重置</el-button>
        </div>
        <div class="options-list">
          <el-button class="btn-text" :class="currentIndex == index ? 'btn-text-active' : ''" size="small" type="text"
            v-for="(item, index) in list" :key="index" @click="nextItem(index)">
            第{{ numberList[index] }}题</el-button>
        </div>
      </div>
      <!-- 大图预览 -->
      <!-- <div class="preview" v-show="previewModal">
        <div class="preview-img">
          <img :src="previewObj.url" alt="">
        </div>
        <div class="pre-btn">
          <el-button type="" size="small" @click="cancelPrevView">取消</el-button>
          <el-button type="primary" size="small" @click="selectImgHandle">确定</el-button>
        </div>
      </div> -->
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
// @import url('./index.less');
@import url('./express.less');
</style>