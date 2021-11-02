import { CSSProperties } from "react"

type LocalStorage = {
    login: {
        user: string,
        password: string,
        token: string
    } | null
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
    name?: string,
    telefone?: string,
    email?: string,
    oportunidades?: string[]
}

type ObjetoOportunidades = {
    [index: string]: any,
    rpa: string;
    produtoDigital: string,
    analytics: string,
    bpm: string
}

export type {
    LocalStorage,
    ValoresMessagem,
    ArrayRowLead,
    ObjetoInformacaoLead,
    ObjetoOportunidades
}