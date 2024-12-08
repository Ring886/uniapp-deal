<template>
	<view class="content">
		<uni-easyinput suffixIcon="search" v-model="value" placeholder="请输入内容" @iconClick="onClick"></uni-easyinput>
	</view>
	<!-- <view v-if="isShow"> -->
		<view class="items">
			<itemCard v-for="img in displayedImages" :_id="img._id" :src="img.src" :detail="img.detail" :id="img.id" :views="img.views" :date="img.date" :key="img.id"/>
		</view>
	<!-- </view> -->
</template>

<script setup>
	import {ref} from 'vue'
	import {onReachBottom} from '@dcloudio/uni-app'
	import itemCard from '../../components/item-preview/item-preview.vue'
	const value = ref('')
	const isShow = ref(false)
	
	
	const displayedImages = ref([])
	const imagesPerPage = 6
	const currentPage = ref(1)
	const imgArr = ref([])
	const flag = ref(false)
	
	
	function loadImages() {
		uni.showNavigationBarLoading()
		const totalImages = imgArr.value.length
		const start = Math.max(totalImages - currentPage.value * imagesPerPage, 0)
		const end = totalImages - (currentPage.value - 1) * imagesPerPage
		const newImages = imgArr.value.slice(start, end).reverse() // 切片后反转数组
		
		displayedImages.value.push(...newImages)
		// console.log(displayedImages.value)
		currentPage.value++
		
		uni.hideNavigationBarLoading();
		uni.stopPullDownRefresh();
	}
	
	function getimgArr() {
		console.log('take getimgArr')
		return new Promise((resolve, reject) => {
			uni.request({
				url: 'https://dwdeal.cn/search',
				method: 'POST',
				data: {value: value.value},
				success: res => {
					imgArr.value = res.data.items
					console.log('getimgArr is', imgArr.value)
					resolve();
				},
				fail: err => {
					console.log('获取图片数组失败', err)
					reject(err);
				}
			})
		})
	}
	onReachBottom(()=>{
		if(displayedImages.value.length === imgArr.value.length) {
			flag.value = true
			uni.showToast({
				title: '没有更多了',
				icon: 'none'
			})
			setTimeout(() => {
				return
			}, 1000)
		}
		if(!flag.value) loadImages()
	})
	async function onClick() {
		displayedImages.value = []
		currentPage.value = 1
		imgArr.value = []
		// isShow.value = true
		uni.showLoading({
			title: '加载中'
		});
		await getimgArr()
		loadImages()
		uni.hideLoading()
		if(imgArr.value.length === 0) {
			uni.showToast({
				title: `没有找到关于${value.value}的帖子`,
				icon: 'none'
			})
		}
	}
	
	
</script>

<style lang="scss" scoped>
	.content{
		display: flex;
		flex-wrap: wrap;
		font-size: 40rpx;
		padding: 10rpx;
		margin-top: 10rpx;
		margin-bottom: 30rpx;
	}
	.search{
		width: 700rpx;
		height: 50rpx;
		display: flex;
		align-items: center;
		border: 1rpx solid #8f8f94;
		border-radius: 20rpx;
		margin-top: 20rpx;
		color: #8f8f94;
		font-size: 25rpx;
	}
	.items{
		display: flex;
		flex-wrap: wrap;
	}
</style>
