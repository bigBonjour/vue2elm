<template>
	<div class="cart">
		<div class="shopcart">
			<div class="content">
				<div class="content-left" @click="toggleLsit">
					<div class="logo-wrapper">
						<div class="logo" :class="{'highLight':totalCount>0}">
							<i class="icon-shopping_cart"></i>
						</div>
						<div class="num" v-show="totalCount>0">{{totalCount}}</div>
					</div>
					<div class="price" :class="{'highLight':totalPrice>0}">￥{{totalPrice}}</div>
					<div class="desc">另需配送费{{deliveryPrice}}元</div>
				</div>
				<div class="content-right" @click="toggleLsit">
					<div class="pay" :class="payClass" @click.stop.prevent="pay">{{payDesc}}</div>
				</div>
				<div class="ball-container">
					<transition-group name="drop" v-on:before-enter="dropBeforeEnter" v-on:enter="dropEnter" v-on:after-enter="dropAfterEnter">
						<div v-for="(ball,index) in balls" v-show="ball.show" class="ball" :key="index">
							<div class="inner inner-hock"></div>
						</div>
					</transition-group>

				</div>
				<div class="shopcart-list" :class="{'cart-trainsiton':listShow}">
					<div class="list-header">
						<h1 class="title">购物车</h1>
						<span class="empty" @click="empty">清空</span>
					</div>
					<div class="list-content" ref="listcontent">
						<ul>
							<li class="food" v-for="(cartfood,index) in selectFoods" :key="index">
								<span class="name">{{cartfood.name}}</span>
								<div class="price">
									<span>￥{{cartfood.price * cartfood.count}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<v-cartcontrol :food="cartfood"></v-cartcontrol>
								</div>
							</li>
						</ul>
					</div>
				</div>

			</div>

		</div>
		<transition name="fade">
			<div class="list-mask" v-show="listShow" @click="hideLsit"></div>
		</transition>
	</div>
</template>

<script>
	import BScroll from "better-scroll"
	import cartcontrol from "@/components/cartcontrol/cartcontrol.vue"
	export default {
		data() {
			return {
				balls: [{
					show: false
				}],
				dropBalls: [],
				flag: true
			}
		},
		components: {
			"v-cartcontrol": cartcontrol
		},
		props: {
			selectFoods: {
				type: Array,
				default() {
					return [];
				}
			},
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			}
		},
		computed: {
			totalPrice() {
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				})
				return total;
			},
			totalCount() {
				let count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count;
				})
				return count;
			},
			payDesc() {
				if(this.totalPrice === 0) {
					return `￥${this.minPrice}元起送`;
				} else if(this.totalPrice < this.minPrice) {
					let diff = this.minPrice - this.totalPrice;
					return `还差￥${diff}元起送`
				} else {
					return "去结算";
				}
			},
			payClass() {
				if(this.totalPrice < this.minPrice) {
					return "not-enough";
				} else {
					return "enough";
				}
			},
			listShow() {
				if(!this.totalCount) {
					this.flag = true;
					return false;
				}
				let show = !this.flag;
				if(show) {
					if(!this.scroll) {
						this.$nextTick(() => {
							this.scroll = new BScroll(this.$refs.listcontent, {
								click: true
							})
						})
					} else {
						this.scroll.refresh()
					}

				}
				return show;
			}
		},
		methods: {
			drop(el) {
				for(let i = 0; i < this.balls.length; i++) {
					let ball = this.balls[i];
					if(!ball.show) {
						ball.show = true;
						ball.el = el;
						this.dropBalls.push(ball);
						return;
					}
				}
			},
			dropBeforeEnter(el) {

				let count = this.balls.length;
				while(count--) {
					let ball = this.balls[count];
					if(ball.show) {
						let rect = ball.el.getBoundingClientRect();
						let x = rect.left - 32;
						let y = -(window.innerHeight - rect.top - 22);
						el.style.display = "inline-block";
						el.style.WebkitTransform = `translate(0,${y}px)`;
						el.style.transform = `translate(0,${y}px)`;
						let inner = el.getElementsByClassName("inner-hock")[0];
						inner.style.webkitTransform = `translate(${x}px,0)`;
						inner.style.transform = `translate(${x}px,0)`;
					}
				}
			},
			dropEnter(el) {
				let rf = el.offsetHeight;
				this.$nextTick(() => {
					el.style.WebkitTransform = 'translate(0,0)';
					el.style.transform = 'translate(0,0)';
					let inner = el.getElementsByClassName("inner-hock")[0];
					inner.style.webkitTransform = 'translate(0,0)';
					inner.style.transform = 'translate(0,0)';
				})
			},
			dropAfterEnter(el) {
				let ball = this.dropBalls.shift();
				if(ball) {
					ball.show = false;
					el.style.display = "none";
				}
			},
			toggleLsit() {
				if(!this.totalCount) {
					return;
				} else {
					this.flag = !this.flag;
				}

			},
			empty() {
				this.selectFoods.forEach((food) => {
					food.count = 0;
				})
			},
			hideLsit() {
				this.flag = !this.flag;
			},
			pay() {
				if(this.totalPrice < this.minPrice) {
					return;
				} else {
					window.alert("支付" + this.totalPrice + "元")
				}
			}

		}
	}
</script>

<style>
	@import "shopcart.css";
</style>