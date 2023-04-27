import { useForm } from 'react-hook-form';
import './styles/global.css';
import { useState } from 'react';

export function App() {

  const [output, setOutput] = useState('')
  const { register, handleSubmit } = useForm()

  function createUser(data: any) {
    setOutput(JSON.stringify(data, null, 2))
  }

  return (
    <main className='h-screen bg-zinc-900 text-zinc-100 flex flex-col gap-10 items-center justify-center'>
      <form
        onSubmit={handleSubmit(createUser)}
        className='flex flex-col gap-4 w-full max-w-xs'
      >

        <div className='flex flex-col gap-1'>
          <label htmlFor=''>E-mail</label>
          <input
            className='border rounded border-zinc-600 shadow-sm h-10 px-3 bg-zinc-800'
            type="email"
            {...register('email')}
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor=''>Senha</label>
          <input
            className='border rounded border-zinc-600 shadow-sm h-10 px-3 bg-zinc-800'
            type="password"
            {...register('password')}
          />
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

