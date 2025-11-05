'use client'
import { api } from '@/providers/api'
import { useForm } from '@tanstack/react-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BsCoin } from 'react-icons/bs'
import { FaHistory } from 'react-icons/fa'
import { MdPix } from 'react-icons/md'
import { TfiKey } from 'react-icons/tfi'
import Transaction from './utils/transaction'
import PixkeyRegister from './utils/pix-key-register'
import Deposit from './utils/deposit'

const Transactions = () => {
  const route = useRouter()
  const [operation, setOperation] = useState<'transactions' | 'history' | 'chavepix' | 'deposite'>(
    'transactions',
  )

  const form = useForm({
    defaultValues: {
      destino: '',
      origem: '',
      valor: 0,
    },
    onSubmit: async ({ value }) => {
      console.log('VALUEEE', value)
      console.log('FORMMMMM', form)
      const teste = await api.post('v1/autenticacao/login', {
        // email: form.getFieldValue('email'),
        // password: form.getFieldValue('password'),
      })
      console.log('TESTEEEE', teste)
      localStorage.setItem('Token', teste?.data.token)
      localStorage.setItem('Nome', teste?.data.nameUser)
      localStorage.setItem('Saldo', teste?.data.saldo)
      setTimeout(() => {
        route.push('/transactions')
      }, 1000)
    },
  })

  console.log('USUARIOOOOOOOOOOOOOO', localStorage.length)
  console.log('Aloiiis', localStorage.getItem('Nome'))
  //   const awaitUser = async () => {
  //     return await localStorage.getItem('Nome')
  //   }
  //   const awaitSaldo = async () => {
  //     return await localStorage.getItem('Saldo')
  //   }

  //   const [valorContaInit, setValorContaInit] = useState<any>(awaitSaldo())

  const renderScreen: Record<string, React.ReactNode> = {
    transactions: <Transaction />,
    history: <div>Histórico de transações</div>,
    chavepix: <PixkeyRegister />,
    deposite: <Deposit />,
  }

  return (
    <div
      className="flex flex-1  min-h-screen  flex-col bg-gradient-to-r from-[#000a0e] via-[#062c38] to-[#122b36]"
      style={{ width: '100vw' }}
    >
      <header
        className="bg-white/5 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl m-2 py-2
      "
      >
        <div className="flex flex-row px-10 py-3 w-full justify-between items-center">
          <div className="flex flex-col">
            <p className="text-lg text-white">Bem vindo, {'Vitória'}!</p>
            <p className="text-sm text-white">Navegue entre as opções abaixo.</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg text-white">R$ {0}</p>
            <p className="text-sm text-gray-600 text-end">seu saldo</p>
          </div>
        </div>
      </header>
      <div className="flex flex-row justify-center items-center w-full pb-10 pt-8">
        <div className="w-full mx-2 rounded-lg bg-[#000a0e]/25 shadow-sm border border-b-white/10 border-t-white/10 border-transparent  flex justify-center items-center">
          <p className="text-white text-lg font-bold py-2 text-center">Ações para a sua conta</p>
        </div>
      </div>

      <main className="flex flex-row justify-between px-10 w-full gap-4">
        <div
          onClick={() => setOperation('transactions')}
          className={`bg-white/5 backdrop-blur-lg border ${operation === 'transactions' ? 'border-white ' : 'border-white/20'} shadow-xl rounded-lg py-2 w-64`}
        >
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <div
              className={`w-16 h-16 rounded-full bg-[#000a0e]/25 shadow-sm border ${operation === 'transactions' ? 'border-white ' : 'border-[#000a0e]'} border-white flex justify-center items-center`}
            >
              <MdPix size={30} color="white" />
            </div>
            <p className="text-lg text-white text-center">Transação</p>
          </div>
        </div>

        <div
          onClick={() => setOperation('history')}
          className={`bg-white/5 backdrop-blur-lg border ${operation === 'history' ? 'border-white ' : 'border-white/20'} shadow-xl rounded-lg py-2 w-64`}
        >
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <div
              className={`w-16 h-16 rounded-full bg-[#000a0e]/25 shadow-sm border ${operation === 'history' ? 'border-white ' : 'border-[#000a0e]'}  flex justify-center items-center`}
            >
              <FaHistory size={30} color="white" />
            </div>
            <p className="text-lg text-white text-center">Histórico de transações</p>
          </div>
        </div>

        <div
          onClick={() => setOperation('chavepix')}
          className={`bg-white/5 backdrop-blur-lg border ${operation === 'chavepix' ? 'border-white ' : 'border-white/20'} shadow-xl rounded-lg py-2 w-64`}
        >
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <div
              className={`w-16 h-16 rounded-full bg-[#000a0e]/25 shadow-sm border ${operation === 'chavepix' ? 'border-white ' : 'border-[#000a0e]'} flex justify-center items-center`}
            >
              <TfiKey size={30} color="white" />
            </div>
            <p className="text-lg text-white text-center">Cadastrar chave PIX</p>
          </div>
        </div>

        <div
          onClick={() => setOperation('deposite')}
          className={`bg-white/5 backdrop-blur-lg border ${operation === 'deposite' ? 'border-white ' : 'border-white/20'} shadow-xl rounded-lg py-2 w-64`}
        >
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <div
              className={`w-16 h-16 rounded-full bg-[#000a0e]/25 shadow-sm border ${operation === 'deposite' ? 'border-white ' : 'border-[#000a0e]'} flex justify-center items-center`}
            >
              <BsCoin size={30} color="white" />
            </div>
            <p className="text-lg text-white text-center">Depositar</p>
          </div>
        </div>
      </main>
      <div className="w-full flex-1 flex justify-center items-center">
        <div className=" bg-[#000a0e]/25 shadow-sm border border-[#000a0e] w-full mx-2 p-10 items-center justify-center rounded-sm flex-col gap-8 px-5 mt-10">
          {renderScreen[operation]}
        </div>
      </div>
    </div>
  )
}

export default Transactions
