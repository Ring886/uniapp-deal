<template>
	<view>
		<textarea v-model="feedback" type="text" class="input" placeholder="请填写您的反馈意见以及不满之处,我们会尽量改进"/>
		<button class="submit" @click="debouncedSubmitFeedback" :disabled="broken">提交</button>
	</view>
</template>

<script setup>
	import {ref, computed} from 'vue'
	
	const feedback = ref('')
	const noText = () => feedback.value.trim() === ''
	const broken = computed(() => noText());
	const admin = ref(uni.getStorageSync('success'))
	
	function useDebounce(fn, delay) {
	  const timeout = ref(null);
	  return function(...args) {
	    if (timeout.value) clearTimeout(timeout.value);
	    timeout.value = setTimeout(() => {
	      fn(...args);
	    }, delay);
	  };
	}
	const submitFeedback = () => {
		uni.showLoading({
			title: '加载中'
		})
		uni.request({
			url: 'https://dwdeal.cn/feedback/submit',
			method: 'POST',
			data: {feedback: feedback.value, id: admin.value[2]},
			success: (res) => {
			  uni.showToast({
			  	title: '感谢您的反馈!',
					icon: 'success'
			  })
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/index/index'
					});
				}, 1000)
			},
			fail: (err) => {
			  console.error('提交失败:', err);
			}
		})
		uni.hideLoading()
	}
	const debouncedSubmitFeedback = useDebounce(submitFeedback, 1000);
</script>

<style lang="scss" scoped>
	.input{
		width: 100%;
		height: 400rpx;
	}
</style>
