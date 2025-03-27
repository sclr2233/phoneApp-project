<template>
	<view class='me'>
		<view class='me-header'>
			<view class='me-header-config'>
				<image src='@/static/shaoma.png'></image>
				<image src='@/static/config.png'></image>
			</view>
			<view class='me-header-nick'>
				<view class='me-image'>
					<image v-if="!userInfo|| !userInfo.username" src="@/static/avatar.png" mode="aspectFit"></image>
					<image v-if="userInfo && userInfo.userAvatar" :src="userInfo.userAvatar" mode="aspectFit"></image>
					<image v-if="userInfo && userInfo.wechat && userInfo.wechat.avatar" :src="userInfo.wechat.avatar"
						mode="aspectFit"></image>
					<image v-if="userInfo && userInfo.alipay && userInfo.alipay.avatar" :src="userInfo.alipay.avatar"
						mode="aspectFit"></image>
				</view>
				<view class='me-login' v-if="!userInfo || !userInfo.username">
					<view class='me-login-text' @tap='navigateToLogin'>点击登录</view>
					<view class='me-login-msg'>登录同步数据，学习更安心</view>
				</view>
				<view class="userInformation" v-if="userInfo && userInfo.username">
					<text v-if="userInfo.username">{{ userInfo.username }}</text>
					<text v-if="userInfo.nickname">{{ userInfo.nickname }}</text>
					<!-- <text>{{ userInfo.isMember ? '会员' : '非会员' }}</text> -->
					<text v-if="userInfo.phone">手机号: {{ userInfo.phone }}</text>
					<text v-if="userInfo.wechat.name">微信用户名: {{ userInfo.wechat.name }}</text>
					<text v-if="userInfo.alipay.name">支付宝用户名: {{ userInfo.alipay.name }}</text>
					<template v-if="userInfo.isMember === true">
						<text v-if="expiryDate">您的会员到期时间：{{ expiryDate }}</text>
						<text v-if="timeRemaining">距离到期还有：{{ timeRemaining }}</text>
					</template>
					<template v-else>
						<text>您还不是会员</text>
					</template>
				</view>
			</view>
			<view class='me-header-vip'>
				<view class='me-vip'>
					<image src="@/static/vip.png" mode=""></image>
					<text>VIP会员</text>
				</view>
				<view class='me-vip-text'>
					<text>开通小鹿线学习平台</text>
					<text>VIP会员尽享优质课程</text>
				</view>
				<view class='me-vip-button'>
					<text>立即开通</text>
				</view>
			</view>
		</view>
		<view class='me-container'>
			<view class='list-item' name='cartlist'>
				<view class='list-l'>
					<u-icon name="photo" size='16'></u-icon>
					<text @tap='goToCart'>我的购物车</text>
				</view>
				<view class='list-r'>
					<u-icon name="arrow-right" size='16'></u-icon>
				</view>
			</view>
			<view class='list-item' name='orderlist'>
				<view class='list-l'>
					<u-icon name="photo" size='16'></u-icon>
					<text @tap='goToOrder'>我的订单</text>
				</view>
				<view class='list-r'>
					<u-icon name="arrow-right" size='16'></u-icon>
				</view>
			</view>
			<view class='list-item' name='mineMoney'>
				<view class='list-l'>
					<u-icon name="photo" size='16'></u-icon>
					<text @tap='goToPerform'>我的演出</text>
				</view>
				<view class='list-r'>
					<u-icon name="arrow-right" size='16'></u-icon>
				</view>
			</view>


			<view class='list-item' name='me-about'>
				<view class='list-l'>
					<u-icon name="photo" size='16'></u-icon>
					<text @tap='aboutUs'>关于我们</text>
				</view>
				<view class='list-r'>
					<u-icon name="arrow-right" size='16'></u-icon>
				</view>
			</view>
			<view class='list-item' name='me-out'>
				<view class='list-l'>
					<u-icon name="photo" size='16'></u-icon>
					<text @tap='loginOut'>退出登录</text>
				</view>
				<view class='list-r'>
					<u-icon name="arrow-right" size='16'></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';


	export default {
		data() {
			return {
				userInfo: {},
				list: [],
				timeRemaining: '',

			}
		},

		mounted() {
			if (this.expiryDate) {
				this.startCountdown();
			}
		},

		computed: {
			...mapState('user', ['userInfo']),
			isMember() {
				return this.userInfo?.membership;
			},
			expiryDate() {
				return this.userInfo?.membershipExpiry;
			},
			timeRemaining() {
				return this.userInfo?.timeRemaining;
			},
			// userAvatar() {
			//   // 如果用户已登录且头像存在，则使用用户头像，否则使用默认头像
			//   return this.user.isLoggedIn && this.user.avatar ? this.user.avatar : require('@/static/avatar.png');
			// },
			userAvatar() {
				return this.userInfo?.userAvatar || require('@/static/avatar.png');
			},
		},

		methods: {

			startCountdown() {

				if (!this.expiryDate) {
					console.error('expiryDate is not defined');
					return;
				}

				const expiry = new Date(this.expiryDate);
				const updateCountdown = () => {
					const now = new Date();
					const diff = expiry - now;

					if (diff <= 0) {
						this.$store.commit('setTimeRemaining', '会员已到期');
						clearInterval(this.interval);
						return;
					}
					const days = Math.floor(diff / (1000 * 60 * 60 * 24));
					const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
					const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
					const seconds = Math.floor((diff % (1000 * 60)) / 1000);

					this.$store.commit('setTimeRemaining', `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`);
				}
				updateCountdown();
				this.interval = setInterval(updateCountdown, 1000);
			},

			navigateToLogin() {

				uni.navigateTo({
					url: "/pages/login/loginSMS/loginSMS"
				})
			},

			goToCart() {
				uni.navigateTo({
					url: "/pages/mylist/cartList/cartList"
				})
			},
			goToOrder() {
				uni.navigateTo({
					url: "/pages/mylist/mycourse/mycourse"
				})
			},
			goToMoney() {
				uni.navigateTo({
					url: "/pages/mylist/mymoney/mymoney"
				})
			},
			aboutUs() {
				uni.navigateTo({
					url: "/pages/mylist/aboutUS/aboutUS"
				})
			}

		},
		onShow() {
			// 在页面显示时，手动更新用户信息
			this.$store.dispatch('user/updateUserInfo', this.$store.state.user.userInfo);
		},
		beforeDestroy() {
			clearInterval(this.interval);
		}
	}
