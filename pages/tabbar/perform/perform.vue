<template>
	<view class="container">
		<!-- 标题 -->
		<view class="header">
			<text class="title">学习进度</text>
		</view>

		<!-- 进度条 -->
		<view class="progress-container">
			<progress :percent="progressPercent" stroke-width="50" activeColor="#4cd964" />
			<text class="progress-text">{{ progressPercent }}%</text>
		</view>

		<!-- 课程列表 -->
		<view class="course-list">
			<view v-for="(course, index) in courses" :key="index" class="course-item">
				<text class="course-name">{{ course.name }}</text>
				<progress :percent="course.progress" stroke-width="5" activeColor="#007aff" />
			</view>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				// 示例数据
				courses: [{
						name: '课程1',
						progress: 0
					},
					{
						name: '课程2',
						progress: 0
					},
					{
						name: '课程3',
						progress: 0
					},
				],
			};
		},
		computed: {
			// 计算总进度
			progressPercent() {
				const total = this.courses.reduce((sum, course) => sum + course.progress, 0);
				return Math.round(total / this.courses.length);
			},
		},
		methods: {
			// 更新课程进度

			async updateCourseProgress(courseIndex, newProgress) {
				if (this.courses[courseIndex]) {
					this.courses[courseIndex].progress = newProgress;

					// 同步到后端
					try {
						await axios.post('/api/update-progress', {
							courseId: this.courses[courseIndex].id,
							progress: newProgress,
						});
					} catch (error) {
						console.error('Failed to update progress:', error);
					}
				}
			},

		},
		mounted() {
			// 假设你有一个视频播放组件，当视频播放进度变化时调用此方法
			// 例如：videoPlayer.on('progress', this.handleVideoProgress);
		},
		methods: {
			// 处理视频进度变化
			handleVideoProgress(courseIndex, progress) {
				this.updateCourseProgress(courseIndex, progress);
			},
		},
	};
</script>


<style scoped>
	.container {
		padding: 20px;
	}

	.header {
		margin-bottom: 20px;
	}

	.title {
		font-size: 24px;
		font-weight: bold;
	}

	.progress-container {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
	}

	.progress-text {
		margin-left: 10px;
		font-size: 16px;
	}

	.course-list {
		margin-top: 20px;
	}

	.course-item {
		margin-bottom: 15px;
	}

	.course-name {
		font-size: 18px;
		margin-bottom: 5px;
	}
</style>