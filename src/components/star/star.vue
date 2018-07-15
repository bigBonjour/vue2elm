<template>
	<div class="star" :class="starType">
		<span class="star-item" track-by="$index" v-for="(itemClass,index) in itemClasses" :key="index" :class="itemClass"></span>		
	</div>
</template>

<script>
	const LENGTH = 5;
	const CLA_ON = "on";
	const CLA_HALF = "half";
	const CLA_OFF = "off";
	export default {
		props: {
			size: {
				type: Number
			},
			score: {
				type: Number
			}
		},
		computed: {
			starType() {
				return "star-" + this.size;
			},
			itemClasses() {				
				let result = [];
				let newScore = Math.floor(this.score * 2) / 2;
				let hasDecimal = newScore % 1 !== 0;
				let intenger = Math.floor(newScore);
				for(let i = 0; i < intenger; i++) {
					result.push(CLA_ON);
				}
				if(hasDecimal) {
					result.push(CLA_HALF);
				}
				while(result.length < LENGTH) {
					result.push(CLA_OFF);
				}
				return result;
			}
		}
	}
</script>

<style>
	@import "star.css";
</style>