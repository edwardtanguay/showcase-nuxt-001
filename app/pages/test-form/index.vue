<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { TestFormSchema, type TestForm } from '~~/share/types'


const state = reactive<Partial<TestForm>>({
 email: undefined,
 password: undefined,
 language: 'english'
})


const messages = reactive<string[]>([])
const messagesKind = ref<'error' | 'success'>('success')
const formKey = ref(0)


async function onSubmit(event: FormSubmitEvent<TestForm>) {


 // UNCOMMENT FOR TESTING - force invalid data
 // event.data.email = "notvalidemail"
 // event.data.password= "zukurz"
 // event.data.language = "french"


 try {
	 // $fetch does not have access to the errorMessages being returned from the backend
	 // so used fetch here instead
	 const response = await fetch('/api/process-test-form', {
		 method: 'POST',
		 headers: { 'Content-Type': 'application/json' },
		 body: JSON.stringify(event.data),
	 })


	 const result = await response.json()


	 if (response.ok) {
		 // reset all fields to default values
		 state.email = undefined
		 state.password = undefined
		 state.language = 'english'
		 // fixes bug that creates error messages in form after resetting fields
		 formKey.value++


		 messages.splice(0) // clear previous messages
		 messages.push("Form submitted successfully!")
		 messagesKind.value = 'success'
	 } else {
		 const errorMessages = result?.data?.errorMessages
		 messagesKind.value = 'error'
		 if (errorMessages && Array.isArray(errorMessages)) {
			 messages.splice(0) // clear previous messages
			 messages.push(...errorMessages)
		 }
	 }
 } catch (err) {
	 console.error('⚠️ Network error:', err)
 }
}


const isValid = computed(() => {
 const result = TestFormSchema.safeParse(state)
 return result.success
})
</script>

<template>
	<ul class="list-disc ml-6 mb-3">
		<li>this form uses Nuxt UI for the form components and Zod for validation</li>
	</ul>
	<div
		class="max-w-md mx-auto mt-8 p-6 bg-slate-300 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-md shadow-md"
	>
		<UForm
			:key="formKey"
			:schema="TestFormSchema"
			:state="state"
			class="space-y-4"
			@submit="onSubmit"
		>
			<UFormField label="Email" name="email" class="flex flex-col">
				<UInput
					v-model="state.email"
					type="email"
					class="mt-1 p-2 border rounded-md border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
				/>
			</UFormField>

			<UFormField label="Password" name="password" class="flex flex-col">
				<UInput
					v-model="state.password"
					type="password"
					class="mt-1 p-2 border rounded-md border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
				/>
			</UFormField>

			<UFormField label="Language" name="language" class="flex flex-col">
				<select
					v-model="state.language"
					class="mt-1 p-2 border rounded-md border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
				>
					<option value="english">English</option>
					<option value="german">German</option>
				</select>
			</UFormField>
			<UButton
				type="submit"
				:disabled="!isValid"
				class="w-full py-2 px-4 bg-green-500 hover:bg-green-600 disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none dark:bg-green-600 dark:hover:bg-green-700 text-white font-semibold rounded-md transition"
			>
				Submit
			</UButton>
			<div
				v-if="messages.length"
				:class="{
					'text-red-600': messagesKind === 'error',
					'text-green-600': messagesKind === 'success',
				}"
			>
				<p v-if="messages.length === 1" class="text-center">{{ messages[0] }}</p>
				<ul v-if="messages.length > 1" class="list-disc ml-4">
					<li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
				</ul>
			</div>
		</UForm>
	</div>
</template>
