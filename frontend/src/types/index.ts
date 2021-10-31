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

export type {
    LocalStorage,
    ValoresMessagem
}