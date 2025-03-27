<template>
	<view class='course-container'>		
		<view class='categories-info' v-for="(category, index) in categories" :key="index">
		    <view class="category-box">
		        <text class="category-title">{{ category.name }}</text>
				<view class='course-box'>
		            <view class="course-item" v-for="course in category.courses" :key="course.id">
						<view class='course-card' :class='item.colors'>
							<view class='course-card-name'>{{ course.name }}</view>
							<view class='course-card-icon'>
								<view class='icon iconfont' :class='item.icon'></view>
							</view>
							<view class='course-card-des'>{{item.text}}</view>
							<view class='course-card-btn'>							    
								<button @click="getMoreInformation">课程详情</button>
								<button @click="addToCart">加入课程库</button>
							</view>	
						</view>	
				    </view>	
		        </view>
		    </view>
		</view>			
	</view>	
</template>

<script>
	export default {
		data() {
			return {

				categories:[],
				
			}
		},
		mounted(){
			uni.request({
				url: 'http://127.0.0.1:5000/api/data1', //仅为示例，并非真实接口地址。
				
				success: (res) => {
					console.log(res.data);
					this.categories = res.data.data.info
					//category.courses = res.data.data.info.courses
				},
				
			})	
		},
		// const user = uni.getStorageSync('user'); // 假设你将用户信息存储在 'user' 键下
		// const userId = user.id;				
		
		methods:{
			getMoreInformation(){
			
				uni.navigateTo({
					url:"/pages/course/courseintroduce/goodcourseInfo?id="+id+"&course="+course
				})
				
			},
			
			async addToCart() {
				try {									
				    const response = await uni.request({
						url: 'http://your-flask-server-url/api/add_to_cart', // 替换为你的Flask服务器地址
						method: 'POST',
						data: {
							course_id: course.id,
							course_name: course.name,
							user_id: this.$store.state.userInfo.id, // 
							course_price: course.price,
							course_picture:	course.picture				
						},
						header: {
							'Content-Type': 'application/json',
						},
					});
			  
					if (response.statusCode === 200) {
						uni.showToast({
							title: '课程已成功加入购物车',
							icon: 'success',
						});
					} else {
						uni.showToast({
							title: '加入购物车失败',
							icon: 'none',
						});
					}
				} catch (error) {
					uni.showToast({
						title: '网络错误，请重试',
						icon: 'none',
				    });
				}
			}
						
		}
	}		
	
</script>

<style lang='scss'>
	@import '@/common/font/iconfont.css';
	
	.course-container{
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		flex-wrap: wrap;
		padding:15px 10px;
		.categories-info{
			display:flex;
			width:100%;
			flex-direction: column;		
			justify-content: center;
			margin-bottom: 15px;
			.category-box{
				box-sizing: border-box;
				width:100%;
				flex-direction: column;		
				justify-content: center;
				
				.category-title{
					width:100%;
					justify-content: center;
					font-size: 35rpx;
				}
				.course-box{
					display:flex;
					flex-direction: row;
					flex-wrap:wrap;
					width:100%;
					
					.course-item{
						display: flex;
						flex-direction: column;
						box-sizing: border-box;
						width:50%;
						height:30%;
						padding:15rpx 15rpx;
						
						.course-card{
							
							flex-flow:column;
							box-sizing: border-box;
							align-items: center;
							width:100%;
							height:100%;
							background-color: #b0def5;
							border-radius: 5px;
							padding:15rpx 15rpx;
							
							.course-card-name{
								align-items: center;
								justify-content: center;
								font-size: 30rpx;
							}
							
							.course-card-icon{
								width:35rpx;
								height:35rpx;
								justify-content: center;
								align-items: center;
								
							}
							.course-card-des{
								box-sizing: border-box;
								width:100%;
								height:40%;
								justify-content: center;
								align-content: center;
								font-size: 20rpx;
								
							}
							
							.course-card-btn{
								display: flex;
								flex-direction: row;
								box-sizing: border-box;
								width:100%;
								height:30rpx;
								
								button{
									display: flex;
									text-align: center;
									justify-content: center;
									font-size: 24rpx;
									background-color: #b0def5;
									
								}
								button:hover {
								    background-color: #005bb5;
								}		
							}
						}
					}
				}
			}					
		}
	}
	
</style>