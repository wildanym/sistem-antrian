<template>
	<div
		class="d-flex align-items-center justify-content-center flex-column gap-4 p-4"
	>
		<h2>Loket {{ props.loket }}</h2>
		<div
			class="rounded rounded-3 bg-warning d-flex justify-content-center align-items-center gap-4 flex-column p-4"
		>
			<h1 class="fw-bold">Antrian</h1>
			<p id="loket1" class="count">{{ props.queue }}</p>
		</div>
		<div class="d-flex gap-4">
			<button class="btn btn-danger" @click="handlePrev">prev</button>
			<button class="btn btn-primary" @click="handleNext">next</button>
		</div>
	</div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
	loket: { type: Number, default: 1 },
	queue: { type: Number, default: 0 },
});

const emit = defineEmits(['onNext', 'onPrev']);

const handleNext = () => {
	emit('onNext');
};
const handlePrev = () => {
	emit('onPrev');
};
</script>
