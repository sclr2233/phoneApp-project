<template>
	<view class='videoplay-box'>
		<web-view :src="videoURL"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoURL:""
			}
		},
		
		// props:{
		// 	VideoURL:{
		// 		type:String,
		// 		default:function(){
		// 			return ""
		// 		}
		// 	}
		// },
		
		onLoad(options) {
		    this.videoURL = decodeURIComponent(options.videoURL);
		}
	}	
		// props:{
		// 	chapterId:{
		// 		type:Array,
		// 		default:function(){
		// 			return []
		// 		}
		// 	}
		// },
		
		// onLoad(options) {
		// // 通过 options 获取传递的章节 ID 或视频链接
		// const chapterId = options.chapterId;
		// this.loadVideo(chapterId);
	 //  },
	
	
</script>

<style lang='scss'>
	/* .videoplay-box {
	    display: flex;
		width: 100%;
	    height: 100%;
	} */

</style>
