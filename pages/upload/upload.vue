<template>
  <view class="container">
    <!-- 使用 uni-transition 包裹需要动画的内容 -->
    <uni-transition
      ref="ani"
      :mode-class="modeClass"
      :styles="styles"
      :show="show"
    >
      <view class="content">
        <navigator url="../opt-1/opt-1" class="box">发闲置物品</navigator>
        <navigator url="../opt-2/opt-2" class="box">反馈入口</navigator>
        <!-- <navigator url="../opt-3/opt-3" class="box">寻物启事</navigator> -->
      </view>
    </uni-transition>
  </view>
</template>

<script setup>
	import { ref, onMounted, onUnmounted } from 'vue';
	import { onLoad, onShow, onHide } from '@dcloudio/uni-app';

	// 定义响应式变量来控制动画显示
	const show = ref(false);
	const modeClass = ref(['fade', 'zoom-in']); // 初始化动画类型

	// 定义动画的样式
	const styles = ref({
	  transition: 'opacity 0.5s ease, transform 0.5s ease',
	});
	

	// 页面显示时触发动画
	onShow(() => {
	  // 页面显示时，设置动画可见
	  show.value = true;
	});
	onHide(() => {
		show.value = false;	
	})
</script>

<style scoped>
	.container {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  height: 90vh;
	  /* background-color: #fff; */
	}

	.content {
	  padding: 20px;
	  border-radius: 10px;
	}
	.box {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  height: 300rpx;
	  width: 300rpx;
	  margin: 50rpx;
	  background: linear-gradient(145deg, #f0f0f0, #d0d0d0);
	  border-radius: 10px;
	  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
	              -5px -5px 10px rgba(255, 255, 255, 0.5);
	  font-size: 50rpx;
	  border: 1px solid rgba(0, 0, 0, 0.05);
	}
</style>
