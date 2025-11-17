export interface ModalPixConsultProps {
    closeModal: () => void
}

export interface PixUserData {
    tipo: string;
    usuarioId: number;
    chave: string;
    id: number;
    cpfcnpj: string;
    nome: string;
    telefone: string;
    rua: string;
    bairro: string;
    cidade: string;
    email: string;
    password: string;
    contaId: number;
}