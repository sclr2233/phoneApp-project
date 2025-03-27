<template>
	<div>
		<h1>我的余额</h1>
		<p v-if="loading">加载中...</p>
		<p v-else-if="error">{{ error }}</p>
		<div v-else>
			<p>用户ID: {{ balance.user_id }}</p>
			<p>余额: ￥{{ balance.balance.toFixed(2) }}</p>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';

	export default {
		data() {
			return {
				balance: null,
				loading: true,
				error: null
			};
		},
		created() {
			this.fetchBalance();
		},
		methods: {
			async fetchBalance() {
				const userId = 1; // 假设当前用户ID为1
				try {
					const response = await axios.get(`http://127.0.0.1:5002/api/balance/${userId}`);
					this.balance = response.data;
				} catch (err) {
					this.error = '获取余额失败，请稍后重试';
				} finally {
					this.loading = false;
				}
			}
		}
	};
</script>

<style>

</style>