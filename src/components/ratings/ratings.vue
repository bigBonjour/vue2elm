<template>
	<div class="ratings" ref="ratings">
		<div class="rating-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>

				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<v-star :size="36" :score="seller.serviceScore"></v-star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<v-star :size="36" :score="seller.foodScore"></v-star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<v-split></v-split>
			<v-rating-select :select-type="selectType" :only-content="onlyContent" :ratings="ratings" @change-selectType="changeSelectType" @change-onlyContent="changeOnlyContent"></v-rating-select>
			<!--评论列表-->
			<div class="ratings-wrapper">
				<ul>
					<li v-for="(rating,index) in ratings"  :key="index" class="rating-item" v-show="neddShow(rating.rateType,rating.text)">
						<div class="avatar">
							<img :src="rating.avatar" />
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<v-star :size="24" :score="rating.score"></v-star>
								<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show="rating.recommend">
								<span class="icon-thumb_up"></span>
								<span v-for="(item,index) in rating.recommend" :key="index" class="item">{{item}}</span>
							</div>
							<p class="time">{{rating.deliveryTime | deliveryTimeForMat}}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import star from "@/components/star/star.vue"
	import split from "@/components/split/split.vue"
	import ratingSelect from "@/components/ratingSelect/ratingSelect.vue"
	import { formatDate } from "@/common/js/date"
	import BScroll from "better-scroll"
	import Data from "../../../data.json"
	const ALL = 2;
	export default {
		props: {
			seller: {
				type: Object,
				default: {}
			}
		},
		components: {
			"v-star": star,
			"v-split": split,
			"v-rating-select": ratingSelect
		},
		data() {
			return {
				ratings: [],
				selectType: ALL,
				onlyContent: true
			}
		},
		created() {
			this.ratings = Data.ratings;
			let _this = this
			this.$nextTick(() => {
				if(!_this.scroll) {
					_this.scroll = new BScroll(_this.$refs.ratings, {
						click: true
					})
				} else {
					_this.scroll.refresh();
				}
			})
		},
		filters: {
			deliveryTimeForMat(time) {
				let date = new Date(time);
				return formatDate(date, "yyyy-MM-dd hh:mm");
			}
		},
		methods: {
			neddShow(type, text) {
				if(this.onlyContent && !text) {
					return false;
				}
				if(this.selectType == ALL) {
					return true;
				} else {
					return type === this.selectType;
				}
			},
			changeSelectType(type) {
				this.selectType = type;
				//this.$nextTick 异步更新dom
				this.$nextTick(() => {
					this.scroll.refresh();
				})

			},
			changeOnlyContent(content) {
				this.onlyContent = content;
				this.$nextTick(() => {
					this.scroll.refresh();
				})
			}
		}
	}
</script>

<style>
	@import "ratings.css";
</style>