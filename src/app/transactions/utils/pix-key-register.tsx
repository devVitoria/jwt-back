import { useForm } from '@tanstack/react-form'
import { GoPasskeyFill } from 'react-icons/go'

const PixkeyRegister = () => {
  const form = useForm({
    defaultValues: {
      tipo: '',
      chave: '',
    },
    onSubmit: async ({ value }) => {
      console.log('VALUEEE', value)
    },
  })

  const { Field } = form
  return (
    <div className="flex flex-row w-full gap-10">
      <div>
        <p className="text-lg text-white">Cadastrar CHAVE PIX.</p>
        <p className="text-sm text-white pb-4">
          Informe os campos necessário para prosseguir com o processo.
        </p>
        <p className="text-sm text-white pb-4">Selecione o tipo da sua chave PIX.</p>
        <select className="flex mb-8 cursor-pointer flex-row items-center gap-2 w-full py-2 bg-white/5 border border-white/20 rounded-lg px-4 text-white placeholder-white/50 focus:border-white/30 focus:outline-none">
          <option value="pix1" className="text-white bg-[#000a0e]/95 rounded-sm">
            pix1
          </option>
          <option value="pix2" className="text-white bg-[#000a0e]/95 rounded-sm">
            pix2
          </option>
          <option value="pix3" className="text-white bg-[#000a0e]/95 rounded-sm">
            pix3
          </option>
        </select>
        <p className="text-xs font-bold w-full ">CPF | E-MAIL | TELEFONE | NOMEADA - ALEATÓRIA</p>
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
                    <GoPasskeyFill size={20} />

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
              className=" px-18 py-2 cursor-pointer bg-white/5 border border-white/20 rounded-lg hover:via-[#326579] hover:to-[#8ba3ad] transition-all"
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
