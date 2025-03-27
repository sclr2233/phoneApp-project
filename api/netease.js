import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5001';

// const APP_KEY = "5e0dd2893b6262ac27f2502493f69da3";
// const APP_SECRET = "b69aa8f528b3";
// const BASE_URL = 'https://api.netease.im';


async function sendRequest(endpoint, data) {   
 //    const curTime = Math.floor(Date.now() / 1000).toString();
	// const nonce = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
 //    const checkSum = CryptoJS.SHA1(APP_SECRET + nonce + curTime).toString(CryptoJS.enc.Hex);

 //    const header = {
 //        "AppKey": APP_KEY,
 //        "Nonce": nonce,
 //        "CurTime": curTime,
 //        "CheckSum": checkSum,	
 //    };
	
	try {
		// const response = await axios.post(`${BASE_URL}/api/${endpoint}`, data,{ 
  //           headers: {
  //           'Content-Type': 'application/json',
		// 	},
		// });	
		const response = await uni.request({
			url: `${BASE_URL}/api/${endpoint}`,
			method: 'POST',
			data: data,
			header: {
				'Content-Type': 'application/json'
			}
		});
		
		return response;
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}

async function sendCode(mobile) {
    //const endpoint = 'sms/sendcode.action';
	const endpoint = 'sms/sendcode';
    const data = {
        "mobile": mobile,
		"templateid": "27167635",
    };
    return await sendRequest(endpoint, data);
}

async function loginByMobile(mobile,code) {
    //const endpoint = 'nimserver/user/loginByMobile.action';
	const endpoint = 'login/mobile';
    const data = {
        mobile,
        code
    };
    return await sendRequest(endpoint, data)
}
 
export {
    sendCode,
    // loginByJson,
    loginByMobile
	
};	

// 2. 验证验证码
// async function verifySMSCode(mobile, code) {
//   const response = await fetch('/api/sms/verifycode', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       mobile: mobile,
//       code: code
//     })
//   });
//   return await response.json();
// }

// // 3. 手机号登录
// async function loginByMobile(mobile, token) {
//   const response = await fetch('/api/loginByMobile', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       mobile: mobile,
//       token: token
//     })
//   });
//   return await response.json();
// }


// 网易易盾滑块验证码接口
// const verifyCaptcha = async () => {
//   const url = 'https://c.dun.163.com/api/v2/verify';
//   const params = {
//     captchaId: 'your_captcha_id',
//     secretId: 'your_secret_id',
//     businessId: 'your_business_id',
//     version: 'v2',
//     nonce: 'random_string',
//     timestamp: Date.now(),
//     user: 'user_identifier',
//     ip: '127.0.0.1',
//     extData: 'optional_data'
//   };

//   try {
//     const response = await request.post(url, params);
//     if (response.data.error === 0) {
//       console.log('验证成功', response.data.result);
//       // 加载滑块验证码 SDK
//       const sdkUrl = response.data.result.sdkUrl;
//       // 这里可以加载 SDK 并显示滑块验证码
//     } else {
//       console.error('验证失败', response.data.msg);
//     }
//   } catch (error) {
//     console.error('请求失败', error);
//   }
// };

// // 调用验证码接口
// export{
// 	verifyCaptcha
// }

    