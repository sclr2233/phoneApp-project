<template>
	<view class="freecard-box" v-for='(item,index) in teaList' :key='index'>
		<view class='freecard-img'>
			<image :src='item.teacher_logo' mode=''></image>
	    </view>
		<view class='freecard-text'>
			<view class='freecard-t'>{{item.limitName}}</view>
			<view class='freecard-info'>
				<view class='freecard-info-text'>
					<view class='info-text1'>{{item.teacher_name}}{{item.teacher_job}}</view>
					<view>{{item.limitNum}}人学过</view>
				</view>
				<view class='freecard-info-btn' v-if="item.baoming == '立即学习'">{{item.baoming}}</view>
				<view class='freecard-info-btn freecard-info-btn1' v-else>{{item.baoming}}</view>
			</view>	
		</view>		
	</view>		
</template>

<script>
	
	export default {
		data() {
			return {

				teaList:[]
			}
		},
		mounted(){
			uni.request({
				url: 'http://127.0.0.1:5000/api/data1', //仅为示例，并非真实接口地址。
				success: (res) => {
					console.log(res.data);
					this.teaList = res.data.data
				}
			})	
		}
	}			
				
</script>

<style lang='scss'>
	.freecard-box{
		display:flex;
		width:100%;
		padding:10px 0;
		margin:10px;
		border-radius:10px;
		box-shadow:0 0 5px 1px rgba($color:#000000,$alpha:0.1);
		align-items: center;
		box-sizing: border-box;
		margin-bottom: 15px;
		background-color: #fff;
		
		.freecard-img{
			flex-shrink: 0;			
			width: 91rpx;
			height:91rpx;
			border-radius: 100%;
			margin:0 15px;
			image{
				width:100%;
				height:100%;
				border-radius: 100%;
			}
		}
		.freecard-text{
			width:100%;
			display:flex;
			box-sizing: border-box;
			flex-direction: column;
			padding:0 15px 0 0;
			.freecard-t{
				font-size: 16px;
				overflow:hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin:10px 0;
					
			}
			.freecard-info{
				width:100%;
				display:flex;
				box-sizing: border-box;
				flex-flow: row nowrap;
				justify-content: space-between;
				.freecard-info-text{
					width:60%;
					overflow:hidden;
					font-size: 16px;
					color:#666;
					.info-text1{
						height:20px;
						font-size:14px;
						overflow:hidden;
					}
				}
				.freecard-info-btn{
					width:100px;
					height:34px;
					text-align: center;
					line-height: 34px;
					border-radius: 34px;
					background-color: #00b783;
					color:#fff;
					font-size: 16px;
					margin-top:10px
				}
				.freecard-info-btn1{
					background-color: #ddd;
				}
			}
		}
	}
</style>