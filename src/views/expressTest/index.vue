<template>
  <div class="page-wrapper">
    <div class="qs-wrapper" v-if="!isFinished">
      <div class="qs-content">
        <div class="qs-desc">
          <p class="desc-text" v-html="currentData.question"></p>
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

        <!-- 根据资费，填写费用 -->
        <div class="qs-select-wrapper" v-if="currentData.type == 3">
          <div class="qs-img qs-cost">
            <img :src="currentData.images[0].url" />
          </div>
          <div class="qs-select">
            <div class="qs-select-input-box">
              <p class="arrow" @click="nextCircle"><span>上一题</span><i class="el-icon-arrow-up"></i></p>
              <div class="qs-select-input">
                <p class="qs-text">
                  {{ currentData.inputText[circleIndex].url }}
                  <input class="qs-input" v-model="currentData.inputText[circleIndex].value" type="number"
                    placeholder="点击输入价格" pattern="[0-9]*" :maxlength="3" @change="changeHandle" />
                  <span>元。</span>
                </p>
              </div>
              <p class="arrow" @click="preCircle"><span>下一题</span><i class="el-icon-arrow-down"></i></p>
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
            <div class="qs-select-area qs-select-radio">
              <el-radio-group v-model="currentData.selectValue" @change="selectItemHandle">
                <p class="list-item" v-for="(item, index) in currentData.selectList"
                  :class="item.isChecked ? 'list-item-active' : ''" :key="index">
                  <el-radio :label="item.id"> {{ index + 1 }}、{{ item.value }}</el-radio>
                </p>
              </el-radio-group>
            </div>
          </div>
        </div>
        <!-- 多张图片，选出某几禁寄送的 -->
        <div class="qs-select-wrapper" v-if="currentData.type == 5">
          <div class="qs-img-box-wrapper">
            <div class="qs-img-box">
              <p class="arrow" @click="nextCircleImgSpecial"><span>上一题</span><i class="el-icon-arrow-left"></i></p>
              <div class="qs-img-item" @click="selectCircleImgHandle">
                <img :src="currentData.images[circleIndex].url" />
              </div>
              <p class="arrow" @click="preCircleImgSpecial"><span>下一题</span><i class="el-icon-arrow-right"></i></p>
            </div>
            <div>
              <p class="total">{{ currentData.images[circleIndex].desc }}</p>
              <p class="total">{{ circleIndex + 1 }}/{{ currentData.images.length }}</p>
            </div>
            <!-- 指示图 -->
            <div class="gif-img" v-show="showGif">
              <img src="../../assets/imgs/finger.gif" alt="">
            </div>
          </div>
          <div class="qs-select">
            <div class="qs-select-area">
              <div class="qs-select-area-item qs-select-area-item-img">
                <div class="qs-select-bg">
                  <div class="select-bg-item">
                    <p>1</p>
                    <p>禁寄物品</p>
                  </div>
                  <div class="select-bg-item">
                    <p>2</p>
                    <p>禁寄物品</p>
                  </div>
                  <div class="select-bg-item">
                    <p>3</p>
                    <p>禁寄物品</p>
                  </div>
                  <div class="select-bg-item">
                    <p>4</p>
                    <p>禁寄物品</p>
                  </div>
                </div>
                <img :src="item.url" alt="" v-for="(item, index) in selectedData" :key="index"
                  @click="cancelSelectedHandle(item, index)">
              </div>
            </div>
          </div>
        </div>
        <div class="qs-select-wrapper" v-if="currentData.type == 6">
          <div class="qs-img-box-wrapper">
            <div class="qs-img-box">
              <p class="arrow" @click="nextCircleImgSpecial"><span>上一题</span><i class="el-icon-arrow-left"></i></p>
              <div class="qs-img-item qs-img-bg" @click="selectCircleImgTypeSixHandle">
                <div class="img-box">
                  <img :src="currentData.images[circleIndex].url" />
                </div>
              </div>
              <p class="arrow" @click="preCircleImgSpecial"><span>下一题</span><i class="el-icon-arrow-right"></i></p>
            </div>
            <div>
              <p class="total">{{ currentData.images[circleIndex].desc }}</p>
              <p class="total">{{ circleIndex + 1 }}/{{ currentData.images.length }}</p>
            </div>
          </div>
          <div class="qs-select">
            <div class="qs-select-area">
              <div class="qs-select-area-item qs-select-area-item-img qs-select-area-item-other-img">
                <div class="qs-select-bg  qs-select-other-bg">
                  <div class="select-bg-item">
                    <p>1</p>
                    <p>禁寄物品</p>
                  </div>
                  <div class="select-bg-item">
                    <p>2</p>
                    <p>禁寄物品</p>
                  </div>
                </div>
                <img :src="item.url" alt="" v-for="(item, index) in selectedData" :key="index"
                  @click="cancelSelectedHandle(item, index)">
              </div>
            </div>
          </div>
        </div>
        <!-- 根据图片，选择对应省份 -->
        <div class="qs-select-wrapper" v-if="currentData.type == 7">
          <div class="qs-img-box-wrapper qs-img-box-charge">
            <div class="qs-img-box-charge-city">
              <div class="qs-img-box">
                <p class="arrow" @click="nextCircleImg"><span>上一题</span><i class="el-icon-arrow-left"></i></p>
                <div class="qs-img-item qs-img-city">
                  <img :src="currentData.images[circleIndex].url" />
                  <span class="city-name"
                    :class="currentData.images[circleIndex].selectValue == '' ? 'city-name-fade' : ''">
                    {{ currentData.images[circleIndex].selectValue ? currentData.images[circleIndex].cityName : '' }}
                  </span>
                </div>
                <p class="arrow" @click="preCircleImg"><span>下一题</span><i class="el-icon-arrow-right"></i></p>
              </div>
              <div>
                <p class="total">{{ circleIndex + 1 }}/{{ currentData.images.length }}</p>
              </div>
            </div>
            <div class="city-select">
              <el-select v-model="cityValue" placeholder="请选择省份" @change="cityChange">
                <el-option v-for="item in cityData" :key="item.cityValue" :label="item.cityName" :value="item.cityValue">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <!-- 对寄送物品查验，选出禁寄物品 -->
        <div class="qs-select-wrapper" v-if="currentData.type == 8">
          <div class="qs-img-box-wrapper">
            <div v-if="!showSubImage">
              <div class="qs-img-box">
                <p class="arrow" @click="nextCircleImg"><span>上一题</span><i class="el-icon-arrow-left"></i></p>
                <div class="qs-img-item" @click="currentImgTypeView">
                  <img :src="currentData.images[circleIndex].url" />
                </div>
                <p class="arrow" @click="preCircleImg"><span>下一题</span><i class="el-icon-arrow-right"></i></p>
              </div>
              <div>
                <p class="total">{{ currentData.images[circleIndex].desc }}</p>
                <p class="total">{{ circleIndex + 1 }}/{{ currentData.images.length }}</p>
              </div>
            </div>
            <div class="sub-images" v-else>
              <div class="sub-images-list">
                <div class="sub-images-item" v-for="subItem in subImages" @click="confirmSelect">
                  <img :src="subItem.url" alt="">
                  <p class="sub-item-desc">{{ subItem.desc }}</p>
                </div>
              </div>
              <p class="back-btn"><el-button type="text" icon="el-icon-back" @click="back">返回</el-button></p>
            </div>
          </div>
          <div class="qs-select">
            <div class="qs-select-area">
              <div class="qs-select-area-item qs-select-area-item-img qs-select-area-item-other-img">
                <div class="qs-select-bg  qs-select-other-bg">
                  <div class="select-bg-item">
                    <p>1</p>
                    <p>禁寄物品</p>
                  </div>
                  <div class="select-bg-item">
                    <p>2</p>
                    <p>禁寄物品</p>
                  </div>
                </div>
                <img :src="item.url" alt="" v-for="(item, index) in selectedData" :key="index"
                  @click="cancelSelectedHandle(item, index)">
              </div>
            </div>
          </div>
        </div>
        <!-- 客户投诉 -->
        <div class="qs-select-wrapper" v-if="currentData.type == 9">
          <div class="complaint-box">
            <div class="answer-box">
              <div class="answer-box-left">
                <img src="http://123.57.230.57:6011/assets/imgs/other/快递员.png" alt="">
              </div>
              <div class="answer-box-right">
                <div class="question-list">
                  <p class="list-item" v-for="(item, index) in checkboxList">{{ index + 1 }}、{{ item.url }}
                  </p>
                </div>
              </div>
            </div>
            <div class="question-box">
              <div class="question-box-left">
                <div class="question-text">
                  <p>我没收到快递，</p>
                  <p>为什么显示已签收?</p>
                </div>
              </div>
              <div class="question-box-right">
                <img src="http://123.57.230.57:6011/assets/imgs/other/省钱.png" alt="">
              </div>
            </div>
          </div>
          <div class="qs-select">
            <div class="qs-select-area qs-select-checkbox">
              <el-checkbox-group v-model="checkboxValue" @change="selectCheckboxHandle">
                <p class="list-item" v-for="(item, index) in currentData.images"
                  :class="item.isChecked ? 'list-item-active' : ''" :key="index">
                  <el-checkbox :label="item.desc"> {{ index + 1 }}、{{ item.url }}</el-checkbox>
                </p>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>
      <div class="qs-options">
        <div class="options-btn">
          <el-button size="small" type="success" @click="submitHandle">提交</el-button>
          <el-button size="small" type="primary" @click="resetHandle">重置</el-button>
        </div>
        <div class="options-list">
          <el-button class="btn-text" :class="indexList.includes(index) ? 'btn-text-active' : ''" size="small" type="text"
            v-for="(item, index) in list" :key="index" @click="nextItem(index)">
            第{{ numberList[index] }}项</el-button>
        </div>
      </div>
    </div>
    <div v-else class="qs-wrapper">
      <p class="qs-content qs-content-finished">考试已结束！</p>
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