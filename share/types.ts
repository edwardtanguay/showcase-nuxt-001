import * as z from 'zod'


// test form
export const TestFormSchema = z.object({
 email: z.email('invalid e-mail address'),
 password: z.string('password is required').min(8, 'password must be at least 8 characters long'),
 language: z.enum(['english', 'german'])
})
export type TestForm = z.output<typeof TestFormSchema>
