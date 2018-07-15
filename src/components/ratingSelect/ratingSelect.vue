<template>
	<div class="ratingSelect">
		<div class="rating-type">
			<span class="block positive" :class="{'active':currentType===2}" @click="select(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span class="block positive" :class="{'active':currentType===0}" @click="select(0,$event)">{{desc.positive}}<span class="count">{{positiveCount.length}}</span></span>
			<span class="block negitive" :class="{'active':currentType===1}" @click="select(1,$event)">{{desc.negitive}}<span class="count">{{negitiveCount.length}}</span></span>
		</div>
		<div class="switch" :class="{'on':currentContent}" @click="toggleContent()">
			<span class="icon-check_circle"></span>
			<span class="text">只看内容评价</span>
		</div>
	</div>
</template>

<script>
	const POSITIVE = 0;
	const NEGITIVE = 1;
	const ALL = 2;
	export default {
		props: {
			ratings: {
				type: Array,
				default() {
					return []
				}
			},
			selectType: {
				type: Number,
				default: ALL
			},
			onlyContent: {
				type: Boolean,
				default: false

			},
			desc: {
				type: Object,
				default() {
					return {
						all: "全部",
						positive: "满意",
						negitive: "不满意"
					}
				}
			}
		},
		data() {
			return {
				currentType: "",
				currentContent: ""
			}
		},
		methods: {
			select(type, ev) {
				this.currentType = type;
				this.$emit("change-selectType", type);
			},
			toggleContent() {
				this.currentContent = !this.currentContent;
				this.$emit("change-onlyContent", this.currentContent);
			}
		},
		computed: {
			positiveCount() {
				return this.ratings.filter((rating) => {
					return rating.rateType = POSITIVE;
				})
			},
			negitiveCount() {
				return this.ratings.filter((rating) => {
					return rating.rateType = NEGITIVE;
				})
			}
		},
		mounted() {
			this.currentType = this.selectType;
			this.currentContent = this.onlyContent;;
		}
	}
</script>

<style>
	.ratingSelect .rating-type {
		padding: 18px 0;
		margin: 0 18px;
		position: relative;
		font-size: 0;
	}
	
	.ratingSelect .rating-type::after {
		display: block;
		width: 100%;
		position: absolute;
		bottom: 10px;
		content: "";
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	}
	
	.ratingSelect .rating-type .block {
		display: inline-block;
		padding: 8px 12px;
		margin-right: 8px;
		border-radius: 1px;
		color: rgb(77, 85, 93);
		font-size: 14px;
		line-height: 16px;
	}
	
	.ratingSelect .rating-type .block .count {
		margin-left: 2px;
		font-size: 8px;
	}
	
	.ratingSelect .rating-type .positive {
		background: rgba(0, 160, 220, .2);
	}
	
	.ratingSelect .rating-type .negitive {
		background: rgba(77, 85, 93, 0.2);
	}
	
	.ratingSelect .rating-type .active {
		color: #fff;
	}
	
	.ratingSelect .rating-type .positive.active {
		background: rgb(0, 160, 220);
	}
	
	.ratingSelect .rating-type .negitive.active {
		background: rgb(77, 85, 93);
	}
	
	.ratingSelect .switch {
		padding: 12px 18px;
		line-height: 24px;
		font-size: 0;
		border-bottom: 1px solid rgba(7, 17, 27, .0.1);
		color: rgb(147, 153, 159);
	}
	
	.ratingSelect .switch.on .icon-check_circle {
		color: #00c850;
	}
	
	.ratingSelect .switch .icon-check_circle {
		display: inline-block;
		font-size: 24px;
		margin-right: 4px;
		vertical-align: top;
	}
	
	.ratingSelect .switch .text {
		font-size: 12px;
		display: inline-block;
		vertical-align: top;
	}
</style>