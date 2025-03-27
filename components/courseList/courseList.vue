<template>
	<view class='courselist-box'>
		<view class='courselist-con'>
			<view class='courselist-info' @click="clickVideo(item)" v-for='(item,index) in videoList' :key='index'>
				<view class='courselist-info-text'>{{item.textT}}</view>
			</view>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:{
			videoList:{
				type:Array,
				default: () => []
				
				
			}
		},
		
		mounted() {
		    console.log(this.videoList)
		},
		
		methods: {
			clickVideo(item){
				const videoURL = item.videoURL;
				uni.navigateTo({
					url:`/pages/course/videos/videos?videoURL=${encodeURIComponent(videoURL)}`
				})
			}
			
		}
	}
</script>

<style lang='scss'>
	.courselist-box{
		display:flex;
		box-sizing:border-box;
		flex-direction:column;
		width:100%;
		padding:0 15px;
		.courselist-con{
			display:flex;
			box-sizing:border-box;
			flex-direction:column;
			align-items: center;
			justify-content: flex-start;
			flex-grow:1;
			.courselist-info{
				display:flex;
				box-sizing:border-box;
				align-items:center;
				overflow: hidden;
				width:100%;
				height:45px;
				font-size:14px;
				flex-grow:1;
				border-bottom:1px solid #efefef;
				.courselist-info-text{
					white-space: nowrap;
					overflow:hidden;
					text-overflow: ellipsis;
					
				}
			}
		}
	}

</style>
