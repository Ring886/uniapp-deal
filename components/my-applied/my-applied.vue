<template>
	<view>
		<view class="ImgWord" @click="gotoDetail">
			<view class="card">
				<image :src="src[0]" class="image" mode="aspectFill"/>
			</view>
			<view class="text">
				<text class="truncate">{{detail}}</text>
			</view>
			<button class="delete-button" @click.stop="deleteItem">删除</button>
		</view>
	</view>
</template>

<script setup>
	import { ref, defineProps } from 'vue'
	const props = defineProps({
		_id: String,
	  src: Array,
		detail: String,
		id: String,
		views: Number,
		date: String
	})
	const admin = ref(uni.getStorageSync('success'))
	function gotoDetail() {
		try {
			uni.setStorageSync('item', [admin.value[0], admin.value[1], props.detail, props.src, props.views, props.date, props._id, props.id])
			uni.navigateTo({
				url: '/pages/detail/detail'
			})
		} catch(e) {
			console.error('设置缓存失败')
		}
	}
	
	function deleteItem() {
		return new Promise((resolve, reject) => {
			uni.showModal({
				title: '提示',
				content: '您确定要删除该帖子？',
				success: function (res) {
					if (res.confirm) {
						uni.request({
							url: 'https://dwdeal.cn/deleteItem',
							method: 'POST',
							header: {'content-type': 'application/json'},
							data: {_id: props._id},
							success: res => {
								if(res.data.success) {
									resolve()
								} else {
									reject(`服务器出错${res.data.message}`)
								}
							},
							fail: err => {
								reject(`删除失败${err}`)
							}
						})
					}
				}
			});
		})
		.then(() => {
			uni.showToast({
				title: '删除成功'
			})
		})
		.catch(err => {
			uni.showToast({
				title: `操作失败: ${err}`,
				icon: 'none'
			});
		});
	}
</script>

<style lang="scss" scoped>
	.ImgWord{
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 650rpx;
	}
	.card{
		height: 100rpx;
		width: 100rpx;
		display: flex;
		flex-direction: row;
		padding: 15rpx;
		flex-shrink: 0; /* 防止图片被压缩 */
	}
	.image{
	  width: 100%;                
	  height: 100%;
		object-fit: cover;
		overflow: hidden;
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
		margin-right: 20rpx;
		max-width: 300rpx; /* 通过最大宽度限制显示的字符数 */
	}
	.delete-button {
			background-color: transparent;
			border: none;
			// text-decoration: underline;
			color: darkgray;
			margin-left: 10rpx; /* 调整与左侧文本的距离 */
			position: absolute;
			right: 0;
			font-size: 28rpx;
			line-height: 30rpx; /* 确保文字一行显示 */
			padding: 5rpx; /* 去除默认内边距 */
		}
</style>