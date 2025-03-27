<template>
	<view class="online_box">
		<image class='online-image' :src='indexbanner.url' mode='scaleToFill'></image>

	</view>		
</template>

<script>
	
	export default {
		data() {
			return {

				indexbanner:{}
			}
		},
		mounted(){
			uni.request({
				url: 'http://127.0.0.1:5000/api/data1', //仅为示例，并非真实接口地址。
				success: (res) => {
					console.log(res.data);
					this.indexbanner = res.data.data.index_banner;
				}
			})	
		}
	}			
				
</script>

<style lang='scss'>
	.online_box{
		display:flex;
		width:725rpx;
		padding:10rpx;
		justify-content: center;
		align-items: center;
		border-radius: 5rpx;
		box-sizing: border-box;
		overflow:hidden;
		margin-bottom: 15rpx;
		
		.online-image{
			width: 725rpx;
			height:132rpx;
		}
	}
</style>