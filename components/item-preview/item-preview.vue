<template>
	<view class="box" @click="gotoDetail">
		<view class="container">
			<image :src="src[0]" class="img" mode="aspectFill"/>
		</view>
		<text class="truncate"> {{text}} </text>
		<view class="bottom-info">
			<view style="display: flex; flex-direction: row; align-items: center;">
				<view class="circle">
					<image :src="avator" mode="aspectFill" class="avator"></image>
				</view>
				<text style="margin-left: 5rpx; font-size: 30rpx;"> {{name}} </text>
			</view>
			<view style="display: flex; align-items: center;">
				<text>{{views}}</text>
				<uni-icons type="eye" size="15"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	import { defineProps } from 'vue'
	const props = defineProps({
		_id: String,
	  src: Array,
		detail: String,
		id: String,
		views: Number,
		date: String
	})
	
	const text = ref('')
	const avator = ref('')
	const name = ref('')
	text.value = props.detail
	uni.request({
		url: 'https://dwdeal.cn/getAvator',
		method: 'POST',
		header: {'content-type': 'application/json'},
		data: {id: props.id},
		success: res => {
			console.log(props.id)
			if(res.data.success) {	
				avator.value = res.data.avator
				name.value = res.data.name
				console.log(name.value)
			} else {
				console.log('服务器失败', res.data.message)
			}
		},
		fail: err => {
			console.log('请求失败', err)
		}
	})
	
	// const src = ref('../../static/paris.png')
	function gotoDetail() {
		try {
			uni.setStorageSync('item', [name.value, avator.value, text.value, props.src, props.views, props.date, props._id, props.id])
			uni.navigateTo({
				url: '/pages/detail/detail'
			})
		} catch(e) {
			console.error('设置缓存失败')
		}
	}
	
	
</script>

<style scoped lang="scss">
	.box{
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 335rpx;
		height: auto;
		border-radius: 20rpx;
		margin: 20rpx;
		padding-bottom: 15rpx;
	}
	.container {
		width: 350rpx;
		height: calc(100vw*10/16);
		border-radius: 20rpx;
		overflow: hidden;
		margin-bottom: 5rpx;
	}
	.img{
		width: 100%;
		height: 100%;
	}
	.truncate {
	  display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2; /* 限制显示的行数为2行 */
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: normal; /* 确保文本可以换行 */
		font-size: 28rpx;
		padding: 5rpx;
	}
	.bottom-info{
		display: flex;
		justify-content: space-between;
	}
	.circle {
		margin-top: 5rpx;
		border-radius: 50%;
		width: 50rpx;
		height: 50rpx;
		margin-bottom: 5rpx;
	}
	.avator {
		width: 100%;               
		height: 100%;
		object-fit: cover;
		border-radius: 50%;
	}
</style>