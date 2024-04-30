<template>
	<div
		class="d-flex gap-4 border border-4 border-warning p-4"
		style="border-radius: 20px"
	>
		<div
			class="p-4 d-flex flex-column col justify-content-center align-items-center"
		>
			<h1>Loket 1</h1>
			<div
				class="rounded rounded-3 bg-warning d-flex justify-content-center align-items-center gap-4 flex-column p-4"
			>
				<h1>Nomor Antrian</h1>
				<p id="loket1" class="count">{{ queue1 }}</p>
			</div>
		</div>
		<div
			class="p-4 d-flex flex-column col justify-content-center align-items-center"
		>
			<h1>Loket 2</h1>
			<div
				class="rounded rounded-3 bg-warning d-flex justify-content-center align-items-center gap-4 flex-column p-4"
			>
				<h1>Nomor Antrian</h1>
				<p id="loket2" class="count">{{ queue2 }}</p>
			</div>
		</div>
		<!-- Modal  -->
		<div
			class="modal fade"
			id="antrianModal"
			tabindex="-1"
			aria-labelledby="antrianModalLabel"
			aria-hidden="true"
		>
			<div class="modal-dialog modal-dialog-centered modal-xl">
				<div class="modal-content">
					<div class="modal-body">
						<div
							class="p-4 d-flex flex-column col justify-content-center align-items-center"
						>
							<h1 id="title-modal">{{ modaltitle }}</h1>
							<div
								class="rounded rounded-3 bg-warning d-flex justify-content-center align-items-center gap-4 flex-column p-4"
							>
								<h1>Nomor Antrian</h1>
								<p id="count-modal-loket" class="count">{{ modalCount }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Modal } from 'bootstrap';

const queue1 = ref(0);
const queue2 = ref(0);
const socket = ref(null);
const modalCount = ref(0);
const modaltitle = ref('');
const initTimeOut = ref(undefined);
let modal;

const modalTimeout = () => {
	initTimeOut.value = setTimeout(() => {
		if (modal) {
			modal.hide();
		}
	}, 8000);
};

const handleClearTimeOut = () => {
	if (initTimeOut.value) {
		clearTimeout(initTimeOut.value);
	}
};

onMounted(() => {
	let el = document.getElementById('antrianModal');
	if (el) {
		modal = new Modal(el);
	}
	//connection ws
	socket.value = new WebSocket('ws://localhost:8000');
	socket.value.addEventListener('open', () => {
		console.log('display connected to server ws');
	});

	socket.value.addEventListener('message', async (e) => {
		handleClearTimeOut();
		const data = await JSON.parse(e.data);
		if (data) {
			modaltitle.value = `Loket ${data.currentLoket}`;
			modalCount.value = data?.currentQueue;
			queue1.value = data?.queue1;
			queue2.value = data?.queue2;
		}
		if (modalCount.value > 0) {
			modal.show();
			modalTimeout();
		} else {
			modal.hide();
		}
	});
});

onUnmounted(() => {
	socket.value.removeEventListener('message', () => {
		console.log('remove listener');
	});
});
</script>
