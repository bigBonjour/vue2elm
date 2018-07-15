<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease" v-show="food.count>0" @touchstart.stop="decreaseCart" @click.stop="decreaseCart">
				<span class="inner icon-remove_circle_outline"></span>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @touchstart.stop="addCart($event)" @click.stop="addCart($event)"></div>
	</div>
</template>

<script>
	export default {
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			addCart(event) {
				if(!this.food.count) {
					this.$set(this.food, "count", 1);
				} else {
					this.food.count++;
				}
				this.$emit("cart-drop", event.target);
			},
			decreaseCart() {
				if(this.food.count) {
					this.food.count--;
				}
			}
		}
	}
</script>

<style>
	@import "cartcontrol.css";
</style>