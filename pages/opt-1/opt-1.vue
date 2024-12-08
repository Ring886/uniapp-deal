<template>
	<view>
		<view style="padding: 20rpx;">
			<textarea v-model="description" type="text" class="input" placeholder="请输入描述(物品描述,新旧程度,联系方式等)"/>
		</view>
		<view class="images">
			<image 
				v-for="(img, index) in previewArr"
        :key="img"
        :src="img" mode="aspectFill" class="image" @longpress="longpress(index)"
			/>
			<view class="addImage" @click="chooseImages">
				<img src="../../static/加号.png" class="icon" />
			</view>
		</view>
		<button class="submit" @click="debouncedSubmitImages" :disabled="broken">提交</button>
		
	</view> 
</template>

<script setup>
	import {ref, computed} from 'vue'
	import {onShow} from '@dcloudio/uni-app'
	const imageArr = ref([])
	const previewArr = ref([])
	const description = ref('')
	
	
	const noImage = () => previewArr.value.length === 0
	const noText = () => description.value.trim() === ''
	const broken = computed(() => noImage() || noText());
	
	
	
	function useDebounce(fn, delay) {
	  const timeout = ref(null);
	  return function(...args) {
	    if (timeout.value) clearTimeout(timeout.value);
	    timeout.value = setTimeout(() => {
	      fn(...args);
	    }, delay);
	  };
	}
	
	
	
	// 修改后的 chooseImages 方法，加入压缩步骤
	const chooseImages = () => {
	  uni.chooseImage({
	    count: 1,  // 最多可以选择9张图片
	    success: (res) => {
	      const tempFilePaths = res.tempFilePaths;
	      tempFilePaths.forEach(filePath => {
	        compressAndUploadImage(filePath);
	      });
	    },
			fail: err => {
				console.error('选择图片失败')
			}
	  });
	};
	
	// 使用 uni.compressImage 进行图片压缩并上传
	const compressAndUploadImage = (filePath) => {
	  uni.compressImage({
	    src: filePath,  // 图片的路径
	    quality: 10,  // 压缩质量，0-100，数字越小，压缩率越高
	    success: (res) => {
				previewArr.value.push(res.tempFilePath)
	      // uploadImage(res.tempFilePath);
	    },
	    fail: (err) => {
	      console.error('压缩失败:', err);
	    }
	  });
	};
	
	// 上传图片
	const uploadImage = (filePath) => {
	  return new Promise((resolve, reject) => {
	    uni.uploadFile({
	      url: 'https://dwdeal.cn/item/upload',  // 后端的上传接口
	      filePath: filePath,
	      name: 'file',
	      success: (uploadRes) => {
	        const data = JSON.parse(uploadRes.data);
	        if (data.filePath) {
	          resolve(`https://dwdeal.cn/${data.filePath}`);
	        } else {
	          reject('文件路径不存在');
	        }
	      },
	      fail: (err) => {
	        console.error('上传失败:', err);
	        reject(err);
	      }
	    });
	  });
	};
	
	// 提交图片URL数组
	const submitImages = async() => {
		uni.showLoading({
			title: '加载中'
		})
	  if (previewArr.value.length > 0) {
			imageArr.value.push(...previewArr.value)
			// imageArr.value = previewArr.value
			for (let i = 0; i < imageArr.value.length; i++) {
			  imageArr.value[i] = await uploadImage(imageArr.value[i]);
			}
			console.log(imageArr.value)
			const id = ref(uni.getStorageSync('success'))
	    uni.request({
	      url: 'https://dwdeal.cn/item/submit',
	      method: 'POST',
	      data: {
					name: id.value[0],	
					id: id.value[2],
					detail: description.value,
	        images: imageArr.value,
					views: 0,
					date: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' ,  hour12: false})
	      },
	      success: (res) => {
	        uni.showToast({
	        	title: '发布成功!',
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
	    });
	  } else {
	    console.warn('请选择图片');
	  }
		uni.hideLoading()
	};
	
	
	const debouncedSubmitImages = useDebounce(submitImages, 1000);
	
	
	function longpress(index) {
		uni.showActionSheet({
			itemList: ['删除'],
			success: function (res) {
				previewArr.value.splice(index, 1);
			},
			fail: function (res) {
				console.log(res.errMsg);
			}
		});
	}
	onShow(() => {
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
	
</script>

<style lang="scss" scoped>
	.input{
		width: 100%;
		height: 400rpx;
	}
	.images{
		width: 100%;
		// height: 700rpx;
		display: flex;
		flex-wrap: wrap;
		padding: 0 20rpx;
		
		.image{
			width: 230rpx;
			height: 230rpx;
		}
		.addImage{
			width: 230rpx;
			height: 230rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 1px solid lightgray;
			.icon{
				width: 30%;
				height: 30%;
			}
		}
		
	}
	.submit{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 50rpx;
		background-color: palegreen;
		border-radius: 10rpx;
		font-size: 30rpx;
		color: white;
	}
	
</style>
