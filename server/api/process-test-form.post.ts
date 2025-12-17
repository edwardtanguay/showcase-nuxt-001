import { TestFormSchema } from '~~/share/types'


export default defineEventHandler(async (event) => {
	const result = await readValidatedBody(event, TestFormSchema.safeParse);


	if (result.success) {
		const body = await readBody(event);
		// do something with the valid data
		console.log("Valid data received:", JSON.stringify(body))
	} else {
		const errorMessages = result.error.issues.map(err => {
			const field = err.path.join('.');
			return `${field}: ${err.message}`
		});


		throw createError({
			statusCode: 400,
			data: { errorMessages }
		});
	}
	return { success: true }
})
