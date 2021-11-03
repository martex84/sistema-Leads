import { AES, enc } from "crypto-js"

const data = new Date();
const dataAtual = `${data.getUTCDay()}${data.getUTCMonth()}${data.getUTCFullYear()}`;

function criptografia(valor: string) {
    let valorRetorno: any = "";

    valorRetorno = AES.encrypt(`${valor}&${dataAtual}`, '5d17469f766d3056e50092e62250a0d0a460c167').toString();

    return valorRetorno;
}

function descripografia(valor: string) {
    let valorRetorno: string = "";

    valorRetorno = AES.decrypt(valor, '5d17469f766d3056e50092e62250a0d0a460c167').toString(enc.Utf8);

    return valorRetorno;
}

function verificarToken(valorOriginal: string, valorDescripografia: string) {
    let valorRetorno: boolean = false;

    const valorVerificacao: string = descripografia(valorDescripografia);

    if (`${valorOriginal}` === valorVerificacao && valorOriginal.split("&")[2] === dataAtual) {
        valorRetorno = true;
    }

    return valorRetorno;
}

export {
    criptografia,
    descripografia,
    verificarToken
};