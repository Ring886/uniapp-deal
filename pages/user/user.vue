<template>
	<view>
		<view class="container1">
			<view class="circle">
				<image :src="admin[1]" class="img" @click="changeFile" mode="aspectFill"/>
			</view>
			<text class="text"> {{admin[0]}} </text>
			<button class="submit" @click="logOut">退出登录</button>
		</view>
		<view class="container2">
			<uni-collapse ref="collapse" v-model="value">
				<uni-collapse-item title="我发布的">
					<myItem v-for="img in myItems" :key="img.id" :src="img.src" :views="img.views" :detail="img.detail" :date="img.date" :id="img.id" :_id="img._id"/>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		 <!-- 弹出层 -->
		<uni-popup ref="popupRef" type="center">
			<view class="popup-content">
				<!-- 输入框 -->
				<input type="text" v-model="inputValue" placeholder="请输入昵称" />

				<!-- 按钮组 -->
				<view class="button-group">
					<button @click="cancel">取消</button>
					<button @click="submitInput">提交</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	import {onShow, onLoad, onPullDownRefresh} from '@dcloudio/uni-app'
	import myItem from '../../components/my-applied/my-applied.vue'
	
	// const avatar = ref('../../static/logo.png')
	// const name = ref('Tanya')
	const admin = ref([])
	const avator = ref('')
	const myItems = ref([])
	
	admin.value = uni.getStorageSync('success');		// 获取nickname
	
	
	function logOut() {
		try {
			uni.removeStorageSync('success');
			uni.redirectTo({
				url: '/pages/user/login'
			})
		} catch (e) {
			console.log('清除缓存失败')
		}
	}
	
	function changeFile() {
		uni.showActionSheet({
			itemList: ['修改头像', '修改昵称'],
			success: function (res) {
				if(res.tapIndex === 0) {
					uni.chooseImage({
					  count: 1,  // 最多可以选择9张图片
					  success: (res) => {
					    compressAndUploadImage(res.tempFilePaths[0]);
					  },
						fail: err => {
							console.error('选择图片失败')
						}
					});
				}
				else {
					showPopup()
				}
			},
			fail: function (res) {
				console.log(res.errMsg);
			}
		});
	}

	
	
	const compressAndUploadImage = (filePath) => {
	  return new Promise((resolve, reject) => {
			uni.compressImage({
			  src: filePath,  // 图片的路径
			  quality: 10,  // 压缩质量，0-100，数字越小，压缩率越高
			  success: (res) => {
					avator.value = res.tempFilePath
			    // uploadImage(res.tempFilePath);
					console.log('压缩成功')
					resolve()
			  },
			  fail: (err) => {
			    console.error('压缩失败:', err);
					reject(e)
			  }
			})
		}).then(() => {
			submitImages()
		}).catch((e) => {
			console.error(e)
		})
	};
	// 上传图片
	const uploadImage = (filePath) => {
		// console.log(filePath)
	  return new Promise((resolve, reject) => {
			uni.uploadFile({
			  url: 'https://dwdeal.cn/uploadAvator',  // 后端的上传接口
			  filePath: filePath,
			  name: 'file',
			  success: (uploadRes) => {
			    const data = JSON.parse(uploadRes.data);
					// console.log(data)
			    if (data.filePath) {
			      resolve(`https://dwdeal.cn/${data.filePath}`)
						// console.log(imageArr.value)
			    } else {
						reject('图片不存在')
					}
			  },
			  fail: (err) => {
			    console.error('上传失败:', err);
			  }
			});
		})
	};
	// 提交图片URL数组
	const submitImages = async() => {
		// console.log('avator.value1', avator.value)
		avator.value = await uploadImage(avator.value);
		// console.log('avator.value2', avator.value)
		// const id = ref(uni.getStorageSync('success'))
		uni.request({
			url: 'https://dwdeal.cn/submitAvator',
			method: 'POST',
			header: {'content-type': 'application/json'},
			data: {
				id: admin.value[2],
				avator: avator.value
			},
			success: (res) => {
				if(res.data.success) {
					return new Promise((resolve, reject) => {
						// uni.showToast({
						// 	title: '修改成功',
						// })
						const id = admin.value[2]
						const name = admin.value[0]
						uni.setStorageSync('success', [name, avator.value, id]);
						admin.value = uni.getStorageSync('success');
						resolve()
					}).then(() => {
						uni.showToast({
							title: '修改成功',
						})
					}).catch((e) => {
						console.error('服务器超时')
					})
				} else {
					console.err('服务器错误,', res.data.message)
				}
			},
			fail: (err) => {
				console.error('提交失败:', err);
			}
		});
	};
	
	
	
	
	
	// 定义一个引用来访问 popup 实例
	const popupRef = ref(null);
	// 用于绑定输入框的值
	const inputValue = ref('');
	// 打开弹出层
	const showPopup = () => {
	  popupRef.value.open();
	};
	// 取消按钮操作，关闭弹出层
	const cancel = () => {
	  inputValue.value = ''; // 清空输入框内容（可选）
	  popupRef.value.close();
	};
	// 提交输入内容
	const submitInput = () => {
	  console.log('输入的内容:', inputValue.value);
	  // 提交后关闭弹出层
		uni.request({
			url: 'https://dwdeal.cn/changeName',
			method: 'POST',
			header: {'content-type': 'application/json'},
			data: {id: admin.value[2], newName: inputValue.value},
			success: res => {
				if(res.data.success) {
					return new Promise((resolve, reject) => {
						uni.showToast({
							title: '修改成功',
						})
						const id = admin.value[2]
						const avator = admin.value[1]
						uni.setStorageSync('success', [inputValue.value, avator, id]);
						admin.value = uni.getStorageSync('success');
						resolve()
					}).then(() => {
						popupRef.value.close();
					}).catch((e) => {
						console.error('服务器超时')
					})
				} else {
					console.err('服务器错误,', res.data.message)
				}
			},
			fail: err => {
				console.error('修改失败', err)
			}
		})
	};
	
	
	
	
	
	onShow(() => {
		console.log('onLoad')
		try {
			uni.getStorageInfo({
				success: res => {
					if(uni.getStorageSync('success')) {	// 如果有缓存
						console.log('有缓存')
					} else {
						uni.redirectTo({
							url: '/pages/user/login'
						})
					}
				}
			})
		} catch (e) {
			console.log('获取缓存失败')
		}
	})
	
	
	function getSelfItems() {
		return new Promise((resolve, reject) => {
			uni.request({
				url: 'https://dwdeal.cn/getSelfItems',
				method: 'POST',
				header: {'content-type': 'application/json'},
				data: {id: admin.value[2]},
				success: res => {
					console.log('进入了后端')
					if(res.data.success) {
						uni.setStorageSync('myItems', res.data.myItems)
						myItems.value = uni.getStorageSync('myItems')
						console.log(myItems.value)
						resolve();
					} else {
						reject({ message: '服务器错啦', details: res.data.message });
					}
				},
				fail: err => {
					reject({ message: '读取个人发布失败', error: err });
				}
			})
		})
	}
	
	onPullDownRefresh(async() => {
		await getSelfItems()
		uni.stopPullDownRefresh()
	})
	
	onLoad(async() => {
		await getSelfItems()
		
	})
	
	
</script>

<style scoped>
	.container1 {
		display: flex;		
		justify-content: center;
		align-items: center;
		height: 500rpx;
		width: 100%;
		background-color: lightgray;
		flex-direction: column;
	}
	.container2 {
		display: flex;		
		flex-direction: column;
		padding: 30rpx;
	}
	.circle {
		margin-top: 30rpx;
		border: 2px solid black;
		border-radius: 50%;
		width: 200rpx;
		height: 200rpx;
		margin-bottom: 30rpx;
	}
	.img {
		width: 100%;               
		height: 100%;
		object-fit: cover;
		border-radius: 50%;
	}
	
	.text {
		margin-bottom: 30rpx;
	}
	
	
	.popup-content {
	  padding: 20px;
	  text-align: center;
	}
	
	.button-group {
	  display: flex;
	  justify-content: space-between;
	  margin-top: 20px;
	}
	.submit{
		line-height: 50rpx;			/*这个行高的属性解决了文字在按钮不居中显示的问题*/
		border: 2rpx solid gray;
		border-radius: 15rpx;
		font-size: 30rpx;
	}
</style>
