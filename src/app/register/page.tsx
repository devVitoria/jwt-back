'use client'

import { api } from "@/providers/api"
import { useForm } from "@tanstack/react-form"

const Register = () => {

    const form = useForm({
        defaultValues: {
            cpfcnpj: '',
            nome: '',
            telefone: '',
            rua: '',
            bairro: '',
            cidade: '',
            email: '',
            password: '',
            nroConta: '',
            saldo: '',
        },
        onSubmit: async ({ value }) => {
            console.log("VALUEEE", value)
            console.log("FORMMMMM", form)
           const teste = await api.post('v1/usuarios', {
            cpfcnpj: form.getFieldValue("cpfcnpj"),
            nome: form.getFieldValue("nome"),
            bairro: form.getFieldValue("bairro"),
            rua: form.getFieldValue("rua"),
            telefone: form.getFieldValue("telefone"),
            cidade: form.getFieldValue("cidade"),
            email: form.getFieldValue("email"),
            password: form.getFieldValue("password"),
            conta: {
                nroConta: form.getFieldValue("nroConta"),
                saldo: form.getFieldValue("saldo")
            }

           })
           console.log('o que veuio disso au', teste)
        },
    })

    return (
        <div className="flex flex-1 justify-center items-center bg-gray-100" style={{ width: '100vw', height: '100vh' }}>
            <div className="bg-white border-gray-50 shadow-sm p-10 items-center justify-between rounded-sm w-1/2">
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                >
                    <p className="font-bold text-gray-600 justify-center w-full">Cadastro de usuários</p>
                         <p className=" text-gray-600 justify-center text-xs w-full pb-4">Preencha os campos abaixo para registrar a sua conta!</p>
                    <div className="flex flex-1 justify-between items-center w-full gap-4">
                        <div className="flex flex-col gap-2 w-full">

                            <form.Field
                                name="cpfcnpj"
                                children={(field) => (
                                    <div className="flex flex-col gap-2 py-2">
                                        <label htmlFor={field.name} className="font-bold text-gray-600 text-xs">CPF ou CNPJ:</label>
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        className="bg-gray-100 rounded-sm p-1 px-4 items-center outline-blue-100"
                                        />
                                    </div>
                                )}
                            />
                            <form.Field
                                name="nome"
                                children={(field) => (
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor={field.name} className="font-bold text-gray-600 text-xs">Nome:</label>
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="bg-gray-100 rounded-sm p-1 px-4 items-center outline-blue-100"
                                        />
                                    </div>
                                )}
                            />

                            <form.Field
                                name="telefone"
                                children={(field) => (
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor={field.name} className="font-bold text-gray-600 text-xs">Telefone:</label>
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="bg-gray-100 rounded-sm p-1 px-4 items-center outline-blue-100"
                                        />
                                    </div>
                                )}
                            />

                            <form.Field
                                name="rua"
                                children={(field) => (
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor={field.name} className="font-bold text-gray-600 text-xs">Rua:</label>
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="bg-gray-100 rounded-sm p-1 px-4 items-center outline-blue-100"
                                        />
                                    </div>
                                )}
                            />



                            <form.Field
                                name="bairro"
                                children={(field) => (
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor={field.name} className="font-bold text-gray-600 text-xs">Bairro:</label>
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="bg-gray-100 rounded-sm p-1 px-4 items-center outline-blue-100"
                                        />
                                    </div>
                                )}
                            />

                        </div>

                        <div className="flex flex-col gap-2 w-full">



                            <form.Field
                                name="cidade"
                                children={(field) => (
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor={field.name} className="font-bold text-gray-600 text-xs">Cidade:</label>
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="bg-gray-100 rounded-sm p-1 px-4 items-center outline-blue-100"
                                        />
                                    </div>
                                )}
                            />


                            <form.Field
                                name="email"
                                children={(field) => (
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor={field.name} className="font-bold text-gray-600 text-xs">E-mail:</label>
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="bg-gray-100 rounded-sm p-1 px-4 items-center outline-blue-100"
                                        />
                                    </div>
                                )}
                            />



                            <form.Field
                                name="password"
                                children={(field) => (
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor={field.name} className="font-bold text-gray-600 text-xs">Password:</label>
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="bg-gray-100 rounded-sm p-1 px-4 items-center outline-blue-100"
                                        />
                                    </div>
                                )}
                            />

                            <form.Field
                                name="nroConta"
                                children={(field) => (
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor={field.name} className="font-bold text-gray-600 text-xs">Número da conta:</label>
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="bg-gray-100 rounded-sm p-1 px-4 items-center outline-blue-100"
                                        />
                                    </div>
                                )}
                            />
                            <form.Field
                                name="saldo"
                                children={(field) => (
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor={field.name} className="font-bold text-gray-600 text-xs">Valor inicial da conta:</label>
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="bg-gray-100 rounded-sm p-1 px-4 items-center outline-blue-100"
                                        />
                                    </div>
                                )}
                            />
                        </div>
                        </div>
                        <div className="flex w-full justify-end items-end">
                        <button type="submit" className="bg-[#4a5565] text-white font-bold p-1 rounded-sm shadow-sm px-6 mt-4 items-end cursor-pointer hover:bg-gray-400 transition-colors">Enviar</button>
                        </div>
                </form>
            </div>


        </div>
    )
}

export default Register