import { Endereco } from "./endereco.interface";

export interface Parte {
    id: number;
    nome: string;
    cpfCnpj: string;
    tipoPessoa: number;
    isCliente: boolean;
    telefone: string;
    email: string;
    dataNascimento: string;
    endereco:Endereco;
    createdAt: string;
    createdByUserId: number;
}