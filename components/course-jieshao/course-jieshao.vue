<template>
	<view class='courseJieshao-box'>
		<image :src='images' mode='' :style="{height:imageheight + 'rpx'}"></image>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:{
			images:{
				type:String,
				default:""
				
			},
		
			imageheight:{
				type:Number,
				default:300
				
			}
		},
		
		methods: {
			
		}
	}
</script>

<style lang='scss'>
	.courseJieshao-box{
		display:flex;
		box-sizing: border-box;
		flex-direction: column;
		justify-content:center;
		width:100%;
		image{
			width:100%
		}
	}
	

</style>
