
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { CreateUserFormData, createUserFormSchema } from "./utils/schemas/create-user-form"

export default function App() {
  const [output, setOutput] = useState('')

  const { register, handleSubmit, formState: { errors, isValid }, control, watch } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
    mode: 'onChange'
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'workExperiences'
  })

  console.log('form state log:', errors)

  function createUser(data: CreateUserFormData) {
    setOutput(JSON.stringify(data, null, 2))
  }

  function addWorkExperience() {
    append({ title: '', description: '', duration: 0 })
  }

  return (
    <form onSubmit={handleSubmit(createUser)} className="max-w-sm mx-auto p-6">

      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your name</label>
        <input {...register('name')} type="text" id="name" aria-invalid={!!errors.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your name" />
        {errors.name && <span role="alert" className="mt-2 text-sm text-red-600">{errors.name.message}</span>}
      </div>

      <div className="mb-5">
        <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium text-gray-900">Date of birth</label>
        <input type="date" {...register('dateOfBirth')} id="dateOfBirth" aria-invalid={!!errors.dateOfBirth} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        {errors.dateOfBirth && <span role="alert" className="mt-2 text-sm text-red-600">{errors.dateOfBirth.message}</span>}
      </div>

      <div className="mb-5">
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Select your country</label>
        <select {...register('countries')} id="countries" aria-invalid={!!errors.countries} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          <option value="">Choose a country</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
        {errors.countries && <span role="alert" className="mt-2 text-sm text-red-600">{errors.countries.message}</span>}
      </div>

      <div className="mb-5">
        <div className="flex gap-4 justify-between items-center">
          <label htmlFor="workExperiences" className="block mb-2 text-sm font-medium text-gray-900">Work experiences</label>
          <button type="button" onClick={addWorkExperience} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add work experience</button>
        </div>
        {errors.workExperiences && <span role="alert" className="mt-2 text-sm text-red-600">{errors.workExperiences.message}</span>}
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <div className="mb-5">
                <label htmlFor={`workExperiences.${index}.title`} className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                <input {...register(`workExperiences.${index}.title`)} type="text" id={`workExperiences.${index}.title`} aria-invalid={!!errors.workExperiences} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Job Title" />
                {errors.workExperiences?.[index]?.title && <span role="alert" className="mt-2 text-sm text-red-600">{errors.workExperiences[index].title.message}</span>}
              </div>
              <div className="mb-5">
                <label htmlFor={`workExperiences.${index}.description`} className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                <textarea {...register(`workExperiences.${index}.description`)} id={`workExperiences.${index}.description`} aria-invalid={!!errors.workExperiences} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Job Description"></textarea>
                {errors.workExperiences?.[index]?.description && <span role="alert" className="mt-2 text-sm text-red-600">{errors.workExperiences[index].description.message}</span>}
              </div>
              <div className="mb-5">
                <div className="flex text-center justify-between items-center gap-4">
                  <label htmlFor={`workExperiences.${index}.duration`} className="block mb-2 text-sm font-medium text-gray-900">Duration</label>
                  <input {...register(`workExperiences.${index}.duration`)} type="number" id={`workExperiences.${index}.duration`} aria-invalid={!!errors.workExperiences} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Duration (months)" />
                </div>
                {errors.workExperiences?.[index]?.duration && <span role="alert" className="mt-2 text-sm text-red-600">{errors.workExperiences[index].duration.message}</span>}
              </div>
              <button type="button" onClick={() => remove(index)} aria-label={`Remove work experience ${index}`} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Remove</button>
            </div>
          );
        })}
      </div>

      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
        <input {...register('email')} type="email" id="email" aria-invalid={!!errors.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@email.com" />
        {errors.email && <span role="alert" className="mt-2 text-sm text-red-600">{errors.email.message}</span>}
      </div>

      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
        <input {...register('password')} type="password" id="password" aria-invalid={!!errors.password} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="***********" />
        {errors.password && <span role="alert" className="mt-2 text-sm text-red-600">{errors.password.message}</span>}
      </div>

      <button type="submit" disabled={!isValid} aria-disabled={!isValid} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50">Submit</button>

      <pre className="py-8">{output}</pre>
    </form>
  )
}
