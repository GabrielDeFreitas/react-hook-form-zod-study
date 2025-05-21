import { z } from "zod"
import { Regex } from "../../regex"

export const createUserFormSchema = z.object({
    name: z.string().nonempty('Name is required.').regex(Regex.NO_SPECIAL_CHARACTERS, 'Name must not contain special characters'),
    countries: z.string().nonempty('Please select a valid country.').refine(value => value !== '', 'Please select a valid country.'),
    email: z.string().nonempty('Email is required.').email('Invalid email format.'),
    password: z.string().nonempty('Password is required.').min(8, 'Password must be at least 8 characters long.').max(20, 'Password must be at most 20 characters long.'),
    workExperiences: z.array(z.object({
        title: z.string().nonempty('Job title is required.'),
        description: z.string().nonempty('Responsibilities description is required.'),
        duration: z.coerce.number().min(1, 'Duration must be at least 1 month.')
    })).min(1, 'Please add at least one work experience.')
})

export type CreateUserFormData = z.infer<typeof createUserFormSchema>