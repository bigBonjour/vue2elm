<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64" :src="seller.avatar" />
			</div>
			<!--内容-->
			<div class="content">
				<!--标题-->
				<div class="title">
					<span class="brand bgTi-img"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<!--描述-->
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div class="supports" v-if="seller.supports">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">
						{{seller.supports[0].description}}
					</span>
				</div>
			</div>
			<div class="support-count" v-if="seller.supports" @click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetail">
			<span class="bulletin-title bgNotice-img"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%" />
		</div>
		<!--浮层-->
		<transition name="fade">
			<div class="detail" v-show="detailShow" >
				<div class="detail-wrapper clearfix">
					<div class="detail-main" v-if="seller">
						<h1 class="name">{{seller.name}}</h1>
						<!--评分星级-->
						<div class="star-wrapper">
							<v-star :size="48" v-bind:score="seller.score"></v-star>
							<div class="title">
								<div class="line"></div>
								<div class="text">优惠信息</div>
								<div class="line"></div>
							</div>
							<ul v-if="seller.supports" class="supports">
								<li class="support-item" v-for="(item,index) in seller.supports" :key="index">
									<span class="icon-2" :class="classMap[seller.supports[index].type]"></span>
									<span class="text">{{seller.supports[index].description}}</span>
								</li>
							</ul>
							<div class="title">
								<div class="line"></div>
								<div class="text">商家公告</div>
								<div class="line"></div>
							</div>
							<div class="bulletin">
								<p class="content">
									{{seller.bulletin}}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="detail-close">
					<i class="icon-close" @click="hiddenDetail"></i>
				</div>
			</div>
		</transition>

	</div>
</template>

<script>
	import star from "@/components/star/star.vue"
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				detailShow: false
			}
		},
		created() {
			this.classMap = ["decrease", "discount", "special", "invoice", "gurantee"]
		},
		components: {
			"v-star": star
		},
		methods: {
			showDetail() {
				this.detailShow = true;
			},
			hiddenDetail() {
				this.detailShow = false;
			}
		}
	}
</script>

<style>
	@import "header.css"
</style>