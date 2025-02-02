# React + Hook Form 🤝 Zod

React Hook Form é uma biblioteca popular para gerenciamento de formulários em React. Ela oferece uma API simples e eficiente para lidar com validações, erros e submissões de formulários. 

Zod é uma biblioteca de validação de esquemas que permite definir e validar estruturas de dados de forma segura e declarativa.

A combinação dessas duas bibliotecas permite criar formulários robustos e seguros, com validações complexas e feedback claro para o usuário.

## Dependências

 - `react-hook-form`: Biblioteca para gerenciamento de formulários.

 - `zod`: Biblioteca para validação de esquemas.

 - `@hookform/resolvers`: Integração entre React Hook Form e bibliotecas de validação como Zod.

```
pnpm install react-hook-form zod @hookform/resolvers
```
## Estrutura do Código

O código está estruturado em um único componente React que define um formulário de cadastro de usuário. 

O formulário inclui campos para nome, e-mail, senha, país e uma lista dinâmica(field array) de experiências profissionais.

## React Hook Form
React Hook Form é uma biblioteca que simplifica o gerenciamento de formulários em React. Ela utiliza hooks para controlar o estado do formulário, validações e erros. Alguns dos principais conceitos incluem:

 - `useForm`: Hook principal para gerenciar o estado do formulário.

 - `register`: Função para registrar campos do formulário.

 - `handleSubmit`: Função para lidar com a submissão do formulário.

 - `handleSubmit`: Objeto que contém o estado do formulário, incluindo erros.

 - `useFieldArray`: Hook para gerenciar arrays de campos dinâmicos.

## Zod
Zod é uma biblioteca de validação de esquemas que permite definir estruturas de dados e validar entradas de forma segura. Ela é altamente configurável e oferece uma sintaxe declarativa para definir regras de validação.

Alguns dos principais conceitos incluem:

- `z.object`: Define um esquema de objeto.

- ` z.string, z.number, etc.`: Define tipos de dados.

- `nonempty, email, min, etc.`: Métodos para adicionar regras de validação.

## Integração React Hook Form e Zod
A integração entre React Hook Form e Zod é feita através do pacote @hookform/resolvers. Esse pacote permite que o React Hook Form utilize o Zod como um resolvedor de validação.

No código, isso é feito da seguinte forma:

```ts
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createUserFormSchema = z.object({
  // Definição do esquema
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(createUserFormSchema),
});
```

## Definição do Esquema com Zod
O esquema createUserFormSchema define a estrutura e as regras de validação para o formulário:

```ts
const createUserFormSchema = z.object({
  name: z.string().nonempty('Name is required.'),
  countries: z.string().nonempty('Please select a valid country.').refine(value => value !== '', 'Please select a valid country.'),
  email: z.string().nonempty('Email is required.').email('Invalid email format.'),
  password: z.string().nonempty('Password is required.').min(8, 'Password must be at least 8 characters long.'),
  workExperiences: z.array(z.object({
    title: z.string().nonempty('Job title is required.'),
    description: z.string().nonempty('Responsibilities description is required.'),
    duration: z.coerce.number().min(1, 'Duration must be at least 1 month.')
  })).min(1, 'Please add at least one work experience.')
});
```

## Uso do React Hook Form
O hook useForm é utilizado para gerenciar o estado do formulário, com o resolvedor zodResolver integrado:

```ts
const { register, handleSubmit, formState: { errors }, control } = useForm<CreateUserFormData>({
  resolver: zodResolver(createUserFormSchema)
});
```

## Campos Dinâmicos com useFieldArray
O hook useFieldArray é utilizado para gerenciar a lista dinâmica de experiências profissionais:

```ts
const { fields, append, remove } = useFieldArray({
  control,
  name: 'workExperiences'
});
```

## Renderização do Formulário
O formulário é renderizado com campos para nome, e-mail, senha, país e experiências profissionais. Cada campo é registrado com a função register, e os erros são exibidos condicionalmente:

```ts
<form onSubmit={handleSubmit(createUser)} className="max-w-sm mx-auto p-6">
  {/* Campos do formulário */}
</form>
```

## Submissão do Formulário
A função createUser é chamada quando o formulário é submetido, e o resultado é exibido em um elemento `<pre>`:


```ts
function createUser(data: any) {
  setOutput(JSON.stringify(data, null, 2));
}
```

## Links Úteis
 - [Documentação do React Hook Form](https://react-hook-form.com/)
 - [Documentação do Zod](https://zod.dev/)
 - [Integração React Hook Form e Zod](https://github.com/react-hook-form/resolvers)


