// 'use strict';
// exports.main = async (event, context) => {
// 	//event为客户端上传的参数
// 	console.log('event : ', event)
// 	const res = await uniCloud.getPhoneNumber({
// 		appid: '__UNI__187DCD3', 
// 		provider: 'univerify',
// 		access_token: event.access_token,
// 		openid: event.openid
// 	})
// 	console.log('res : ', res)
// 	//返回数据给客户端
// 	return res
// };



'use strict';
exports.main = async (event, context) => {
    console.log('event : ', event);
		let obj = event.body ? JSON.parse(event.body):event
    try {
			const res = await uniCloud.getPhoneNumber({
				appid: '__UNI__187DCD3',
				provider: 'univerify',
				access_token: obj.access_token,
				openid: obj.openid
			});
			console.log('res : ', res);
			return res;
    } catch (err) {
			console.error('获取电话号码失败：', err);
			return {
				success: false,
				message: '获取电话号码失败',
				error: err
			};
    }
};
