<template>
	<view class="coursecard-box">
		<view class='coursecard-con'>
			<view class='coursecard-info' v-for='(item,index) in recoList' :key='index'>
				<view class='coursecard-img'>
					<image :src='item.logo' mode=''></image>
				</view>
				<view class='coursecard-des'>
					<view class='coursecard-des-t'>{{item.textT}}</view>
					<view class='coursecard-des-info'>
						<view class='coursecard-des-pay'>￥{{item.money}}</view>
						<view class='coursecard-des-icon'>
							<text class='icon iconfont icon-dashuju'></text>
							{{item.hits}}人学过
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

				recoList:[]
			}
		},
		mounted(){
			uni.request({
				url: 'http://127.0.0.1:5000/api/data1', //仅为示例，并非真实接口地址。
				success: (res) => {
					console.log(res.data);
					this.recoList = res.data.data
				}
			})	
		}
	}			
				
</script>

<style lang='scss'>
	@import '@/common/font/iconfont.css';
	
	.coursecard-box{
		display:flex;
		width:100%;
		padding:0 15px;
		margin-bottom:15px;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		margin-bottom: 15px;
		overflow: hidden;
		
		.coursecard-con{
			display:flex;
			width:100%;
			align-items: center;			
			box-sizing: border-box;
			overflow: hidden;
			flex-direction: column;
			box-sizing: border-box;
			
			
			.coursecard-info{
				width:100%;
				display:flex;
				box-sizing: border-box;
				padding:10px;
				border-radius: 15px;
				margin-bottom: 15px;
				flex-direction: row;
				align-items: center;
				background-color: #fff;
				.coursecard-img{
					flex-shrink:0;
					margin-right:15px;
					
					image{
						width:240rpx;
						height:140rpx;
						
					}
				}	
				.coursecard-des{
					width:400rpx;
					display:flex;
					box-sizing: border-box;
					flex-flow: row;
					flex-wrap:wrap;
					.coursecard-des-t{
						overflow:hidden;
					
						white-space: normal;
						margin:10px 0;
					}
					.coursecard-des-info{
						width:300rpx;
					
						text-align: center;
						
						border-radius: 10px;
						background-color: #fff;
	
						font-size: 16px;
						margin-top:10px;
						.coursecard-des-pay{
							width:100px;
							height:10px;
							text-align: left;
						}
					
						.coursecard-des-icon{
							font-size: 15px;
							color:green;
							text-align: right;
							
							text{
								width:100px;
								color:skyblue;
								margin:0 2px 0 0;
								font-size: 15px;
								text-align: right;
							}
						}
					}
				}
			}
		}
	}
</style>