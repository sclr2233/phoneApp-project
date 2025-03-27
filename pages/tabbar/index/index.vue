<template>
	<view class='home'>
		<view class='navbar'>
	        <navbar />
		</view>	
		<view class='topbanner'>
			<topBanner />
		</view>	
		<view class='coursenav'>
			<Coursenav />
		</view>	
		<view class='indexbanner'>
			<indexBanner />
		</view>	
		<view class='free-box'>
			<view class='free-T-box public-tow-box'>
				<view class='public-T'>
					限时免费
				</view>
			</view>			
			<FreeCard />
		</view>	
		<view class='public-title'>
			<view class='public-class-t'>零基础就业班</view>
			<jobScroll />
		</view>	
		<view class='recommend-box'>
			<view class='recommend-t-box'>
				<view class='public-t'>推荐课程</view>
			</view>	
			<CourseCard />
		</view>		
	</view>	
</template>

<script>
	import navbar from '@/components/navbar/navbar.vue';
	import topBanner from '@/components/topbanner/topbanner.vue';
	import Coursenav from '@/components/coursenav/coursenav.vue';
	import indexBanner from '@/components/indexbanner/indexbanner.vue';
	import FreeCard from '@/components/freecard/freecard.vue';
	import jobScroll from '@/components/jobscroll/jobscroll.vue';
	import CourseCard from '@/components/courseCard/courseCard.vue';

	export default {
	    components: {
			navbar,
			topBanner,
			Coursenav,
			indexBanner,
			FreeCard,
			jobScroll,
			CourseCard
		}
	}

</script>

<style lang='scss'>
	.home{
		display: flex;
		flex-direction: column;
		flex:1;
		overflow:hidden;
	    .free-box{
		    display:flex;
			flex-direction: column;
		    width:100%;		
		    justify-content: flex-start;
		    align-items: center;
		    box-sizing: border-box;
		    overflow:hidden; 
			
			.public-tow-box{
				display:flex;
				width:100%;		
				justify-content: flex-start;
				align-items: center;
				border-radius: 5rpx;
				box-sizing: border-box;
				overflow:hidden;
				padding:0 15px;
				justify-content:space-between;
				align-content:space-between;
				flex-wrap: wrap;
				.public-T{
					font-size:20px;
					font-weight:700;
				}
			}
		}	
		.public-title{
			display:flex;
			width:100%;	
			pading:0;
			flex-direction: column;
			.public-class-t{
				font-size: 22px;
				font-weight: 700;
				margin-bottom:15px;
			}
		}	
		.recommend-box{
			display:flex;
			width:100%;	
			pading:0;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			box-sizing: border-box;
			overflow: hidden;
			.recommend-t-box{
				display:flex;
				flex-wrap: wrap;
				flex-direction: column;
				width:100%;	
				pading:0;
				.public-t{
					width:100%;
					pading:0 15px;
					
				}
			}
		}
			
	}	

</style>
