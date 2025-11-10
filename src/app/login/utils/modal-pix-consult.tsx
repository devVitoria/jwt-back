import { useForm } from '@tanstack/react-form'
import { FaSearch } from 'react-icons/fa'
import { IoMdCloseCircle } from 'react-icons/io'
import { IoPlayBack } from 'react-icons/io5'
import { MdContentCopy, MdPersonSearch } from 'react-icons/md'
import { TbPlayerTrackNextFilled } from 'react-icons/tb'
import { ModalPixConsultProps } from './interface'

const ModalPixConsult = ({ closeModal }: ModalPixConsultProps) => {
  const form = useForm({
    defaultValues: {
      cpf: '',
    },
    onSubmit: async ({ value }) => {
    },
  })

  const { Field } = form
  return (
    <div className="w-full h-full bg-white/95 p-10 rounded-sm">
      <div className="absolute top-4 right-4 cursor-pointer " onClick={closeModal}>
        <IoMdCloseCircle size={20} color="#031d2b" />
      </div>
      <h3 className="text-base text-[#062531] font-bold text-center">Consulta de Chave PIX</h3>
      <p className="text-[#062531] text-sm ">
        Digite um CPF no campo abaixo para buscar dados específicos
      </p>

      <Field name="cpf">
        {(field) => (
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="flex flex-row gap-1 items-center pt-4 justify-start ms-1 w-full">
              <MdPersonSearch size={20} color="#031d2b" />

              <label
                htmlFor={field.name}
                className="text-start w-10/12 text-[#031d2b] font-bold text-sm"
              >
                CPF
              </label>
            </div>
            <input
              title="email"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full overflow-hidden bg-[#031d2b]/25  border border-[#031d2b]/20 rounded-lg px-4 py-[9px] text-[#031d2b] placeholder-white/50 focus:border-white/30 focus:outline-none"
            />
            <div className="p-[11px] bg-gradient-to-r from-[#326579] via-[#446b77] to-[#8ba3ad] backdrop-blur-lg justify-center items-center absolute right-10 top-[128px] rounded-r-lg border  border-[#031d2b]/20 cursor-pointer">
              <FaSearch size={18} color="white" />
            </div>
          </div>
        )}
      </Field>

      <div className="w-full mt-6">
        <div className="w-full h-1/2 border-1 border-[#326579] rounded-md">
          <div className="flex flex-row justify-around py-3 bg-[#326579] rounded-t-md">
            <p className="text-white text-sm font-bold text-center">CPF</p>
            <p className="text-white text-sm font-bold text-center">Nome</p>
            <p className="text-white text-sm font-bold text-center">Chave</p>
          </div>
          <div className="flex flex-row w-full  px-5 py-3 border-b border-gray-300">
            <p className="text-[#031d2b] text-xs w-32 text-center">000.000.000-00</p>
            <p className="text-[#031d2b] text-xs text-center w-32">Vitor Hugo</p>
            <div className="flex flex-row w-32 items-center gap-1 justify-end">
              <p className="text-[#031d2b] text-xs">sdsdd </p>
              <MdContentCopy color="#031d2b" />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 pt-1 w-full justify-end items-center">
          <IoPlayBack color="#326579" className="cursor-pointer" onClick={() => {}} />

          <div className="w-6 h-4 rounded-sm bg-[#326579] flex justify-center items-center">
            <p className="text-xs">1</p>
          </div>
          <p className="text-[#326579] font-bold">...</p>
          <div className="w-6 h-4  rounded-sm bg-[#326579] flex justify-center items-center">
            <p className="text-xs">10</p>
          </div>
          <TbPlayerTrackNextFilled color="#326579" className="cursor-pointer" onClick={() => {}} />
        </div>
      </div>
    </div>
  )
}
export default ModalPixConsult
