import { AES } from "crypto-js"

function criptografia(valor: string) {
    let valorRetorno: string = "";

    valorRetorno = AES.encrypt('valor', 'key').toString();

    return valorRetorno;
}

export { criptografia };