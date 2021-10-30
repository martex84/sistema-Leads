import { AES, enc } from "crypto-js"

function criptografia(valor: string) {
    let valorRetorno: any = "";

    valorRetorno = AES.encrypt(valor, 'key').toString();

    return valorRetorno;
}

function descripografia(valor: string) {
    let valorRetorno: string = "";

    valorRetorno = AES.decrypt(valor, 'key').toString(enc.Utf8);

    return valorRetorno;
}

function verificacaoToken(valorOriginal: string, valorDescripografia: string) {
    let valorRetorno: boolean = false;

    const valorVerificacao: string = descripografia(valorDescripografia);

    if (valorOriginal === valorVerificacao) {
        valorRetorno = true;
    }

    return valorRetorno;
}

export {
    criptografia,
    verificacaoToken
};