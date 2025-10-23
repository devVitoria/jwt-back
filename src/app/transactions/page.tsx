'use client'
import { api } from "@/providers/api"
import { useForm } from "@tanstack/react-form";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { BsCoin } from "react-icons/bs";
import { MdPix } from "react-icons/md";
import { TfiKey } from "react-icons/tfi";

const Transactions = () => {
    const route = useRouter()
    const [operation, setOperation] = useState<'transactions' | 'chavepix' | 'deposite'>("transactions")
   

         const form = useForm({
                defaultValues: {
                    destino: '',
                    origem: '',
                    valor: 0
         
                },
                onSubmit: async ({ value }) => {
                    console.log("VALUEEE", value)
                    console.log("FORMMMMM", form)
                    const teste = await api.post('v1/autenticacao/login', {
                    email: form.getFieldValue("email"),
                    password: form.getFieldValue("password"),
            
    
                   })
                   console.log("TESTEEEE", teste)
                   localStorage.setItem('Token', teste?.data.token)
                   localStorage.setItem("Nome", teste?.data.nameUser )
                   localStorage.setItem("Saldo", teste?.data.saldo )
                   setTimeout(() => {
                   route.push('/transactions')
                   }, 1000)
                },
            })


    console.log("USUARIOOOOOOOOOOOOOO", localStorage.length)
    console.log("Aloiiis", localStorage.getItem('Nome'))
    const awaitUser = async () => {
        return await localStorage.getItem('Nome')
    }
    const awaitSaldo = async () => {
        return await localStorage.getItem("Saldo")
    }

     const [valorContaInit, setValorContaInit] = useState<any>(awaitSaldo())

    return (
        <div className="flex flex-1 flex-col items-center bg-gray-100" style={{ width: '100vw', height: '100vh' }}>
            <header className="w-full bg-white mb-4 shadow-sm">
                <div className="flex flex-row px-10 py-5 w-full justify-between items-center" >
                    <div className="flex flex-col">
                        <p className="text-lg text-gray-600">Bem vindo, {awaitUser()}!</p>
                        <p className="text-sm text-gray-600">Navegue entre as opções abaixo.</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-lg text-gray-600">R$ {awaitSaldo()}</p>
                        <p className="text-sm text-gray-600 text-end">seu saldo</p>
                    </div>
                </div>
            </header>
            <div className="flex flex-row justify-start items-start w-full px-12 pb-4">
                <p className="text-gray-600 text-lg font-bold py-2 text-start">Ações para a sua conta</p>
            </div>

            <main className="flex flex-row justify-around px-10 w-full gap-4">
                <div className="bg-white border-gray-50 shadow-sm p-10 items-center justify-center rounded-sm w-1/2 flex-col gap-8 px-5">
                    <div className="flex w-full flex-col items-center justify-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gray-50 flex justify-center items-center">
                            <MdPix size={30} color="4a5565" />
                        </div>
                        <p className="text-lg text-gray-600 text-center">Transação</p>
                    </div>

                </div>

                <div className="bg-white border-gray-50 shadow-sm p-10 items-center justify-center rounded-sm w-1/2 flex-col gap-8 px-5">
                    <div className="flex w-full flex-col items-center justify-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gray-50 flex justify-center items-center">
                            <TfiKey size={30} color="4a5565" />
                        </div>
                        <p className="text-lg text-gray-600 text-center">Cadastrar chave PIX</p>
                    </div>

                </div>


                <div className="bg-white border-gray-50 shadow-sm p-10 items-center justify-center rounded-sm w-1/2 flex-col gap-8 px-5">
                    <div className="flex w-full flex-col items-center justify-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gray-50 flex justify-center items-center">
                            <BsCoin size={30} color="4a5565" />
                        </div>
                        <p className="text-lg text-gray-600 text-center">Depositar</p>
                    </div>
                </div>
            </main>


                <div className="bg-white border-gray-50 shadow-sm p-10 items-center justify-center rounded-sm w-[96%] flex-col gap-8 px-5 mt-10">
                        <p className="text-lg text-gray-600">Efetuar transação.</p>
                        <p className="text-sm text-gray-600">Informe os campos necessário para prosseguir com o processo.</p>
            </div>
        </div>




    )


}

export default Transactions