</script>

<style lang='scss'>
	.me {
		display: flex;
		flex-direction: column;
		position: absolute;
		width: 100%;
		height: 100%;
		background: rgba(245, 245, 245, 0.39);
		overflow: hidden;

		.me-header {
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			width: 100%;
			padding: 0 50rpx;

			.me-header-config {
				display: flex;
				flex-direction: row-reverse;
				padding: 28rpx 0;

				image {
					width: 42rpx;
					height: 42rpx;
				}

				image:first-child {
					margin-left: 49rpx;
					margin-right: 39rpx;
				}
			}

			.me-header-nick {
				display: flex;
				flex-direction: row;
				box-sizing: border-box;
				width: 100%;
				justify-content: flex-start;
				padding: 0;

				.me-image {
					display: flex;
					box-sizing: border-box;

					image {
						box-sizing: border-box;
						width: 108rpx;
						height: 108rpx;
						border-radius: 50%;
					}
				}

				.me-login {
					display: flex;
					box-sizing: border-box;
					flex-direction: column;

					.me-login-text {
						font-size: 38rpx;
						font-weight: bold;
						color: #343234;
					}

					.me-login-msg {
						font-size: 24rpx;
						font-weight: 400;
						color: #919294;
						padding-top: 10rpx;
					}
				}

				.userInformation {
					display: flex;
					flex-direction: column;

					text {
						font-size: 20rpx;
						font-weight: 400;
						color: #919294;
					}

					template {
						display: flex;
						flex-direction: column;

						text {
							font-size: 20rpx;
							font-weight: 400;
							color: #919294;
						}
					}
				}
			}

			.me-header-vip {
				display: flex;
				justify-content: space-around;
				align-items: center;
				height: 167rpx;
				margin: 35rpx 32rpx;
				background: url('@/static/my-bg.jpeg');
				background-size: 100% 100%;

				.me-vip {
					display: flex;
					flex-direction: column;
					align-items: center;
					position: relative;

					image {
						display: flex;
						width: 79rpx;
						height: 57rpx;
					}

					text {
						display: flex;
						margin-top: 10rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #FFFFFF;
					}
				}

				.me-vip:after {
					content: '';
					position: absolute;
					right: -25rpx;
					top: 50%;
					margin-top: -29rpx;
					width: 4rpx;
					height: 58rpx;
					background-color: #fff;
				}

				.me-vip-text {
					display: flex;
					flex-direction: column;
					margin-left: 20rpx;

					text {
						font-size: 24rpx;
						font-weight: 400;
						color: #FFFFFF;
					}
				}

				.me-vip-button {
					width: 163rpx;
					height: 58rpx;
					text-align: center;
					line-height: 58rpx;
					background: url('@/static/vip-button.png') no-repeat;
					background-size: 100% 100%;

					.text {
						font-size: 20rpx;
						color: #211F37;
					}
				}

			}
		}

		.me-container {
			display: flex;
			flex-direction: column;
			align-content: space-between;
			box-sizing: border-box;
			width: 100%;
			padding: 30rpx 60rpx;

			.list-item {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				box-sizing: border-box;
				width: 100%;
				height: 80rpx;
				border-bottom: 3rpx solid black;
				padding: 0 50rpx;

				.list-l {
					display: flex;
					padding: 15rpx 0;

					text {
						padding-left: 24rpx;
						font-size: 28rpx;
						color: #333333;
					}
				}

				.list-r {
					padding: 15rpx 30rpx;
				}
			}
		}
	}
</style>