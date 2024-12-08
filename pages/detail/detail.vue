<template>
	<view class="container">
		<view class="header">
			<view style="display: flex; flex-direction: row; align-items: center;">
				<view class="circle">
					<image :src="avator" mode="aspectFill" class="avator"></image>
				</view>
				<text style="margin-left: 5rpx; font-size: 30rpx;"> {{name}} </text>
			</view>
			<view style="display: flex; align-items: center;">
				<text>{{views}}</text>
				<uni-icons type="eye" size="30"></uni-icons>
			</view>
		</view>
		
		<view style="display: flex; flex-direction: row-reverse; font-size: 25rpx;">发布时间: {{date}}</view>
		
		<view class="content">{{text}}</view>
		
		<view class="image">
			<image v-for="(img, index) in imgArr" :src="img" mode="widthFix" :key="img" @click="preview(index)"
				style="width: 100%; margin: 5rpx;border-radius: 20rpx;overflow: hidden;">
			</image>
		</view>
	</view>
</template>

<script setup>
	import {customRef, ref} from 'vue'
	import {onShow} from '@dcloudio/uni-app'
	import { onMounted } from 'vue';
	
	const user = ref(uni.getStorageSync('item'))
	const name = ref(user.value[0])
	const avator = ref(user.value[1])
	const text = ref(user.value[2])
	const imgArr = ref(user.value[3])
	const views = ref(user.value[4])
	const date = ref(user.value[5])
	const _id = ref(user.value[6])
	const id = ref(uni.getStorageSync('success'))
	
	function preview(index) {
		uni.previewImage({
			urls: imgArr.value,
			current: index,
		});
	}
	
	onMounted(() => {
		console.log(_id.value)
		if(id.value && user.value[7] !== id.value[2]) {
			uni.request({
				url: 'https://dwdeal.cn/viewsUp',
				method: 'POST',
				header: {'content-type': 'application/json'},
				data: {_id: _id.value},
				success: res => {
					if(res.data.success) {
						console.log('views增加成功')
					} else {
						console.log('服务器出错', res.data.message, res.data.error)
					}
				}, fail: err => {
					console.error('views自增失败')
				}
			})
		} else {
			console.log('点赞的发布的是同一个人！！')
		}
		
	})
	
	
</script>

<style lang="scss" scoped>
	.container{
		display: flex;
		flex-direction: column;
		padding: 30rpx;
		height: auto;
	}
	.header{
		display: flex;
		justify-content: space-between;
		padding: 10rpx;
	}
	.circle {
		border-radius: 50%; 
		width: 100rpx;
		height: 100rpx;
		margin-right: 10rpx;
	}
	.avator {
		width: 100%;               
		height: 100%;
		object-fit: cover;
		border-radius: 50%;
	}
	.content{
		display: flex;
		flex-wrap: wrap;
		font-size: 40rpx;
		padding: 10rpx;
		margin-top: 10rpx;
		margin-bottom: 30rpx;
	}
	.image{
		display: flex;
		flex-direction: column;
		height: auto;
		gap: 5rpx;
	}
</style>
