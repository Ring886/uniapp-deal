<template>
	<view class="container">
		<view class="circle">
			<img src="../../static/logo.png" class="img"/>
		</view>
		<view class="input">
			<input type="text" placeholder="请输入账号" v-model="userId"/>
			<input password type="text" placeholder="请输入密码" v-model="password"/>
		</view>
		<button class="submit" @click="submit">提交</button>
		<view @click="signup" class="signup">没有账号? 去注册</view>
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	const userId = ref('')
	const password = ref('')
	
	function check() {
		if(userId.value && password.value) return true
		else return false
	}
	
	function submit() {
		if(check) {
			// const data = {
			//   userId: '727129392',
			//   password: '20040213Zzc'
			// }
			const data = {
			  userId: userId.value,
			  password: password.value
			}
			uni.request({
				url: 'https://dwdeal.cn/login',
				method: 'POST',
				// header:{'content-type':'application/x-www-form-urlencoded'},
				header: {'content-type': 'application/json'},
				data: {userId: userId.value, password: password.value},
				// data: `userId=${encodeURIComponent(userId.value)}&password=${encodeURIComponent(password.value)}`,
				success: res => {	
					if(res.data.success) {
						uni.setStorage({
							key: 'success',
							data: [res.data.name, res.data.avator, userId.value],
							success: function () {
								uni.showToast({
									title: '登陆成功',
									icon: 'success',
									success: res => {
										setTimeout(() => {
											uni.switchTab({
												url: '/pages/index/index'
											})
										}, 2000)
									}
								})
							}
						})
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
						title: '服务器失败',
						icon: 'none'
					})
				}
			})
		} else {
			uni.showToast({
				title: '请填全信息！',
				icon: 'none'
			})
		}
	}
	
	function signup() {
		uni.navigateTo({
			url: '/pages/user/signup'
		})
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
	.circle {
		border: 2px solid black;
		border-radius: 50%;
		width: 200rpx;
		height: 200rpx;
		margin-bottom: 130rpx;
	}
	.img {
		width: 100%;               
		height: 100%;
		object-fit: cover;
		border-radius: 50%;
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
	.signup{
		margin-top: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
