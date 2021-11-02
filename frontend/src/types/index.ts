import { CSSProperties } from "react"

type LocalStorageLogin = {
    login: {
        user: string,
        password: string,
        token: string
    } | null
}

type LocalStorageLead = {
    informacao: ObjetoInformacaoLead,
    arrayRow: ArrayRowLead
}

type ValoresMessagem = {
    displayContainer: CSSProperties,
    mensagem: string,
    setDisplay?: () => void | null
}

type ArrayRowLead = {
    primeiroCampo: string,
    segundoCampo: string,
    terceiroCampos: string
}

type ObjetoInformacaoLead = {
    name: string,
    telefone: string,
    email: string,
    oportunidades: string[]
}

type ObjetoOportunidades = {
    [index: string]: any,
    rpa: string;
    produtoDigital: string,
    analytics: string,
    bpm: string
}

type RetornoAutenticacao = {
    permissao: boolean,
    link: string
}

export type {
    LocalStorageLogin,
    ValoresMessagem,
    ArrayRowLead,
    ObjetoInformacaoLead,
    ObjetoOportunidades,
    LocalStorageLead,
    RetornoAutenticacao
}