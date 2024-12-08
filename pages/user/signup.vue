<template>
	<view class="container">
		<view class="input">
			<input type="text" placeholder="请输入账号" v-model="id" />
			<input password type="text" placeholder="请输入密码" v-model="password" />
			<input type="text" placeholder="请输入昵称"v-model="name" />
		</view>
		<button class="submit" @click="submit">提交</button>	
	</view>
</template>


<script setup>
	import {ref} from 'vue'
	const id = ref('')
	const password = ref('')
	const name = ref('')
	
	function check() {
		if(id.value && password.value && name.value) return true
		else return false
	}
	function submit() {
		if(check) {
			uni.request({
				url: 'https://dwdeal.cn/signup',
				method: 'POST',
				header: {'content-type': 'application/json'},
				data: {id:id.value, password:password.value, name:name.value},
				success: res => {
					if(res.data.success) {
						// 储存在数据库中
						uni.showToast({
							title: '注册成功!',
							icon: 'success'
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 1000)
					} else {
						uni.showToast({
							title: `${res.data.message}`,
							icon: 'none'
						})
					}
				},
				fail: err => {
					console.error(err)
					uni.showToast({
						title: '服务器错误',
						icon: 'none'
					})
				}
			})
		}
		else {
			uni.showToast({
				title: '请填全信息！',
				icon: 'none'
			})
		}
	}

	
</script>

<style scoped>
	.container {
		display: flex;	
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 90vh; /* 使容器充满视口高度 */
	}
	input {
		width: 300rpx;
		height: 50rpx;
		border: 2rpx solid gray;
		margin: 30rpx;
		border-radius: 15rpx;
	}
	.submit{
		line-height: 50rpx;			/*这个行高的属性解决了文字在按钮不居中显示的问题*/
		border: 2rpx solid gray;
		border-radius: 15rpx;
		font-size: 30rpx;
	}
</style>