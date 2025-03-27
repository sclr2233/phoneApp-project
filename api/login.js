
//用户名密码登录
export function loginByJson( { username, password }, headers = {} ){
	
	return uni.request({
		url:'http://127.0.0.1:5001/loginByJson',
		method:'post',
		data:{ username, password },
		header: {
			'Content-Type': 'application/json',
			...headers		
		}
		 // 确保数据被正确序列化为 JSON 字符串
	}).then(response => {
		// 处理响应
		if (response.statusCode === 200) {					
			return response.data;
		} else {
			throw new Error('Login failed');
		}
	}).catch(error => {
		// 处理错误
		console.error('Login error:', error);
		throw error;
	});
}
			

