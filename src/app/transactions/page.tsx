'use client'
import { api } from '@/providers/api'
import { useForm } from '@tanstack/react-form'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BsCoin, BsPencilSquare } from 'react-icons/bs'
import { FaHistory, FaUserCircle } from 'react-icons/fa'
import { MdDelete, MdOutlineLogout, MdPix } from 'react-icons/md'
import { TfiKey } from 'react-icons/tfi'
import Transaction from './utils/transaction'
import PixkeyRegister from './utils/pix-key-register'
import Deposit from './utils/deposit'
import { UserInfoProps } from './utils/interface'
import { toast } from 'react-toastify'
import { BiSearchAlt } from 'react-icons/bi'

const Transactions = () => {
  const [operation, setOperation] = useState<'transactions' | 'history' | 'chavepix' | 'deposite'>(
    'transactions',
  )
  const [saldo, setSaldo] = useState<number>(Number(localStorage.getItem('Saldo')) ?? 0)
  const [chaves, setChaves] = useState<{ chave: string; tipo: string }[]>([])
  const [user, setUser] = useState<UserInfoProps>()
  const [searchData, setSearchData] = useState<{ open: boolean | null, data: string | null }>({ open: null, data: null })
  const [openUser, setOpenUser] = useState<boolean | null>(null)
  const [usersInfo, setUsersInfo] = useState<UserInfoProps[]>()
  const [transactionsInfo, setTransactionsInfo] = useState<any[]>()


  const router = useRouter()
  const form = useForm({
    defaultValues: user,
    onSubmit: async () => {
      const teste = await api.patch(`http://localhost:4000/v1/usuarios/${localStorage.getItem('UserId')}`, {
        cpfcnpj: form.getFieldValue('cpfcnpj'),
        nome: form.getFieldValue('nome'),
        bairro: form.getFieldValue('bairro'),
        rua: form.getFieldValue('rua'),
        telefone: form.getFieldValue('telefone'),
        cidade: form.getFieldValue('cidade'),
        email: form.getFieldValue('email'),

      })

      if (teste.status === 200) {
        setOpenUser(false)
        toast.success('Dados atualizados com sucesso!')
      } else {
        toast.error('Erro ao atualizar dados. Tente novamente.')
      }


    },
  })



  const renderScreen: Record<string, React.ReactNode> = {
    transactions: <Transaction setChaves={setChaves} chaves={chaves} setSaldo={setSaldo} />,
    history: <div className="text-white">Histórico de transações</div>,
    chavepix: <PixkeyRegister />,
    deposite: <Deposit setSaldo={setSaldo} />,
  }

  useEffect(() => {
    const getUser = async () => {
      const teste = await api.get<UserInfoProps>(`v1/usuarios/${localStorage.getItem('UserId')}`)
      setUser(teste.data)
    }
    getUser()

  }, [openUser])

  const handleDeleteAccount = async () => {
    const response = await api.delete(`http://localhost:4000/v1/usuarios/${localStorage.getItem('UserId')}`)
    if (response.status === 200) {
      localStorage.clear()
      router.push('/login')
    }
    else {
      toast.error('Erro ao deletar conta. Tente novamente.')
    }
  }

  const { Field } = form


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
            <p className="text-lg text-white">
              Bem vindo, {localStorage.getItem('Nome')?.trim().split(' ')[0]}!
            </p>
            <p className="text-sm text-white">Navegue entre as opções abaixo.</p>
          </div>
          <div className="flex flex-row items-center gap-8">
            <div className="flex flex-col">
              <p className="text-lg text-white">R$ {saldo}</p>
              <p className="text-sm text-white text-end">seu saldo</p>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <FaUserCircle
                color="white"
                size={30}
                className='cursor-pointer'
                onClick={() => {
                  setOpenUser(!openUser)
                }}
              />
              <BiSearchAlt color="white"
                className='cursor-pointer'

                size={30}
                onClick={() => {
                  setSearchData(searchData.open ? { open: false, data: null } : { open: true, data: null })
                }} />

            </div>


          </div>
        </div>
      </header>
      <div className="flex flex-row justify-center items-center w-full pb-10 pt-8">
        <div className="w-full mx-2 rounded-lg bg-white/5 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl m-2 py-2 shadow-sm border border-b-white/10 border-t-white/10 border-transparent  flex justify-center items-center">
          <p className="text-white text-lg font-bold py-2 text-center">Ações para a sua conta</p>
        </div>
      </div>
      {openUser && (
        <div className="absolute z-50 bg-white/5 backdrop-blur-lg border border-white/20 shadow-xl right-10 top-20 w-1/3 rounded-sm p-4">
          <p className="text-white font-bold text-center pb-4">Dados da sua conta</p>
          <div className="bg-[#000a0e]/25 flex-col p-4 gap-4 flex">
            <div className=' max-h-80 overflow-auto gap-4 flex flex-col'>
              <div className='flex flex-row justify-between items-center w-full'>
                <Field name="cpfcnpj">
                  {(field) => (
                    <div className="flex flex-1 flex-col gap-2 justify-center items-center">
                      <div className="flex flex-row gap-2 items-center w-10/12 justify-start ms-1">

                        <label htmlFor={field.name} className="text-xs text-white font-bold">
                          <b>CPF</b>
                        </label>
                      </div>
                      <input
                        title="cpfcnpj"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-10/12 bg-white/5 border border-white/20 rounded-lg px-4  text-white placeholder-white/50 focus:border-white/30 focus:outline-none py-1"
                      />
                    </div>
                  )}
                </Field>

              </div>


              <div className='flex  flex-row justify-between items-center w-full'>

                <Field name="nome">
                  {(field) => (
                    <div className="flex flex-1  flex-col gap-2 justify-center items-center">
                      <div className="flex flex-row gap-2 items-center w-10/12 justify-start ms-1">

                        <label htmlFor={field.name} className="text-xs text-white font-bold">
                          <b>Nome</b>
                        </label>
                      </div>
                      <input
                        title="cpfcnpj"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-10/12 bg-white/5 border border-white/20 rounded-lg px-4  text-white placeholder-white/50 focus:border-white/30 focus:outline-none py-1"
                      />
                    </div>

                  )}
                </Field>

              </div>

              <div className='flex flex-row justify-between items-center w-full'>

                <Field name="telefone">
                  {(field) => (
                    <div className="flex flex-1  flex-col gap-2 justify-center items-center">
                      <div className="flex flex-row gap-2 items-center w-10/12 justify-start ms-1">

                        <label htmlFor={field.name} className="text-xs text-white font-bold">
                          <b>Telefone</b>
                        </label>
                      </div>
                      <input
                        title="cpfcnpj"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-10/12 bg-white/5 border border-white/20 rounded-lg px-4  text-white placeholder-white/50 focus:border-white/30 focus:outline-none py-1"
                      />
                    </div>
                  )}
                </Field>

              </div>

              <div className='flex flex-row justify-between items-center w-full'>

                <Field name="email">
                  {(field) => (
                    <div className="flex  flex-1  flex-col gap-2 justify-center items-center">
                      <div className="flex flex-row gap-2 items-center w-10/12 justify-start ms-1">

                        <label htmlFor={field.name} className="text-xs text-white font-bold">
                          <b>E-mail</b>
                        </label>
                      </div>
                      <input
                        title="cpfcnpj"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-10/12 bg-white/5 border border-white/20 rounded-lg px-4  text-white placeholder-white/50 focus:border-white/30 focus:outline-none py-1"
                      />
                    </div>
                  )}
                </Field>

              </div>

              <div className='flex flex-row justify-between items-center w-full'>

                <Field name="bairro">
                  {(field) => (
                    <div className="flex flex-1  flex-col gap-2 justify-center items-center">
                      <div className="flex flex-row gap-2 items-center w-10/12 justify-start ms-1">

                        <label htmlFor={field.name} className="text-xs text-white font-bold">
                          <b>Bairro</b>
                        </label>
                      </div>
                      <input
                        title="cpfcnpj"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-10/12 bg-white/5 border border-white/20 rounded-lg px-4  text-white placeholder-white/50 focus:border-white/30 focus:outline-none py-1"
                      />
                    </div>
                  )}
                </Field>

              </div>
              <div className='flex  flex-row justify-between items-center w-full'>

                <Field name="cidade">
                  {(field) => (
                    <div className="flex flex-1  flex-col gap-2 justify-center items-center">
                      <div className="flex flex-row gap-2 items-center w-10/12 justify-start ms-1">

                        <label htmlFor={field.name} className="text-xs text-white font-bold">
                          <b>Cidade</b>
                        </label>
                      </div>
                      <input
                        title="cpfcnpj"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-10/12 bg-white/5 border border-white/20 rounded-lg px-4  text-white placeholder-white/50 focus:border-white/30 focus:outline-none py-1"
                      />
                    </div>
                  )}
                </Field>

              </div>
              <div className='flex flex-row justify-between items-center w-full'>

                <Field name="rua">
                  {(field) => (
                    <div className="flex flex-1  flex-col gap-2 justify-center items-center">
                      <div className="flex flex-row gap-2 items-center w-10/12 justify-start ms-1">

                        <label htmlFor={field.name} className="text-xs text-white font-bold">
                          <b>Rua</b>
                        </label>
                      </div>
                      <input
                        title="cpfcnpj"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-10/12 bg-white/5 border border-white/20 rounded-lg px-4  text-white placeholder-white/50 focus:border-white/30 focus:outline-none py-1"
                      />
                    </div>
                  )}
                </Field>


              </div>
            </div>
            <div className='flex flex-row gap-4 items-center w-full justify-between ' onClick={() => {
              form.handleSubmit()
            }}>
              <label className="text-xs text-white font-bold">
                <b>Salvar alterações</b>
                <p className='text-xs text-white font-extralight'>Isso alterará suas informações cadastrais.</p>
              </label>

              <BsPencilSquare size={18} className='mr-10' />
            </div>


            <div className='flex flex-row gap-4 items-center w-full justify-between ' onClick={() => {
              localStorage.clear()
              router.push('/login')
            }}>
              <label className="text-xs text-white font-bold">
                <b>Sair</b>
                <p className='text-xs text-white font-extralight'>Deslogar sua conta.</p>
              </label>

              <MdOutlineLogout size={18} className='mr-10' />
            </div>

            <div className='flex flex-row gap-4 items-center w-full justify-between ' onClick={() => {
              handleDeleteAccount()
            }}>
              <label className="text-xs text-white font-bold">
                <b>Deletar conta</b>
                <p className='text-xs text-white font-extralight'>Sua conta será permanentemente excluída.</p>
              </label>

              <MdDelete size={18} className='mr-10' />
            </div>
          </div>
        </div>
      )
      }

      {searchData.open && (
        <div className="absolute z-50 bg-white/5 backdrop-blur-lg border border-white/20 shadow-xl left-1/3 top-1/5 w-1/3 rounded-sm p-4">
          <p className="text-white font-bold text-center pb-4">Buscar dados</p>
          <div className='flex flex-row justify-around items-center'>
            <p className="text-white text-sm text-center pb-4 hover:text-[15px] hover:font-bold" onClick={() => setSearchData((prev) => ({
              ...prev,
              data: 'user',
            }))}>Usuários</p>
            <p className="text-white text-sm text-center pb-4 hover:text-[15px] hover:font-bold" onClick={() => setSearchData((prev) => ({
              ...prev,
              data: 'trs',
            }))}>Transações</p>
          </div>
          <div className="bg-[#000a0e]/25 flex-col p-4 gap-4 flex">
            <div className=' max-h-80 overflow-auto gap-4 flex flex-col'></div>
          </div> </div>)
      }
      <main className="flex flex-row justify-between px-10 w-full gap-4">
        <div
          onClick={() => setOperation('transactions')}
          className={`bg-white/5 backdrop-blur-lg border ${operation === 'transactions' ? 'border-white ' : 'border-white/20'} shadow-xl rounded-lg py-2 w-64`}
        >
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <div
              className={`w-16 h-16 rounded-full bg-[#000a0e]/25 shadow-sm border ${operation === 'transactions' ? 'border-white ' : 'border-[#000a0e]'} flex justify-center items-center`}
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
            <p className="text-lg text-white text-center text-white">Histórico de transações</p>
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
    </div >
  )
}

export default Transactions
