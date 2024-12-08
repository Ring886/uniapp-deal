<template>
  <template name="skeleton">
    <view class="sk-container">
      <view class="content content data-v-5c0363a7 data-v-5c0363a7">
        <view class="container container data-v-5c0363a7 data-v-5c0363a7">
          <view class="notice notice data-v-5c0363a7 data-v-5c0363a7">
            <image class="img1 data-v-5c0363a7 sk-image"></image>
            <view class="notice-text data-v-5c0363a7 sk-transparent sk-text-14-2857-46 sk-text">爱是不夜城，回忆像星辰</view>
          </view>
          <swiper autoplay="false" circular="true" indicator-dots="true" class="data-v-5c0363a7 data-v-5c0363a7" interval="2000" current="0"></swiper>
        </view>
        <navigator class="search data-v-5c0363a7 sk-transparent">
          <image class="data-v-5c0363a7 sk-image" mode="aspectFill" style="width:20px;height:20px"></image> 搜索 </navigator>
      </view>
      <view class="items items data-v-5c0363a7 data-v-5c0363a7">
        <view is="components/item-preview/item-preview" class="data-v-5c0363a7 data-v-5c0363a7" id="admin">
          <view class="box preview--box data-v-30fb57dd preview--data-v-30fb57dd">
            <view class="container preview--container data-v-30fb57dd preview--data-v-30fb57dd">
              <image class="img preview--img data-v-30fb57dd preview--data-v-30fb57dd sk-image" mode="aspectFill"></image>
            </view>
            <text class="truncate preview--truncate data-v-30fb57dd preview--data-v-30fb57dd sk-transparent sk-text-14-2857-420 sk-text">嘻嘻</text>
            <view class="bottom-info preview--bottom-info data-v-30fb57dd preview--data-v-30fb57dd">
              <view class="data-v-30fb57dd preview--data-v-30fb57dd" style="display:flex;flex-direction:row;align-items:center">
                <view class="circle preview--circle data-v-30fb57dd preview--data-v-30fb57dd">
                  <image class="avator preview--avator data-v-30fb57dd preview--data-v-30fb57dd sk-image" mode="aspectFill"></image>
                </view>
                <text class="data-v-30fb57dd preview--data-v-30fb57dd sk-transparent sk-text-14-2857-761 sk-text" style="margin-left:2px;font-size:15px">你和</text>
              </view>
              <view class="data-v-30fb57dd preview--data-v-30fb57dd" style="display:flex;align-items:center">
                <text class="data-v-30fb57dd preview--data-v-30fb57dd sk-transparent sk-opacity">0</text>
                <view is="uni_modules/uni-icons/components/uni-icons/uni-icons" class="data-v-30fb57dd preview--data-v-30fb57dd">
                  <text class="uni-icons icons--uni-icons uniui-eye icons--uniui-eye sk-pseudo sk-pseudo-circle" style="color: #333333; font-size: 15px;"></text>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view is="components/item-preview/item-preview" class="data-v-5c0363a7 data-v-5c0363a7" id="123456">
          <view class="box preview--box data-v-30fb57dd preview--data-v-30fb57dd">
            <view class="container preview--container data-v-30fb57dd preview--data-v-30fb57dd">
              <image class="img preview--img data-v-30fb57dd preview--data-v-30fb57dd sk-image" mode="aspectFill"></image>
            </view>
            <text class="truncate preview--truncate data-v-30fb57dd preview--data-v-30fb57dd sk-transparent sk-text-14-2857-145 sk-text">出失忆症</text>
            <view class="bottom-info preview--bottom-info data-v-30fb57dd preview--data-v-30fb57dd">
              <view class="data-v-30fb57dd preview--data-v-30fb57dd" style="display:flex;flex-direction:row;align-items:center">
                <view class="circle preview--circle data-v-30fb57dd preview--data-v-30fb57dd">
                  <image class="avator preview--avator data-v-30fb57dd preview--data-v-30fb57dd sk-image" mode="aspectFill"></image>
                </view>
                <text class="data-v-30fb57dd preview--data-v-30fb57dd sk-transparent sk-text-14-2857-301 sk-text" style="margin-left:2px;font-size:15px">环</text>
              </view>
              <view class="data-v-30fb57dd preview--data-v-30fb57dd" style="display:flex;align-items:center">
                <text class="data-v-30fb57dd preview--data-v-30fb57dd sk-transparent sk-opacity">6</text>
                <view is="uni_modules/uni-icons/components/uni-icons/uni-icons" class="data-v-30fb57dd preview--data-v-30fb57dd">
                  <text class="uni-icons icons--uni-icons uniui-eye icons--uniui-eye sk-pseudo sk-pseudo-circle" style="color: #333333; font-size: 15px;"></text>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view is="components/item-preview/item-preview" class="data-v-5c0363a7 data-v-5c0363a7" id="zsd"></view>
        <view is="components/item-preview/item-preview" class="data-v-5c0363a7 data-v-5c0363a7" id="admin"></view>
      </view>
    </view>
  </template>
</template>

<script>
</script>

<style>
  .sk-transparent {
    color: transparent !important;
  }
  .sk-text-14-2857-46 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.0000rpx;
    position: relative !important;
  }
  .sk-text {
    background-origin: content-box !important;
    background-clip: content-box !important;
    background-color: transparent !important;
    color: transparent !important;
    background-repeat: repeat-y !important;
  }
  .sk-text-14-2857-420 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 37.6923rpx;
    position: relative !important;
  }
  .sk-text-14-2857-761 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 40.3846rpx;
    position: relative !important;
  }
  .sk-opacity {
    opacity: 0 !important;
  }
  .sk-text-14-2857-145 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 37.6923rpx;
    position: relative !important;
  }
  .sk-text-14-2857-301 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 40.3846rpx;
    position: relative !important;
  }
  .sk-image {
    background: #EFEFEF !important;
  }
  .sk-pseudo::before, .sk-pseudo::after {
    background: #EFEFEF !important;
    background-image: none !important;
    color: transparent !important;
    border-color: transparent !important;
  }
  .sk-pseudo-rect::before, .sk-pseudo-rect::after {
    border-radius: 0 !important;
  }
  .sk-pseudo-circle::before, .sk-pseudo-circle::after {
    border-radius: 50% !important;
  }
  .sk-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: transparent;
  }

</style>