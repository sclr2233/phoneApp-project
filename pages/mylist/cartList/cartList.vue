<template>
	<view class="section">
		<view class="title">课程库</view>
		<view class='shopping-cart'>
			<view class="cart-header">
				<view class="header-item">
					<checkbox :checked="isAllSelected" @change="toggleSelectAll" /> 全选
				</view>
				<view class="header-item">课程</view>
				<view class="header-item">价格</view>
				<view class="header-item">数量</view>
				<view class="header-item">操作</view>
			</view>

			<view v-for="(item, index) in cartList" :key="index" class="cart-item">
				<view class="select-item">
					<checkbox :checked="item.selected" @change="toggleSelectItem(index)" />
				</view>
				<view class='product-image'>
					<image :src='item.picture'></image>
				</view>
				<view class='product-info'>
					<text>{{ item.name }}</text>
					<text class="price">￥{{ item.price }}</text>
					<view class="quantity-control">
						<button @click="decreaseQuantity(index)">-</button>
						<text>{{ item.quantity }}</text>
						<button @click="increaseQuantity(index)">+</button>
					</view>
				</view>
				<button @click="removeFromCart(index)">删除</button>
			</view>
		</view>
		<view class="order-total">总计: ￥{{ selectedTotalPrice }}</view>
		<button @click="goToPay">去支付</button> <!-- 添加去支付按钮 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cartList: [], // 购物车列表
				//const userId = this.$store.state.user.id;
			};
		},
		computed: {
			// 计算购物车总价
			// totalPrice() {
			//   return this.cartList.reduce((total, item) => total + item.price * item.quantity, 0);
			// },
			//计算选中课程的总价
			selectedTotalPrice() {
				return this.cartList.reduce((total, item) => {
					return item.selected ? total + item.price * item.quantity : total;
				}, 0);
			},
			isAllSelected() {
				return this.cartList.every(item => item.selected);
			}
		},
		async mounted() {
			// 获取购物车和订单数据
			await this.fetchCartList();

		},
		methods: {
			// 获取购物车列表
			async fetchCartList() {
				const res = await uni.request({
					url: 'http://127.0.0.1:5002/api/cartlist',
					method: 'GET',
					header: {
						'Authorization': 'Bearer ' + uni.getStorageSync('token'), // 假设用户登录后 token 存储在本地
					},
				});
				//this.cartList = res.data.data;
				this.cartList = res.data.data.map(item => ({
					...item,
					id: item.id,
					courseId: item.course_id,
					name: item.course_name,
					price: parseFloat(item.course_price),
					quantity: parseInt(item.course_quantity),
					picture: item.course_picture,
					selected: false // 默认未选中
				}));
			},
			async removeFromCart(index) {
				const item = this.cartList[index];
				await uni.request({
					url: `http://127.0.0.1:5002/api/cart/remove/${item.id}`,
					method: 'DELETE',
					header: {
						'Authorization': 'Bearer ' + uni.getStorageSync('token'),
					},
				});
				this.cartList.splice(index, 1); // 从本地列表中移除
			}
		},

		// 全选/取消全选
		toggleSelectAll(e) {
			const isSelected = e.detail.value;
			this.cartList.forEach(item => {
				item.selected = isSelected;
			});
		},
		// 单选/取消单选
		toggleSelectItem(index) {
			this.cartList[index].selected = !this.cartList[index].selected;
		},

		// 增加课程数量
		increaseQuantity(index) {
			this.cartList[index].quantity += 1;
		},
		// 减少课程数量
		decreaseQuantity(index) {
			if (this.cartList[index].quantity > 1) {
				this.cartList[index].quantity -= 1;
			}
		},

		async goToPay() {
			const selectedItems = this.cartList.filter(item => item.selected);
			if (selectedItems.length === 0) {
				uni.showToast({
					title: '请选择至少一个课程',
					icon: 'none',
				});
				return;
			}

			// 生成订单

			const orderRes = await uni.request({
				url: 'http://127.0.0.1:5002/api/createOrder',
				method: 'POST',
				header: {
					'Authorization': 'Bearer ' + uni.getStorageSync('token'),
				},
				data: {
					user_id: this.$store.state.userInfo.id,
					items: selectedItems, // 传递购物车中的课程项
					totalPrice: this.selectedTotalPrice, // 传递总价
				},
			});
			const orderId = orderRes.data.order_id;
			const payRes = await uni.request({
				url: `http://127.0.0.1:5002/api/getPaymentParams/${orderId}`,
				method: 'GET',
				header: {
					'Authorization': 'Bearer ' + uni.getStorageSync('token'),
				},
			});

			const paymentParams = payRes.data; // 获取支付参数

			// 调用支付接口
			uni.requestPayment({
				provider: paymentParams.provider, // 支付提供商，如 'wxpay' 或 'alipay'
				orderInfo: paymentParams.orderInfo, // 支付订单信息
				success: (res) => {
					// 支付成功
					uni.showToast({
						title: '支付成功',
						icon: 'success',
					});

					uni.request({
						url: 'http://your-flask-server/add_to_my_courses',
						method: 'POST',
						data: {
							user_id: this.$store.state.userInfo.id, // 当前用户的 ID
							order_id: paymentParams.orderInfo.orderId // 支付的订单 ID
						},
						success: (res) => {
							if (res.data.status === 'success') {
								console.log('Courses added to my courses successfully');
								uni.showToast({
									title: '已成功加入 我的课程',
								});
							} else {
								console.error('Failed to add courses to my courses:', res.data
									.message);
							}
						},
						fail: (err) => {
							console.error('Request failed:', err);
						}
					})
				},
				fail: (err) => {
					// 支付失败
					uni.showToast({
						title: '支付失败',
						icon: 'none',
					});
				},
			});
		}
	
	}
