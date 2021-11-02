
import { compararValoresCripotografados } from "./criptografia";
import { LocalStorageLogin, RetornoAutenticacao } from "../types"

function autenticacaoLogin() {
    const localStorageGeralUseEffect: LocalStorageLogin = JSON.parse(localStorage.getItem("listLeads-login") as string);

    let retornoAtenticacao: RetornoAutenticacao = {
        permissao: false,
        link: `${window.location.href.split(":3000/")[0]}:3000/`
    }

    if (`${localStorageGeralUseEffect}` !== "") {
        if (localStorageGeralUseEffect.login?.token !== null) {
            if (compararValoresCripotografados(`${localStorageGeralUseEffect.login?.user}&${localStorageGeralUseEffect.login?.password}`, localStorageGeralUseEffect.login?.token as string)) {
                retornoAtenticacao.permissao = true
            }
        }
    }

    return retornoAtenticacao;
}

export { autenticacaoLogin };