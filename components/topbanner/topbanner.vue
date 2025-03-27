<template>
	<view class="index_banner_box">
		<swiper class='swiper' :indicator-dots='true' :autoplay='true' :interval='3000' :duration='500'>
			<swiper-item v-for='(item,index) in topbanner' :key='index'>
				<image class='banner' :src='item.img_url' mode='scaleToFill'></image>
			</swiper-item>
		</swiper>
	</view>		
</template>

<script>
	
	export default {
		data() {
			return {

				topbanner:[]
			}
		},
		mounted(){
			uni.request({
				url: 'http://127.0.0.1:5000/api/data1', //仅为示例，并非真实接口地址。
				success: (res) => {
					this.topbanner = res.data.data.images
				}
			})	
		}
	}			
				
</script>

<style lang='scss'>
	.index_banner_box{
		display:flex;
		width:100%;
		padding:10rpx;
		justify-content: center;
		align-items: center;
		border-radius: 5rpx;
		overflow:hidden;
		.swiper{
			width: 100%;
			height:260rpx;
			.banner{
				width:625rpx;
				height:260rpx
			}
		}
	}
</style>