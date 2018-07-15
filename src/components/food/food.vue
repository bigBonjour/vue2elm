<template>
	<div class="food-detail2" :class="{'hideFood':showFlag}" ref="foodDetail2">
		<div class="food-content">
			<div class="image-header">
				<img :src="food.icon" />
				<div class="back" @click="hideFood">
					<i class="icon-arrow_lift"></i>
				</div>
			</div>
			<div class="content">
				<h1 class="title">{{food.name}}</h1>
				<div class="food-detail">
					<span class="sell-count">月售{{food.sellCount}}份</span> <span class="rating">好评率{{food.rating}}</span>
				</div>
				<div class="price">
					<span class="now"><b>￥</b>{{food.price}}</span><span class="old" v-show="food.oldPrice"><b>￥</b>{{food.oldPrice}}</span>
				</div>
				<div class="cartcontrol-wrapper" v-show="food.count">
					<v-cartcontrol :food="food" @cart-drop="dropFoodBall"></v-cartcontrol>
				</div>
				<transition name="fade">
					<div class="buy" v-show="!food.count || food.count===0" @click="addFirst($event)">加入购物车</div>
				</transition>
			</div>
			<v-split></v-split>
			<div class="info" v-show="food.info">
				<h1 class="title">商品信息</h1>
				<p class="text">{{food.info}}</p>

			</div>
			<v-split></v-split>
			<div class="rating">
				<h1 class="title">商品评价</h1>
				<v-rating-select @change-selectType="changeSelectType" @change-onlyContent="changeOnlyContent" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></v-rating-select>
				<div class="rating-wrapper">
					<ul v-show="food.ratings && food.ratings.length">
						<li v-for="(rating,index) in food.ratings"  :key="index" class="rating-item" v-show="neddShow(rating.rateType,rating.text)">
							<div class="user">
								<span class="name">{{rating.username}}</span>
								<img class="avatar" :src="rating.avatar" width="12" height="12" />
							</div>
							<div class="time">{{rating.rateTime | rateTimeForMat}}</div>
							<p class="text">
								<span class="zan" :class="{'icon-thumb_up':rating.rateType===0, 'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
							</p>
						</li>
					</ul>
					<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from "better-scroll"
	import cartcontrol from "@/components/cartcontrol/cartcontrol.vue"
	import split from "@/components/split/split.vue"
	import ratingSelect from "@/components/ratingSelect/ratingSelect.vue"
	import {formatDate} from "@/common/js/date"
	const ALL = 2;
	export default {
		data() {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: false,
				desc: {
					all: "全部",
					positive: "推荐",
					negitive: "吐槽"
				}
			}
		},
		components: {
			"v-cartcontrol": cartcontrol,
			"v-split": split,
			"v-rating-select": ratingSelect
		},
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			dropFoodBall(target) {
				this.$emit("cart-drop", target);
			},
			showFood() {
				this.showFlag = true;
				this.selectType = ALL;
				this.onlyContent = false;
				this.$nextTick(() => {
					if(!this.scroll) {
						this.scroll = new BScroll(this.$refs.foodDetail2, {
							click: true
						})
					} else {
						this.scroll.refresh();
					}
				})
			},
			hideFood() {
				this.showFlag = false;
			},
			addFirst(event) {
				if(!this.food.count) {
					this.$set(this.food, "count", 1);
				} else {
					this.food.count++;
				}
				this.$emit("cart-drop", event.target);
			},
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
		},
		filters:{
			rateTimeForMat(time){
				let date=new Date(time);
				return formatDate(date,"yyyy-MM-dd hh:mm");
			}
		}
	}
</script>

<style>
	@import "food.css";
</style>