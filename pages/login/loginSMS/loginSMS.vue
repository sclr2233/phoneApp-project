<template>
	<view class='login'>
		<view>
			<u-navbar :autoBack="true" bgColor='rgba(245,245,245,0.39)'></u-navbar>
		</view>
		<view class='login-main'>
			<view class='login-img'>
				<image src="@/static/logo.png" mode=""></image>
				<text>手机号登录</text>
			</view>
			<view class="login-text">首次登录手机号将在验证后生成新账号</view>
			<view class='login-phone'>
				<input type="tel" placeholder="请输入手机号" v-model='phone'>
			</view>
			
			<view class='code-box'>
				<view class='code-main'>
				    <input class='main-input' type="code" placeholder="请输入4位验证码" v-model="valCode" :maxlength="4"/>
				</view>	
				<view class='code-btn'>
				    <button @click='sendSMSCode' :disabled="isSendBtn" :class="{ active: !isSendBtn }">{{ buttonText }}</button>				
				</view>					
				
				<!-- <view class='code-num'>
					<up-code-input class='code-input' v-model="valCode" :maxlength="6"></up-code-input>
				</view>	 -->
			</view>
			
			<view class='login-btn'>
				<button @click='login' :disabled="isLoginBtn" :class="{ active: !isLoginBtn }">登录</button>
			</view>
			<view class='login-msg'>
				<up-checkbox-group class="checkbox-group" v-model="value" @change='checkBtn'>
					<up-checkbox class="custom-checkbox" shape="circle" name="agree"></up-checkbox>
					<view class='msg-text'>
						我已阅读并同意 <navigator class='link-text' url='/pages/text/terms/terms'>服务条款</navigator> 和 
					    <navigator class='link-text' url='/pages/text/privacy/privacy'>隐私政策</navigator>
					</view>
				</up-checkbox-group>				
			</view>
			
			<view class="qrcode-container">
				<view class="image-container">
					<image :src="wechatQrcode" mode="aspectFit" @click="getWechatQrcode" />
					<text>微信登录</text>
				</view>	
				<view class="image-container">	
					<image :src="alipayQrcode" mode="aspectFit" @click="getAlipayQrcode" />
					<text>支付宝登录</text>
				</view>	
			</view>
			
			<captcha-modal v-if="showCaptcha" @submit="handleCaptchaSubmit" @close="showCaptcha = false" />
						
			<view class='link-account' @click="switchLogin">使用账户登录</view>
		</view>
	</view>
</template>

<script>

import { sendCode , loginByMobile  } from '@/api/netease.js';
import { Encrypt } from '@/utils/aes.js';
// import upCheckbox from "uview-plus/components/u-checkbox/u-checkbox.vue";
// import { UNavbar, UCheckbox, UCheckboxGroup } from 'uview-plus';
// import uCheckbox from 'uview-ui/components/u-checkbox/u-checkbox.vue';
// import uCheckboxGroup from 'uview-ui/components/u-checkbox-group/u-checkbox-group.vue';	
// import { verifyCaptcha } from '@/api/netease.js';
import CaptchaModal from '@/components/CaptchaModal/CaptchaModal.vue';
import { mapActions } from 'vuex';
	
