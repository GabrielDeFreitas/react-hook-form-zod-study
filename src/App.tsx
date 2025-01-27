import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const createUserFormSchema = z.object({
  name: z.string().nonempty('O nome é obrigatório.'),
  countries: z.string().nonempty('Escolha um país válido.').refine(value => value !== '', 'Escolha um país válido.'),
  email: z.string().nonempty('O e-mail é obrigatório.').email('Formato de e-mail inválido.'),
  password: z.string().nonempty('A senha é obrigatória').min(8, 'A senha deve ter no mínimo 8 caracteres.'),
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

export default function App() {
  const [output, setOutput] = useState('')

  const { register, handleSubmit, formState: {errors} } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  })

  console.log('form state log:', errors)

  function createUser(data: any) {
    setOutput(JSON.stringify(data, null, 2))
  }

  return (
    <form onSubmit={handleSubmit(createUser)} className="max-w-sm mx-auto p-6">
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
        <input {...register('name')} type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""  />
        {errors.name && <span>{errors.name.message}</span>}
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
        {errors.countries && <span>{errors.countries.message}</span>}
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input {...register('email')} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com"  />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
        <input {...register('password')} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

      <pre className="py-8">{output}</pre>
    </form>
  )
}
