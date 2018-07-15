<template>
	<div id="main">
		<v-header :seller="seller"></v-header>
		<div class="tab border-1px">
			<div class="tab-item ">
				<router-link to="goods">商品</router-link>
			</div>
			<div class="tab-item">
				<router-link to="ratings">评论</router-link>
			</div>
			<div class="tab-item">
				<router-link to="seller">商家</router-link>
			</div>
		</div>
		<keep-alive>
			<router-view :seller="seller"></router-view>
		</keep-alive>	
	</div>
</template>

<script type="text/ecmascript-6">
	import Data from "../data.json"
	import header from "@/components/header/header.vue"
	import { queryParam } from "@/common/js/until"
	export default {
		data() {
			return {
				seller: {}
			}
		},
		components: {
			"v-header": header
		},
		created() {
			this.seller = Data.seller
			let id = queryParam().id;
			this.$set(this.seller, "id", id);
		}

	}
</script>

<style scoped>
	.tab {
		display: flex;
		width: 100%;
		height: 40px;
		line-height: 40px;
		position: relative;
	}
	
	.tab::after {
		display: block;
		content: "";
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		border-top: 5px solid rgba(7, 17, 27, 0.1);
	}
	
	.tab .tab-item {
		flex: 1;
		text-align: center;
	}
	
	.tab .tab-item {
		border-left: 1px solid rgb(212, 214, 216);
	}
	
	.tab .tab-item:first-child {
		border-left: none;
	}
	
	.tab .tab-item a {
		display: block;
		text-decoration: none;
		font-size: 14px;
		color: rgb(77, 85, 93);
	}
	
	.tab .tab-item a.router-link-active {
		color: #f90;
	}
</style>