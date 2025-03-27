<template>
	<view class="captcha-modal">
		<view class="captcha-content ttttttt">
			<image :src="captchaImage" mode="widthFix"></image>
			<input type="text" v-model="captchaInput" placeholder="请输入验证码" />
			<view class="captcha-actions">
				<button @click="submitCaptcha">提交</button>
				<button @click="refreshCaptcha">刷新验证码</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				captchaImage: '', // 验证码图片URL
				captchaInput: '', // 用户输入的验证码
			};
		},
		methods: {
			// 获取验证码图片
			 getCaptchaImage() {
				try {
					
					uni.request({
						url: 'http://127.0.0.1:5001/captcha',
						method: 'GET',
						responseType: 'arraybuffer',
						success: (response) => {
							const arrayBuffer = response.data;
							
							const base64 = uni.arrayBufferToBase64(arrayBuffer);
						
							this.captchaImage = 'data:image/png;base64,' + base64;
						}
					});
					
					// const arrayBuffer = response;
					
					// const response = await uni.request({
					// 	url: 'http://127.0.0.1:5001/captcha',
					// 	method: 'GET',
					// 	responseType: 'arraybuffer',
					// });
					// console.log('response：',response);
					// const arrayBuffer = response;
					


					// const base64 = uni.arrayBufferToBase64(arrayBuffer);

					// this.captchaImage = 'data:image/png;base64,' + base64;

				} catch (error) {
					console.error('获取验证码失败:', error);
				}
			},
			// 提交验证码
			submitCaptcha() {
				if (!this.captchaInput) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					});
					return;
				}

				this.$emit('submit', this.captchaInput);
			},
			// 刷新验证码
			refreshCaptcha() {
				this.captchaInput = '';
				this.getCaptchaImage();
			},
		},
		mounted() {
			this.getCaptchaImage();
		},
	};
</script>

<style lang='scss'>
	.captcha-modal {
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 20%;
		left: 20%;
		width: 80%;
		height: 80%;
		background: rgba(0, 0, 0, 0.5);
		justify-content: center;
		align-items: center;

		.captcha-content {
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			width: 60%;
			height: 60%;
			background: whitesmoke;
			opacity: 1;
			border-radius: 10rpx;

			image {
				display: flex;
				box-sizing: border-box;
				width: 100%;
				height: 60%;
				pading: 0 10rpx;
			}

			input {
				display: flex;
				box-sizing: border-box;
				width: 100%;
				height: 20%;
				padding: 0 20rpx;
				font-size: 20rpx;
				border-color: black;
				color: black;
			}

			.captcha-actions {
				display: flex;
				flex-direction: row;
				box-sizing: border-box;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				height: 20%;

				button {
					display: flex;
					width: 150rpx;
					height: 40rpx;
					font-size: 16rpx;
					background-color: skyblue;
				}
			}
		}
	}
</style>