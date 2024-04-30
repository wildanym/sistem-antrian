<template>
	<div
		class="border-5 border border-warning w-75 d-flex flex-column"
		style="border-radius: 20px"
	>
		<div class="bg-warning p-4">
			<h1>Sistem Antrian</h1>
		</div>
		<div class="p-3">
			<RouterLink to="/display" target="_blank"
				><button class="btn btn-success">Open Display View</button></RouterLink
			>
		</div>
		<div class="p-4">
			<ul class="nav nav-tabs" id="myTab" role="tablist">
				<li class="nav-item" role="presentation">
					<button
						class="nav-link active"
						id="loket1-tab"
						data-bs-toggle="tab"
						data-bs-target="#loket1"
						type="button"
						role="tab"
						aria-controls="loket1"
						aria-selected="true"
					>
						Loket 1
					</button>
				</li>
				<li class="nav-item" role="presentation">
					<button
						class="nav-link"
						id="loket2-tab"
						data-bs-toggle="tab"
						data-bs-target="#loket2"
						type="button"
						role="tab"
						aria-controls="loket2"
						aria-selected="false"
					>
						Loket 2
					</button>
				</li>
			</ul>
		</div>
		<div class="tab-content" id="myTabContent">
			<div
				class="tab-pane fade show active"
				id="loket1"
				role="tabpanel"
				aria-labelledby="loket1-tab"
			>
				<QueueControllerComponent
					:loket="1"
					:queue="queue1"
					@onNext="handleNext(1)"
					@onPrev="handlePrev(1)"
				/>
			</div>
			<div
				class="tab-pane fade"
				id="loket2"
				role="tabpanel"
				aria-labelledby="loket2-tab"
			>
				<QueueControllerComponent
					:loket="2"
					:queue="queue2"
					@onNext="handleNext(2)"
					@onPrev="handlePrev(2)"
				/>
			</div>
			<div
				class="tab-pane fade"
				id="contact"
				role="tabpanel"
				aria-labelledby="contact-tab"
			>
				...
			</div>
		</div>
	</div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import QueueControllerComponent from '@/components/QueueControllerComponent.vue';

const socket = ref(null);
const queue1 = ref(0);
const queue2 = ref(0);

const sendCurrentQueue = (currentLoket, currentQueue) => {
	socket.value.send(
		JSON.stringify({
			currentLoket: currentLoket,
			currentQueue: currentQueue,
			queue1: queue1.value,
			queue2: queue2.value,
		})
	);
};

const handleNext = (loket) => {
	if (loket == 1) {
		queue1.value++;
		sendCurrentQueue(loket, queue1.value);
	} else {
		queue2.value++;
		sendCurrentQueue(loket, queue2.value);
	}
};

const handlePrev = (loket) => {
	if (loket == 1) {
		queue1.value--;
		sendCurrentQueue(loket, queue2.value);
	} else {
		queue2.value--;
		sendCurrentQueue(loket, queue2.value);
	}
};

onMounted(() => {
	//connection ws
	socket.value = new WebSocket('ws://localhost:8000');
	socket.value.addEventListener('open', () => {
		console.log('admin connected to server ws');
	});
});
</script>
