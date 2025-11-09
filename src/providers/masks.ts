export function maskCPF(cpfReceived: number | string): string {
  const cpf = String(cpfReceived).replace(/\D/g, '')

  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}


export function maskPhone(phoneReceived: number | string): string {
  const phone = String(phoneReceived).replace(/\D/g, '')

  return phone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4')
}


export function maskCep(cepReceived: number | string): string {
  const cep = String(cepReceived).replace(/\D/g, '')

  return cep.replace(/(\d{5})(\d{3})/, '$1-$2')
}
