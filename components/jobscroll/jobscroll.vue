<template>
	<view class="jobscroll_box">
		<scroll-view scroll-x='true' class='jobscroll_con'>
			<view class='jobscroll_con'>
				<view class='jobscroll_info' v-for='(item,index) in joblist' :key='index'>
					<view class='jobscroll_card' :class='item.colors'>
					    <view class='jobscroll_card_t'>{{item.textT}}</view>
						<view class='jobscroll_card_icon'>
							<view class='icon iconfont' :class='item.icon'></view>
						</view>
						<view class='jobscroll_card_des'>{{item.text}}</view>
						<view class='jobscroll_card_btn'>免费试学</view>
                    </view>
				</view>
			</view>
		</scroll-view>			
	</view>		
</template>

<script>
	
	export default {
		data() {
			return {

				joblist:[]
			}
		},
		mounted(){
			uni.request({
				url: 'http://127.0.0.1:5000/api/data1', //仅为示例，并非真实接口地址。
				success: (res) => {
					console.log(res.data);
					this.joblist = res.data.data.data
				}
			})	
		}
	}			
				
</script>

<style lang='scss'>
	@import '@/common/font/iconfont.css';
	
	.jobscroll_box{		
		width:100%;
		box-sizing: border-box;
		margin-bottom: 30px;
		
		.jobscroll_con{
			display:flex;
			align-items:center;
			flex-wrap:nowrap;
			box-sizing: border-box;
			.jobscroll_info{
				width:225px;
				height:260px;
				flex-shrink:0;
				margin:0 10px;
				
				.jobscroll_card{
					display: flex;
					flex-flow:column;
					box-sizing: border-box;
					align-items: center;
					width:100%;
					height:248px;
					background-color: #b0def5;
					border-radius: 5px;
					margin-top: 12px;
					
					.jobscroll_card_t{
					    display: flex;
						align-items: center;
						justify-content: center;
						width:210px;
						height:38px;
						background-color: #e4f3fb;
						font-size: 16px;
						text-align:center;
						margin-top:-15px;
						border-bottom-left-radius:25px;
						border-bottom-right-radius:25px;
						border-top-left-radius:15px;
						border-top-right-radius:15px;	
					}
					.jobscroll_card_icon{
						display:flex;
						align-items: center;
					    box-sizing: border-box;
						width:50px;
						height:50px;
					
						
						.icon iconfont{							
							border-radius: 100%;
							margin:20px 0 15px;
							width:50px;
							height:50px;
							
							
							view{
								font-size: 42px;
								color:#2a83fe
							}
						}
					}
					.jobscroll_card_des{
						display:flex;
						align-items: center;
						box-sizing: border-box;
						align-items: center;
						font-size: 14px;
					}
					.jobscroll_card_btn{
						display:flex;
						align-items: center;
						box-sizing: border-box;
						align-items: center;
						justify-content: center;
						width: 118px;
						height:32px;
						line-height:32px;
						color:#0a5ea0;
						font-size: 16px;
						border-radius:34px;
						border:1px solid #0a5ea0;
						margin-top:15px;
						
						
					}
				}
					
				.jobscroll_card1{
					background-color: #fee4b7;
					.jobscroll_card_t{
						background-color: #fef4e2;
					}
					.jobscroll_card_icon{
						background-color: #fee6d3;
						view{
							color:#d87e4e
						}
					}
					.jobscroll_card_btn{
						color:#c44606;
						border:1px solid #c44606;
					}		
				}
				
				.jobscroll_card2{
					background-color: #fee4b7;
					.jobscroll_card_t{
						background-color: #fef4e2;
					}
					.jobscroll_card_icon{
						background-color: #fee6d3;
						view{
							color:#d87e4e
						}
					}
					.jobscroll_card_btn{
						color:#c44606;
						border:1px solid #c44606;
					}		
				}
				
				.jobscroll_card3{
					background-color: #fee4b7;
					.jobscroll_card_t{
						background-color: #fef4e2;
					}
					.jobscroll_card_icon{
						background-color: #fee6d3;
						view{
							color:#d87e4e
						}
					}
					.jobscroll_card_btn{
						color:#c44606;
						border:1px solid #c44606;
					}		
				}
				
				.jobscroll_card4{
					background-color: #fee4b7;
					.jobscroll_card_t{
						background-color: #fef4e2;
					}
					.jobscroll_card_icon{
						background-color: #fee6d3;
						view{
							color:#d87e4e
						}
					}
					.jobscroll_card_btn{
						color:#c44606;
						border:1px solid #c44606;
					}		
				}
				
				.jobscroll_card5{
					background-color: #fee4b7;
					.jobscroll_card_t{
						background-color: #fef4e2;
					}
					.jobscroll_card_icon{
						background-color: #fee6d3;
						view{
							color:#d87e4e
						}
					}
					.jobscroll_card_btn{
						color:#c44606;
						border:1px solid #c44606;
					}		
				}
				
				.jobscroll_card6{
					background-color: #fee4b7;
					.jobscroll_card_t{
						background-color: #fef4e2;
					}
					.jobscroll_card_icon{
						background-color: #fee6d3;
						view{
							color:#d87e4e
						}
					}
					.jobscroll_card_btn{
						color:#c44606;
						border:1px solid #c44606;
					}		
				}
				
				.jobscroll_card7{
					background-color: #fee4b7;
					.jobscroll_card_t{
						background-color: #fef4e2;
					}
					.jobscroll_card_icon{
						background-color: #fee6d3;
						view{
							color:#d87e4e
						}
					}
					.jobscroll_card_btn{
						color:#c44606;
						border:1px solid #c44606;
					}		
				}
			}	
					
		}
	}
</style>