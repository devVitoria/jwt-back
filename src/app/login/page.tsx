'use client'
import { api } from "@/providers/api"
import { useForm } from "@tanstack/react-form"
import { useRouter } from 'next/navigation';

const Login = () => {
    const route = useRouter()
     const form = useForm({
            defaultValues: {
                email: '',
                password: '',
     
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
                    <p className="font-bold text-gray-600 justify-center w-full">Iniciar sessão</p>
                    <p className=" text-gray-600 justify-center text-xs w-full pb-4">Preencha os campos abaixo para acessar a sua conta!</p>
                    <div className="flex flex-1 justify-between items-center w-full gap-4">


                        <div className="flex flex-col gap-2 w-full">



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

export default Login



