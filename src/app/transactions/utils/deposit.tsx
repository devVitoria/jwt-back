'use client'
import { useForm } from '@tanstack/react-form'
import { BsFillSendFill } from 'react-icons/bs'
import { GoMail } from 'react-icons/go'
import { LiaMoneyBillWaveSolid } from 'react-icons/lia'
import { RiFileUserFill } from 'react-icons/ri'

const Deposit = () => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      console.log('VALUEEE', value)
    },
  })

  const { Field } = form
  return (
    <div className="flex flex-col w-full ">
      <div>
        <p className="text-lg text-white">Efetuar um depósito.</p>
        <p className="text-sm text-white pb-4">
          Informe os campos necessário para prosseguir com o processo.
        </p>
      </div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="gap-4 flex-col flex"
        >
          <Field name="password">
            {(field) => (
              <div className="flex flex-col gap-2 justify-start items-start">
                <div className="flex flex-row gap-2 items-center justify-start">
                  <LiaMoneyBillWaveSolid size={20} />

                  <label htmlFor={field.name} className="text-start text-white text-base">
                    Valor da transação
                  </label>
                </div>
                <input
                  title="email"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className=" w-[33%] bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:border-white/30 focus:outline-none"
                />
              </div>
            )}
          </Field>
          <div className="flex justify-start items-start">
            <button
              type="submit"
              className=" px-18 py-2 cursor-pointer bg-white/5 border border-white/20 rounded-lg hover:via-[#326579] hover:to-[#8ba3ad] transition-all"
            >
              Autorizar operação
              <p className="text-xs">Sua senha será requisitada para finalizar o processo.</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Deposit
