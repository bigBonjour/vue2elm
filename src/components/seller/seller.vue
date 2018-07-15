<template>
	<div class="seller" ref="sellerScroll">
		<div class="seller-content">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc">
					<v-star :size="36" :score="seller.score"></v-star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
				<div class="favorite" @click="toogleFavorite">
					<span class="icon-favorite" :class="{'active':favorite}"></span>
					<span class="text">{{favoriteText}}</span>
				</div>
			</div>
			<v-split></v-split>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="content-wrapper">
					<p class="content">{{seller.bulletin}}</p>
				</div>
				<ul v-if="seller.supports" class="supports">
					<li class="support-item" v-for="(item,index) in seller.supports" :key="index">
						<span class="icon" :class="classMap[seller.supports[index].type]"></span>
						<span class="text">{{seller.supports[index].description}}</span>
					</li>
				</ul>
			</div>
			<v-split></v-split>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pic-wrapper" ref="picScroll">
					<ul class="pic-list" ref="picList">
						<li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
							<img :src="pic" width="120" height="90" />
						</li>
					</ul>
				</div>
			</div>
			<v-split></v-split>
			<div class="info">
				<h1 class="title">商家信息</h1>
				<ul>
					<li class="info-item" v-for="(info,index) in seller.infos" :key="index">
						{{info}}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import star from "@/components/star/star.vue"
	import split from "@/components/split/split.vue"
	import BScroll from "better-scroll"
	import { saveToLocal } from "@/common/js/store"
	import { loadFromLocal } from "@/common/js/store"
	export default {
		components: {
			"v-star": star,
			"v-split": split
		},
		props: {
			seller: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				favorite: false
			}
		},
		computed: {
			favoriteText() {
				return this.favorite ? "已收藏" : "收藏";
			}
		},
		created() {
			let _this = this
			setTimeout(() => {
				_this.favorite = loadFromLocal(_this.seller.id, "favorite", false);
			})
			this.classMap = ["decrease", "discount", "special", "invoice", "gurantee"];
		},
		methods: {
			toogleFavorite() {
				this.favorite = !this.favorite;
				saveToLocal(this.seller.id, "favorite", this.favorite);
			},
			_initScroll() {
				if(!this.scroll) {
					this.scroll = new BScroll(this.$refs.sellerScroll, {
						click: true
					})
				} else {
					this.scroll.refresh();
				}
			},
			_initPicsScroll() {
				if(!this.picWrapperScroll) {
					let picWidth = 120;
					let margin = 6;
					let width = (picWidth + margin) * this.seller.pics.length - margin;
					this.$refs.picList.style.width = width + "px";
					this.$nextTick(() => {
						this.picWrapperScroll = new BScroll(this.$refs.picScroll, {
							scrollX: true
						})
					})
				} else {
					this.picWrapperScroll.refresh();
				}
			}
		},
		mounted() {
			setTimeout(() => {
				this.$nextTick(() => {
					if(this.seller) {
						this._initScroll();
					}
					if(this.seller.pics) {
						this._initPicsScroll();
					}
				})
			})
		}
	}
</script>

<style>
	@import "seller.css";
</style>