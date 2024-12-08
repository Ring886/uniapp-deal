<template>
	<view>
		<button type="primary" @click="req">点我发送最简单的一个请求</button>
		<!-- html部分,仅为示例 -->
		<button @click="login">键登录</button>
		<button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber"></button>
	</view>
</template>

<script setup>
	import { onLoad, onShow, onHide } from '@dcloudio/uni-app'
	import { ref } from 'vue'
	const code = ref('')

	onLoad(async() => {
		// const res = await wx.login()
		// code.value = res.code
	})
	
	// const appid = 'wxc6183a82a1032d75'
	// const secret = '13039772c20db7fc265a88505267e2db'
	const grant_type = 'authorization_code'
	
	// const req = () => {
	// 	uni.request({
	// 		url: 'http://localhost:4000/send',
	// 		method: 'POST',
	// 		success: res => {
	// 			console.log(res.data.text);
	// 		},
	// 		fail: err => {
	// 			console.log(err)
	// 		},
	// 		complete: () => {
	// 			uni.hideLoading()
	// 		}
	// 	})
	// }
	const req = () => {
		uni.request({
			url: 'https://dwdeal.cn/connectDB',
			header:{'content-type':'application/x-www-form-urlencoded'},
			method: 'POST',
			success: res => {
				console.log(res.data.collections);
			},
			fail: err => {
				console.log(err)
			},
			complete: () => {
				uni.hideLoading()
			}
		})
	}


	
	// const login = () => {
	// 	let js_code = ''
	// 	uni.login({
	// 		provider: 'weixin', 
	// 		success: function (res) {
	// 			console.log(res)
	// 			js_code = res.code
	// 			// let url = "https://api.weixin.qq.com/sns/jscode2session?appid="+appid+"&secret="+secret+"&js_code="+js_code+"&grant_type=authorization_code"
	// 			console.log(js_code)
	// 			uni.request({
	// 				url: 'https://api.weixin.qq.com/sns/jscode2session',
	// 				method: 'GET',
	// 				data: {appid, secret, js_code, grant_type},
	// 				success: res => {
	// 					console.log('LOGINres----',res)
	// 					const access_token = res.data.session_key
	// 					const openid = res.data.openid
	// 					uniCloud.callFunction({
	// 						name: 'getPhoneNumber',
	// 						data: {
	// 							'access_token' : access_token,
	// 							'openid': openid
	// 							// access_token : res.data,
	// 							// openid: res.data
	// 							// access_token : "nn5IV39y3bDh2+U5OWX2qg==",
	// 							// openid: "oOD5K6vXyu8So5VHLTuTTxp4iZKU"
	// 						}
	// 					}).then(r => {
	// 						console.log('LOGINr----',r);
	// 					}).catch(err => {
	// 						console.log('err----',err);
	// 					})
	// 				},
	// 				fail: err => {
	// 					console.log('请求后端出错')
	// 					console.log(err)
	// 				}
	// 			})
	// 		},
	// 		fail: function(err) {
	// 			console.log('err',err);
	// 		}
	// 	})
	// }
	
	// function getPhoneNumber (e) {
 //    console.log(e.detail.code)  // 动态令牌
 //    console.log(e.detail.errMsg) // 回调信息（成功失败都会返回）
 //    console.log(e.detail.errno)  // 错误码（失败时返回）
 //  }
</script>

<style lang="scss" scoped>

</style>
