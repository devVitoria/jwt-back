import { api } from '@/providers/api'
import { useForm } from '@tanstack/react-form'
import { useEffect, useState } from 'react'
import { GoPasskeyFill } from 'react-icons/go'
import { toast } from 'react-toastify'

const PixkeyRegister = () => {
  const [keyType, setKeyType] = useState('CPF')
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm({
    defaultValues: {
      chave: '',
    },
    onSubmit: async () => {
      const teste = await api.post('/v1/chaves', {
        chave: form.getFieldValue('chave'),
        tipo: keyType,
        usuarioId: localStorage.getItem('UserId'),
      })

      if (teste.status) setIsSuccess(true)
    },
  })

  const { Field } = form

  useEffect(() => {
    if (!isSuccess) return
    toast.success('Chave PIX cadastrada com sucesso!')
    form.reset()
  }, [isSuccess])

  return (
    <div className="flex flex-row w-full gap-10">
      <div>
        <p className="text-lg text-white">Cadastrar CHAVE PIX.</p>
        <p className="text-sm text-white pb-4">
          Informe os campos necessário para prosseguir com o processo.
        </p>
        <p className="text-sm text-white pb-4">Selecione o tipo da sua chave PIX.</p>
        <select
          value={keyType}
          onChange={(v) => {
            setKeyType(v.target.value)
          }}
          className="flex mb-8 cursor-pointer flex-row items-center gap-2 w-full py-2 bg-white/5 border border-white/20 rounded-lg px-4 text-white placeholder-white/50 focus:border-white/30 focus:outline-none"
        >
          <option value="CPF" className="text-white bg-[#000a0e]/95 rounded-sm">
            CPF
          </option>
          <option value="E-MAIL" className="text-white bg-[#000a0e]/95 rounded-sm">
            E-MAIL
          </option>
          <option value="TELEFONE" className="text-white bg-[#000a0e]/95 rounded-sm">
            TELEFONE
          </option>

          <option value="NOMEADA - ALEATÓRIA" className="text-white bg-[#000a0e]/95 rounded-sm">
            NOMEADA - ALEATÓRIA
          </option>
        </select>
        <p className="text-xs font-bold w-full text-white">
          CPF | E-MAIL | TELEFONE | NOMEADA - ALEATÓRIA
        </p>
      </div>
      <div className="ml-20 mt-2">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="gap-4 flex-col"
        >
          <div className="gap-4 flex flex-row justify-center mb-4">
            <Field name="chave">
              {(field) => (
                <div className="flex w-full flex-col gap-2 justify-center items-center">
                  <div className="flex w-full flex-row gap-2 items-center  justify-start ms-1">
                    <GoPasskeyFill size={20} color="white" />

                    <label htmlFor={field.name} className="text-start text-white text-base">
                      Chave
                    </label>
                  </div>
                  <input
                    title="email"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:border-white/30 focus:outline-none"
                  />
                </div>
              )}
            </Field>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className=" px-18 py-2 cursor-pointer bg-white/5 border border-white/20 rounded-lg hover:via-[#326579] hover:to-[#8ba3ad] transition-all text-white"
            >
              Autorizar cadastro
              <p className="text-xs">Sua senha será requisitada para finalizar o processo.</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default PixkeyRegister
