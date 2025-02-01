import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"

const createUserFormSchema = z.object({
  name: z.string().nonempty('O nome é obrigatório.'),
  countries: z.string().nonempty('Escolha um país válido.').refine(value => value !== '', 'Escolha um país válido.'),
  email: z.string().nonempty('O e-mail é obrigatório.').email('Formato de e-mail inválido.'),
  password: z.string().nonempty('A senha é obrigatória').min(8, 'A senha deve ter no mínimo 8 caracteres.'),
  workExperiences: z.array(z.object({
    title: z.string().nonempty('O título do cargo é obrigatório.'),
    description: z.string().nonempty('A descrição das responsabilidades é obrigatória.'),
    duration: z.coerce.number().min(1, 'A duração deve ser no mínimo 1 mês.')
  })).min(1, 'Adicione pelo menos uma experiência profissional.')
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

export default function App() {
  const [output, setOutput] = useState('')

  const { register, handleSubmit, formState: {errors}, control } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  })

  const {fields, append, remove } = useFieldArray({
    control,
    name: 'workExperiences'
  })

  console.log('form state log:', errors)

  function createUser(data: any) {
    setOutput(JSON.stringify(data, null, 2))
  }

  function addWorkExperience(){
    append({title: '', description: '', duration: 0})
  }

  return (
    <form onSubmit={handleSubmit(createUser)} className="max-w-sm mx-auto p-6">

      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
        <input {...register('name')} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""  />
        {errors.name && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.name.message}</span>}
      </div>

      <div className="mb-5">
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your country</label>
        <select {...register('countries')} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="">Choose a country</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
        {errors.countries && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.countries.message}</span>}
      </div>

      <div className="mb-5">
        <div className="flex gap-4 justify-between items-center">
          <label htmlFor="workExperiences" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Work experiences</label>
          <button type="button" onClick={addWorkExperience} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add work experience</button>
        </div>
        {errors.workExperiences && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.workExperiences.message}</span>}
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <div className="mb-5">
                <label htmlFor={`workExperiences.${index}.title`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                <input {...register(`workExperiences.${index}.title`)} type="text" id={`workExperiences.${index}.title`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Job Title" />
                {errors.workExperiences?.[index]?.title && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.workExperiences[index].title.message}</span>}
              </div>
              <div className="mb-5">
                <label htmlFor={`workExperiences.${index}.description`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea {...register(`workExperiences.${index}.description`)} id={`workExperiences.${index}.description`} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Job Description"></textarea>
                {errors.workExperiences?.[index]?.description && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.workExperiences[index].description.message}</span>}
              </div>
              <div className="mb-5">
                <div className="flex text-center justify-between items-center gap-4">
                  <label htmlFor={`workExperiences.${index}.duration`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration</label>
                  <input {...register(`workExperiences.${index}.duration`)} type="number" id={`workExperiences.${index}.duration`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Duration (months)" />
                </div>
                {errors.workExperiences?.[index]?.duration && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.workExperiences[index].duration.message}</span>}
              </div>
              <button type="button" onClick={() => remove(index)} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Remove</button>
            </div>
          );
        })}
      </div>

      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input {...register('email')} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com"  />
        {errors.email && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.email.message}</span>}
      </div>

      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
        <input {...register('password')} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
        {errors.password && <span className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.password.message}</span>}
      </div>

      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

      <pre className="py-8">{output}</pre>
    </form>
  )
}