</script>

<style lang='scss'>
	.section {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
		margin-bottom: 20px;

		.title {
			font-size: 18px;
			font-weight: bold;
			margin-left: 100rpx;
			margin-bottom: 10px;
		}

		.shopping-cart {
			display: flex;
			flex-direction: column;
			align-content: space-between;
			box-sizing: border-box;
			width: 100%;
			padding-bottom: 30rpx;

			.cart-header {
				display: flex;
				justify-content: space-between;
				padding: 10px 0;
				border-bottom: 1px solid #eee;

				.header-item {
					flex: 1;
					text-align: center;
				}
			}

			.cart-item {
				display: flex;
				flex-direction: row;
				box-sizing: border-box;
				align-items: center;
				justify-content: space-between;
				padding: 10px;
				border-bottom: 1px solid #eee;

				.select-item {
					flex: 0.1;
					text-align: center;
				}

				.product-image {
					box-sizing: border-box;
					width: 30%;
					height: 100rpx;

					image {
						display: flex;
						width: 100%;
						height: 100%;
					}
				}

				.product-info {
					display: flex;
					flex-direction: row;
					box-sizing: border-box;
					width: 50%;
					height: 100%;

					text {
						justify-content: flex-end;
						align-items: center;
						font-size: 20rpx;
						color: black;
					}

					.price {
						color: #f40;
						margin: 5px 0;
					}

					.quantity-control {
						display: flex;
						align-items: center;

						button {
							width: 30px;
							height: 30px;
							line-height: 30px;
							text-align: center;
							border: 1px solid #ddd;
							background-color: #f8f8f8;
						}

						text {
							margin: 0 10px;
						}
					}
				}

				button {
					align-items: center;
					font-size: 20rpx;
					background-color: blue;
				}
			}
		}

		.order-total {
			display: flex;
			box-sizing: border-box;
			flex-direction: row;
			justify-content: flex-end;
			width: 100%;
			height: 30rpx;
			padding-right: 50rpx;
			margin-bottom: 50rpx;
		}
	}
</style>