export default{
	data () {
		return {
			value: [],
			phone:'',
			isSendBtn: true,  // 发送验证码按钮状态
			isLoginBtn: true,
			buttonText:'发送验证码',
			valCode: '',
			check:0,
			codeNum: 60,
			timer: null,
			showCaptcha: false,
			captchaVerified: false,
			wechatQrcode:'/static/wechatQrcode.jpeg',
			alipayQrcode: '/static/alipayQrcode.jpeg'			
		}
	},
	components: {
		// UNavbar,
		// UCheckbox,
		// UCheckboxGroup,
		CaptchaModal
	},		
	
	methods:{	
		...mapActions('user', ['updatePhone','updateWechat', 'updateAlipay']),
		
		checkLoginButtonStatus() {
		   this.isLoginBtn = !(this.captchaVerified && this.valCode.length === 4 && this.check);
		},
	    
	    async sendSMSCode() {
	        
			if ( !this.check ) {
				
				uni.showToast({
					title:'请查看服务条款和隐私协议',
					icon:'error'
				});
				return;
			}
			
			const mobile = this.phone;
	        if (!mobile) {
	            console.error("手机号码不能为空");
	            return;
	        }
			       
		    this.showCaptcha = true; // 显示图片验证码弹出窗口
			console.log('showCaptcha:', this.showCaptcha);
		},         
		          // 处理图片验证码提交
		async handleCaptchaSubmit(captchaInput){
			const response = await uni.request({
				url: 'http://127.0.0.1:5001/captcha',
				method: 'POST',
				data: { captcha: captchaInput },
				responseType: 'arraybuffer' ,// 确保请求返回的是二进制数据					
			});
			const arrayBuffer = response;
			const base64 = uni.arrayBufferToBase64(arrayBuffer);
			const imageUrl = 'data:image/png;base64,' + base64;
			console.log('Captcha verification response:', imageUrl);
			
			if (imageUrl) {
				this.showCaptcha = false; // 关闭图片验证码弹出窗口
				this.captchaVerified = true;
				await this.handleCaptchaSuccess(); // 发送短信验证码
			} else {
				uni.showToast({ title: '验证码错误', icon: 'none' });
				this.captchaVerified = false;
			}
		},
		  // 发送短信验证码		        
								
		async handleCaptchaSuccess(){
			try {					
				const response = await sendCode(this.phone);
				console.log("Response:", response);
		
				this.isSendBtn = true;
				this.buttonText = `${this.codeNum}秒后重新获取`;
				this.startCountdown();
			} catch (error) {
				console.error("发送验证码失败:", error);
			}
		},
	
		async startCountdown() {
			if (this.timer) {
				clearInterval(this.timer);
			}
		
			this.codeNum = 60;
			
			this.timer = setInterval(() => {
				this.codeNum--;
				this.buttonText = `${this.codeNum}秒后重新获取`;
				if (this.codeNum <= 0) {
					this.isSendBtn = false;
					this.buttonText = `获取验证码`;
					clearInterval(this.timer);
					this.codeNum = 60;
					
				}
			}, 1000)
		},	
					
		async login(){
			if (!this.isLoginBtn) {				
				this.isLoginBtn = false;
				try{									
					const loginResponse = await loginByMobile( Encrypt(this.phone), this.valCode );
					console.log('loginResponse:', loginResponse);
					if (loginResponse.status_code === '200') {
						//console.log(res.data.accessToken);
						// 登录成功，获取用户详细信息
						const userInfoResponse = await this.getUserInfo(loginResponse.data.accessToken);
						this.updatePhone({phone:loginResponse.data.phone});
						
						uni.navigateTo({
							url:'/pages/tabbar/mine/mine'
						});
			  
					} else {
						uni.showToast({
							title: '登录失败，请检查验证码是否正确',
							icon: 'none'
						});
						this.isLoginBtn = true; // 登录失败时重置按钮状态
					}
				} catch (error) {
					console.error('登录出错:', error);
					uni.showToast({
						title: '登录出错，请重试',
						icon: 'none'
					});
					this.isLoginBtn = true; // 出错时重置按钮状态
				}                
								
			}
	    },
		
		checkBtn( e ){
			this.check = e.length ;
			this.checkLoginButtonStatus();
		},
			
		
		async getWechatQrcode() {
		    try {
				const response = await uniRequest.get('/api/wechat/qrcode');
				this.wechatQrcode = response.data.qrcodeUrl;
				this.pollLoginStatus('wechat', response.data.ticket);
		    } catch (error) {
			    console.error('Failed to get WeChat QR code:', error);
		    }
		},
		
		async getAlipayQrcode() {
		    try {
		        const response = await uniRequest.get('/api/alipay/qrcode');
		        this.alipayQrcode = response.data.qrcodeUrl;
		        this.pollLoginStatus('alipay', response.data.ticket);
		    } catch (error) {
		        console.error('Failed to get Alipay QR code:', error);
		    }
		},
		
		async pollLoginStatus(type, ticket) {
		    const interval = setInterval(async () => {
		        try {
		            const response = await uniRequest.get(`/api/${type}/check_login`, {
		                params: { ticket }
		            });
		            if (response.data.status === 'success') {
		                clearInterval(interval);
		                
						if (type === 'wechat') {
							this.updateWechat({
								name: response.data.userInfo.name,
							    id: response.data.userInfo.id,
							    avatar: response.data.userInfo.avatar
							});
						} else if (type === 'alipay') {
							this.updateAlipay({
								name: response.data.userInfo.name,
								id: response.data.userInfo.id,
								avatar: response.data.userInfo.avatar
							});
						}
						this.handleLoginSuccess(response.data.userInfo);
		            }
		        } catch (error) {
		          console.error('Failed to poll login status:', error);
		          clearInterval(interval);				  
		        }
		    }, 2000);
		},
		
		handleLoginSuccess(userInfo) {
		    uni.showToast({
		        title: '登录成功',
		        icon: 'success'
		    });
		      // 保存用户信息到本地存储
		    uni.setStorageSync('userInfo', userInfo);
		      // 跳转到首页
		    uni.reLaunch({
		        url: '/pages/tabbar/mine/mine'
		    });
		},
		
		// async associateWechat(userId, wechatInfo) {
		//   try {
		//     const response = await uniRequest.post('/api/associate/wechat', {
		//       userId,
		//       wechatInfo
		//     });
		//     if (response.data.success) {
		//       console.log('微信登录信息关联成功');
		//     } else {
		//       console.error('微信登录信息关联失败');
		//     }
		//   } catch (error) {
		//     console.error('微信登录信息关联失败:', error);
		//   }
		// },
		
		// async associateAlipay(userId, alipayInfo) {
		//   try {
		//     const response = await uniRequest.post('/api/associate/alipay', {
		//       userId,
		//       alipayInfo
		//     });
		//     if (response.data.success) {
		//       console.log('支付宝登录信息关联成功');
		//     } else {
		//       console.error('支付宝登录信息关联失败');
		//     }
		//   } catch (error) {
		//     console.error('支付宝登录信息关联失败:', error);
		//   }
		// },
				
		switchLogin(){
			uni.navigateTo({
				url:"/pages/login/loginPWD/loginPWD"
			})
		},		
	},	
			
	watch:{
		phone( newVal,oldVal ){
			let reg = /^1[23456789]\d{9}$/;
			this.isSendBtn = !reg.test( newVal );			
		},
		// 新增：监听验证码输入变化
		valCode(newVal) {
		    this.checkLoginButtonStatus();
		},
		// 新增：监听验证码验证状态
		captchaVerified(newVal) {
		    this.checkLoginButtonStatus();
		}		
	}
};

