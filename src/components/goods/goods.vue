<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menu">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex ==index}" :key="index" @click="selectMenu(index)">
					<span class="text">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foods">
			<ul>
				<li v-for="(item,index) in goods" class="food-list food-list-hook" :key="index">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="(food,index) in item.foods" :key="index" class="food-item" @click="selectFoodDetail(food,$event)">
							<div class="icon">
								<img :src="food.icon" width="57" height="57" />
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc" v-if="food.description">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}</span>
								</div>
								<div class="price">
									<span class="now"><b>￥</b>{{food.price}}</span><span class="old" v-show="food.oldPrice"><b>￥</b>{{food.oldPrice}}</span>
								</div>
								<!--控制-->
								<div class="cartcontrol-wrapper">
									<v-cartcontrol :food="food"  @cart-drop="dropBall"></v-cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<v-shopcart ref="shopcart" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-foods="selectFoods"></v-shopcart>
		<v-food :food="selectedFood" ref="foodDetail" @cart-drop="dropBall"></v-food>
	</div>
</template>

<script>
	import BScroll from "better-scroll"
	import shopcart from "@/components/shopcart/shopcart.vue"
	import cartcontrol from "@/components/cartcontrol/cartcontrol.vue"
	import food from "@/components/food/food.vue"
	import Data from "../../../data.json"
	export default {
		data() {
			return {
				goods: [],
				classMap: [],
				listHeight: [],
				scrollY: 0,
				menuScroll: {},
				foodsScroll: {},
				selectedFood:{}
			}
		},
		props: {
			seller: {
				type: Object
			}
		},
		components: {
			"v-shopcart": shopcart,
			"v-cartcontrol": cartcontrol,
			"v-food":food
		},
		created() {
			this.classMap = ["decrease", "discount", "special", "invoice", "gurantee"];
			this.goods = Data.goods;
			let _this = this
			this.$nextTick(() => {
				_this._initScroll();
				_this._calculateHeight();
			})
		},
		computed: {
			currentIndex() {
				for(let i = 0; i < this.listHeight.length; i++) {
					let height = this.listHeight[i];
					let height2 = this.listHeight[i + 1];
					if((!height2) || (this.scrollY >= height && this.scrollY < height2)) {
						return i;
					}
				}
				return 0;
			},
			selectFoods() {
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if(food.count) {
							foods.push(food);
						}
					})
				})
				return foods;
			}
		},
		methods: {
			_initScroll() {
				this.menuScroll = new BScroll(this.$refs.menu, {
					click: true
				});
				this.foodsScroll = new BScroll(this.$refs.foods, {
					probeType: 3,
					click: true
				});
				this.foodsScroll.on("scroll", (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
				})
			},
			_calculateHeight() {
				let foodList = this.$refs.foods.getElementsByClassName("food-list-hook");
				let height = 0;
				this.listHeight.push(height);
				for(let i = 0; i < foodList.length; i++) {
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
			},
			selectMenu(index) {
				let foodList = this.$refs.foods.getElementsByClassName("food-list-hook");
				let el = foodList[index];
				this.foodsScroll.scrollToElement(el, 300);
			},
			dropBall(target){
				//体验优化
				this.$nextTick(()=>{				    
					this.$refs.shopcart.drop(target);
				})

			},
			selectFoodDetail(food){
				this.selectedFood=food;
				this.$refs.foodDetail.showFood();
			}
		}
	}
</script>

<style>
	@import "goods.css"
</style>
