<template>
  <Skeleton v-if="!isLoaded"/>
	<view v-else class="content">
		<view class="container">
			<view class="notice">
				<img src="../../static/notice.png" class="img1">
				<view class="notice-text">{{notice}}</view>
			</view>
			<swiper indicator-dots circular autoplay interval="2000">
				<!-- <swiper-item>
					<image src="../../static/xgirl.jpg" class="img2" mode="aspectFill"/>
				</swiper-item>
				<swiper-item>
					<view class="box">B</view>
				</swiper-item> -->
				<swiper-item v-for="src in imageNotice" :key="src">
					<image :src="src" class="img2" mode="aspectFill"/>
				</swiper-item>
			</swiper>
			<!-- <image src="http://tmp/bAa0pXyc1Wj80cb591aaf166098b69e312ebc7a4acce.jpg"></image> -->
		</view>
		<navigator url="../search/search" class="search">
			<image src="../../static/搜索.png" style="width: 40rpx; height: 40rpx;"  mode="aspectFill"/>
			搜索
		</navigator>
	</view>
	<view class="items">
		<itemCard v-for="img in displayedImages" :_id="img._id" :src="img.src" :detail="img.detail" :id="img.id" :views="img.views" :date="img.date" :key="img.id"/>
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	import {onLoad, onReachBottom, onPullDownRefresh} from '@dcloudio/uni-app'
	import itemCard from '../../components/item-preview/item-preview.vue'
	import Skeleton from '../../components/skeleton/skeleton.vue'
	
	const notice = ref('')
  
	const isLoaded = ref(false) // 控制骨架屏是否渲染
	
	const displayedImages = ref([])
	const imagesPerPage = 6
	const currentPage = ref(1)
	
	
	const imgArr = ref([])
	
	const flag = ref(false)
	
	
	const imageNotice = ref([])
	function getImageNotice() {
		uni.request({
			url: 'https://dwdeal.cn/getImageNotice',
			method: 'POST',
			success: res => {
				if(res.data.success) {
					imageNotice.value = res.data.imageNotice
				} else {
					console.error('服务器错误', res.data.message)
				}
			}, 
			fail: err => {
				console.error('获取imageNotice失败', err)
			}
		})
	}
	
	function getNotice() {
		uni.request({
			url: 'https://dwdeal.cn/getNotice',
			method: 'POST',
			success: res => {
				if(res.data.success) {
					notice.value = res.data.notice
				} else {
					console.error('服务器错误', res.data.message)
				}
			}, 
			fail: err => {
				console.error('获取notice失败', err)
			}
		})
	}
	
	
	
	function loadImages() {
		uni.showNavigationBarLoading()
		const totalImages = imgArr.value.length
		const start = Math.max(totalImages - currentPage.value * imagesPerPage, 0)
		const end = totalImages - (currentPage.value - 1) * imagesPerPage
		const newImages = imgArr.value.slice(start, end).reverse() // 切片后反转数组
		
		displayedImages.value.push(...newImages)
		currentPage.value++
		
		uni.hideNavigationBarLoading();
		uni.stopPullDownRefresh();
	}
	
	function getimgArr() {
		console.log('take getimgArr')
		return new Promise((resolve, reject) => {
			uni.request({
				url: 'https://dwdeal.cn/getimgArr',
				method: 'POST',
				success: res => {
					imgArr.value = res.data.imgArr
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
	onLoad(async() => {
		console.log('onLoad')
		uni.showLoading({
			title: '加载中'
		});
		await getimgArr()
		loadImages()
		getNotice()
		getImageNotice()
    isLoaded.value = true
		uni.hideLoading()
		
	})
	onPullDownRefresh(async() => {
		displayedImages.value = []
		currentPage.value = 1
		imgArr.value = []
		flag.value = false
		uni.showLoading({
			title: '加载中'
		});
		await getimgArr()
		loadImages()
		uni.hideLoading()
	})
	
</script>

<style lang="scss" scoped>
	.notice {
		width: 600rpx;
		height: 50rpx;
		font-size: 25rpx;
		border: 2px solid red;
		border-radius: 15rpx;
		margin: 25rpx 50rpx;
		padding: 5rpx;
		display: flex;
		direction: row;
		align-items: center;
	}
	.img1 {
		width: 50rpx;
		height: 50rpx;
		object-fit: cover;
	}
	.notice .notice-text{
		margin-left: 20rpx;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	swiper {
		width: 750rpx;
		height: calc(100vw*10/16);
		border:1rpx solid green;
		overflow: hidden;
	}
	.box {
		background-color: gray;
		height: 100%; /* 确保高度与swiper一致 */
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 50rpx; /* 文字大小 */
		color: white;
	}
	.img2{
		width: 100%;
		height: 100%;
		// object-fit: cover;
	}
	.items{
		display: flex;
		flex-wrap: wrap;
	}
	.search{
		width: 400rpx;
		height: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1rpx solid #8f8f94;
		border-radius: 20rpx;
		margin-top: 20rpx;
		color: #8f8f94;
		font-size: 25rpx;
	}
</style>
