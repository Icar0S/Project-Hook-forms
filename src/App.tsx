import { useFieldArray, useForm } from 'react-hook-form';
import './styles/global.css';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


const createUserFormSchema = z.object({
  name: z.string()
    .nonempty("O nome é obrogatório.")
    .transform(name => {
      return name.trim().split(' ').map(word => {
        return word[0].toLocaleUpperCase().concat(word.substring(1))
      }).join(' ')
    }),
  email: z.string()
    .nonempty("O E-mail é obrogatório.")
    .email("Formato de e-mail inválido.")
    .toLowerCase()
    .refine(email => {
      return email.endsWith('@etice.ce.gov.br')
    }, 'O e-mail precisa ser da Etice'),
  password: z.string()
    .min(6, "Precisa de no mínimo 6 caracteres."),
  techs: z.array(z.object({
    title: z.string().nonempty('Título obrigatorio'),
    knowledge: z.coerce.number().min(1).max(10),
  })).min(2, 'Insira no mínimo 2 technologias')
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

export function App() {

  const [output, setOutput] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })


  const { fields, append, remove } = useFieldArray({
    control,
    name: 'techs',
  })

  function addNewTech() {
    append({ title: '', knowledge: 1 })
  }

  function createUser(data: CreateUserFormData) {
    setOutput(JSON.stringify(data, null, 2))
  }

  return (
    <main className='h-screen bg-zinc-900 text-zinc-100 flex flex-row gap-10 items-center justify-center'>
      <form
        onSubmit={handleSubmit(createUser)}
        className='flex flex-col gap-4 w-full max-w-xs'
      >

        <div className='flex flex-col gap-1'>
          <label htmlFor='name'>Nome</label>
          <input
            className='border rounded border-zinc-600 shadow-sm h-10 px-3 bg-zinc-800'
            type="text"
            {...register('name')}
          />
          {errors.name && <span className='text-red-500 text-sm'>{errors.name.message}</span>}
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='email'>E-mail</label>
          <input
            className='border rounded border-zinc-600 shadow-sm h-10 px-3 bg-zinc-800'
            type="email"
            {...register('email')}
          />
          {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='password'>Senha</label>
          <input
            className='border rounded border-zinc-600 shadow-sm h-10 px-3 bg-zinc-800'
            type="password"
            {...register('password')}
          />
          {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}
        </div>


        <div className='flex flex-col gap-1'>
          <label htmlFor='techs' className='flex items-center justify-between'>
            Tecnologias

            <button onClick={addNewTech} type='button' className='text-emerald-500 text-sm'>
              Adicionar
            </button>
          </label>

          {fields.map((field, index) => {
            return (
              <div className='flex gap-2' key={field.id}>

                <div className='flex-1 flex-col gap-1'>
                  <input
                    className='border rounded border-zinc-600 shadow-sm h-10 px-3 bg-zinc-800'
                    type="text"
                    {...register(`techs.${index}.title`)}
                  />
                  {errors.techs?.[index]?.title && <span className='text-red-500 text-sm'>{errors.techs?.[index]?.title?.message}</span>}
                </div>

                <div className='flex flex-col gap-1'>
                  <input
                    className='w-16 border rounded border-zinc-600 shadow-sm h-10 px-3 bg-zinc-800'
                    type="number"
                    {...register(`techs.${index}.knowledge`)}
                  />
                  {errors.techs?.[index]?.knowledge && <span className='text-red-500 text-sm'>{errors.techs?.[index]?.knowledge?.message}</span>}
                </div>

              </div>
            )
          })}

          {errors.techs && <span className='text-red-500 text-sm'>{errors.techs.message}</span>}
        </div>

        <button
          type="submit"
          className='bg-emerald-500 rounded font-semibold text-black h-10 hover:bg-emerald-600'
        >
          Salvar
        </button>
      </form>

      <pre>{output}</pre>

    </main>
  )
}