</script>

<style lang='scss' scoped>
	
.login{
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
	background: rgba(245,245,245,0.39);
	.login-main{
		display:flex;
		flex-direction: column;
		align-items: center;
		margin:0 100rpx;
		.login-img{
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			box-sizing: border-box;
			width:100%;
			height:120rpx;
			margin-top:20rpx;
			image{
				width: 100rpx;
				height: 100rpx;	
			}
			text{
				padding-left: 22rpx;
				font-size: 56rpx;
				font-weight: bold;
				color: #343234;
			}
		}	
		.login-text{
			padding-top:15rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #343234;
			letter-spacing: 2rpx;
			opacity: 0.53;
		}
		.login-phone{
			display: flex;
			width:100%;
			padding-top:55rpx;
			padding-bottom:10rpx;
			border-bottom:2rpx solid #707070;
		}
		.code-box{
			display: flex;
			flex-direction: row;
			box-sizing: border-box;
			
			width:100%;
			margin-top:55rpx;
			margin-bottom: 30rpx;
			border-bottom:2rpx solid #707070;
			.code-main{
				display:flex;
				box-sizing: border-box;
				width:70%;
				height:70rpx;
				
				.main-input{
					color:black;
					font-size:28rpx;
					padding-bottom: 15rpx;
					width:100%;
				}
			}
			.code-btn{
				display:flex;
				justify-content: flex-end;	
				align-items: center;		
				width: 30%;
				height: 70rpx;
				
				button{										
					font-size: 20rpx;
					font-weight: bold;
					
					color: yellow;
					background-color: skyblue;
					
					&.active{
						background-color: #007bff;
						cursor: pointer;
					}
					&:disabled {
						opacity: 0.6;
						cursor: not-allowed;												
					}									
				}
			}
		}	
			/* .code-time{
				display: flex;
				align-items: flex-start;
				
				width: 100%;
				padding-top:33rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #343234;
				opacity: 0.53;
			} */
			/* .code-num{
				display: flex;
				justify-content: center;
				width: 100%;
				padding:20rpx 15rpx;
				.code-input{
					display:flex;
					justify-content: center;
					align-items: center;
					width:100%;
				}
			}
		}	 */

		.login-btn{
		
			box-sizing: border-box;
			width: 100%;
			height: 50rpx;								
			justify-content: center;
			button{
				background-color: #707070;
				padding: 10px 20px;
				font-size: 20rpx;
				font-weight: bold;
				color: #FFFFFF;
				letter-spacing: 8rpx;
				justify-content: center;
				cursor: not-allowed;
				
				&.active{
					background-color: #007bff;
					cursor: pointer;
				}
				&:disabled {
					opacity: 0.6;
					cursor: not-allowed;
					
				}
			}	
		}
		.login-msg{
			display: flex;
			flex-direction: row;
			box-sizing: border-box;
			margin-top:68rpx;
			width:100%;
			justify-content: flex-start;
			.checkbox-group{
				display: flex;
				
				width:100%;				
				justify-content: center;
				align-items: center;
				.custom-checkbox{
					
					justify-content: center;
					align-items: center;
				}
				
				.msg-text{
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					font-size: 24rpx;
					font-weight: 400;
					color: black;
					letter-spacing: 2rpx;
										
					.link-text {
						display: flex;
						color: #0077FF;
						text-decoration: underline;
					}
						
				}
			}
		}
		
		.qrcode-container {
		    display: flex;
			flex-direction: row;
			box-sizing: border-box;
		    justify-content: center;
			width:100%;
		    height: 150rpx;
			margin-top: 10rpx;
			flex-wrap: wrap;
			overflow: hidden;
			
			.image-container{
				display: flex;
				flex-direction: column;
				align-items: center;
				box-sizing: border-box;
				width: 100rpx;
				height: 130rpx;				
			
				image {
					display: flex;
					box-sizing: border-box;
					width: 100rpx;
					height: 100rpx;			
				}
				text {
					display:flex;
					box-sizing: border-box;
					align-content: center;
					justify-content: center;
					width:100rpx;
					height:30rpx;
					font-size: 14rpx;
				}
			}				
		}
		
		.link-account{
			display:flex;
			width:100%;
			margin-top:120rpx;
			background-color: #FFFFFF;			
			justify-content: flex-end;
			font-size: 30rpx;
			text-decoration:underline;
			text-decoration-color:blue;
			text-decoration-thickness:5rpx;
			color:black;			
												
		}
	}
}		

</style>