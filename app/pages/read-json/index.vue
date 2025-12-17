<script setup>
const response = await $fetch("/api/flashcards");
</script>

<template>
	<ul class="list-disc ml-6 mb-3">
		<li>this page gets its data from a local JSON file via the Nuxt API and displays a list of flashcards</li>
		<li>note: this page will not work at Vercel since it has no file system</li>
	</ul>
	<div v-for="card in response.data"
		 :key="card.suuid"
		 class="flex flex-col gap-1 p-3 mb-3 w-fit bg-gray-700 rounded">
		<div>
			<h3 class="text-lg font-semibold">{{ card.front }}</h3>
			<p class="text-yellow-200">{{ card.back }}</p>
		</div>
	</div>
</template>
