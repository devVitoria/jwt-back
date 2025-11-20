export interface UserInfoProps {
    id: number,
    cpfcnpj: string,
    nome: string,
    telefone: string,
    rua: string,
    bairro: string,
    cidade: string,
    email: string,
    password: string
}


export interface TransactionProps {
    transacao: {
        chave_origem: {
            chave: string
        },
        chave_destino: {
            chave: string
        },
        data_transferencia: string,
        mensagem: string,
        valor: number,
        id: number
    },
    novoSaldo: number
}