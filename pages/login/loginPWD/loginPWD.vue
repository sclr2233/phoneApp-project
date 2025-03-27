<template>
	
	<view class='login'>
		<view class='login-content'>
			<view class='login-state'>
				<text>用户名:</text>
				<input type="text" placeholder="请输入您的用户名或手机号" v-model='user.name' @input="updateButtonState" />
			</view>
			<view class='login-pword'>
				<text>密码:</text>
				<input type="password" placeholder="请输入您的密码" v-model='user.pwd' @input="updateButtonState" />
			</view>
			<view class='login-account'>
				<button @click='login' :disabled="isBtn" :class="{ active: !isBtn }">登录</button>
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
			<view class='link-register' @click="toRegister">注册新账户</view>
		</view>	
	</view>
	
</template>
		
<script>
import { loginByJson } from '@/api/login.js';
import { Encrypt } from '@/utils/aes.js';
// import { UCheckbox, UCheckboxGroup } from 'uview-plus';
// import uCheckbox from 'uview-ui/components/u-checkbox/u-checkbox.vue';
// import uCheckboxGroup from 'uview-ui/components/u-checkbox-group/u-checkbox-group.vue';
import { mapActions } from 'vuex';


export default{
	data () {
		return {								
			user:{
				name:'',
				pwd:''
			},			
			isChecked: false,
			isBtn:true,			
		}
	},
	
	components: {
		// UCheckbox,
		// UCheckboxGroup
	},		
	
	methods:{
						
		checkBtn( e ){
			this.isChecked = e.length > 0;
			this.updateButtonState();
		},		
		
		login(){
			
			if (!this.isChecked) {
				uni.showToast({
					title: '请先同意服务条款和隐私政策',
					icon: 'none'
				});
				return;
			}

			if (!this.user.name || !this.user.pwd) {
				uni.showToast({
					title: '请输入用户名和密码',
					icon: 'none'
				});
				return;
			}

			if (this.user.name.length < 3 || this.user.name.length > 11) {
				uni.showToast({
					title: '用户名长度应为3-11位',
					icon: 'none'
				});
				return;
			}

			if (this.user.pwd.length < 3 || this.user.pwd.length > 11) {
				uni.showToast({
					title: '密码长度应为3-11位',
					icon: 'none'
				});
				return;
			}
			
			if (this.user.name && this.user.pwd && this.isChecked) {
				this.isBtn = false;	
				const token = uni.getStorageSync('token');		
						
				loginByJson({									
					username:Encrypt(this.user.name),
					password:Encrypt(this.user.pwd),
				},{
					headers: {
					    'Authorization': token ? 'Bearer ' + token : '' // 如果有 token 就加上，没有就为空
					}																										
				}).then(res=>{
					
					console.log(res.accessToken);
					            // 将返回的 token 存储到本地
					uni.setStorageSync('token', res.accessToken); // 或者 localStorage.setItem('token', res.accessToken)
                    // 更新 Vuex 中的用户信息
					this.$store.dispatch('user/updateUserInfo', {
					  id: this.user.id,
					  username: this.user.username,
					  avatar: this.user.userAvatar,
					  nickname: this.user.nickname,
					  membership: this.user.membership
					});
					
					uni.showToast({
						title:'登录成功',
						icon:'success',
					})
					//返回我的页面
					uni.switchTab({
						url:'/pages/tabbar/mine/mine'
					})
				}).catch(error => {
					uni.showToast({
						title: '登录失败',
						icon: 'none'
					});
					this.isBtn = true; // 恢复登录按钮
				})	
			}
		},
		
		updateButtonState() {
		    this.isBtn = !(this.user.name && this.user.pwd && this.isChecked);
		},
		
		toRegister(){
			uni.navigateTo({
				url:"/pages/register/register"
			})
		}
		
	}	
}
</script>

<style lang='scss' scoped>
	
.login{
	display: flex;
	flex-direction: column;
	align-items: center;
	width:100%;
	height:100%;
	
	.login-content{
		display:flex;
		flex-direction:column;
		box-sizing: border-box;			
		width:100%;
		height:100%;		
		padding:0 100rpx;
		.login-state{
			display: flex;
			box-sizing: border-box;
			width:100%;
			height:60rpx;
			margin-top:150rpx;
			flex-direction: row;
			justify-content: flex-start;				
			border-bottom:2rpx solid #707070;
			text{
				display: flex;
				box-sizing: border-box;
				width:30%;
				height:60rpx;
				font-size: 30rpx;
				padding:15rpx 15rpx;
				color:black;
			}
			input{
				display: flex;
				box-sizing: border-box;
				width:70%;
				height:60rpx;
				font-size: 20rpx;
				padding-bottom: 5rpx;
				color:black;
			}
		}	
		.login-pword{
			display: flex;
			box-sizing: border-box;
			width:100%;
			height:60rpx;
			margin-top: 30rpx;
			flex-direction: row;
			justify-content: flex-start;				
			border-bottom:2rpx solid #707070;	
						
			text{
				display: flex;
				box-sizing: border-box;
				width:30%;
				height:60rpx;
				font-size: 30rpx;
				padding:15rpx 15rpx;
				color:black;
			}				
			input{
				display: flex;
				box-sizing: border-box;
				width:70%;
				height:60rpx;
				font-size: 20rpx;
				padding-bottom: 5rpx;
				color:black;
			}
		}
		.login-account{
			display: flex;
			box-sizing: border-box;
			width:100%;
			height:50rpx;
			margin-top:60rpx;
			justify-content: center;
			
			button{
				
				width:100%;
				height:50rpx;
				justify-content: center;
				align-items: center;
				font-size: 20rpx;
				color:black;
				background-color: #707070;
				
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
			flex-wrap: nowrap;
			justify-content: flex-start;		
			box-sizing: border-box;
			width:100%;
			margin-top:50rpx;				
			.checkbox-group{
				display: flex;
				flex-direction: row;				
				justify-content: flex-start;
				align-items: center;
				width:100%;				
				.custom-checkbox{
					
					justify-content: center;
					align-items: center;
				}
				
				.msg-text{
					display: flex;
					font-size: 24rpx;
					font-weight: 400;
					color: black;
					letter-spacing: 2rpx;
					white-space: nowrap;
					.link-text{
						color:#0077FF;
						text-decoration: underline;
					}	
				}
			}
		}
		
		.link-register{
			display:flex;
			box-sizing: border-box;
			width:100%;
			margin-top:100rpx;			
			background-color: #FFFFFF;
			justify-content: flex-end;
			font-size: 30rpx;
			color:black;			
												
		}
			
	}
}	



</style>	
	
	

