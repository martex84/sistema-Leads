import { useEffect, useState } from "react";
import { criptografia, verificacaoToken } from "../../../services/criptografia";
import { LocalStorage, ValoresMessagem } from "../../../types";

import "./styles.scss";
import { Mensagem } from "../mensagem";

type ValoresRetorno = {
    alfabeto: number,
    numero: number,
    simbolo: number
}

type ValoresCssIput = {
    usuario?: string,
    password?: string,
    confirmacao?: string
}

function Login() {
    const [usuario, setUsuario] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmacaoPassword, setConfirmacaoPassword] = useState<string>("");
    const [efeitoFaltaInformacao, setEfeitoFaltaInformacao] = useState<ValoresCssIput>({
        usuario: "",
        password: "",
        confirmacao: ""
    });
    const [efeitoMensagem, setEfeitoMensagem] = useState<ValoresMessagem>({
        displayContainer: { display: "none" },
        mensagem: ""
    })

    const localStorageGeral: LocalStorage = JSON.parse(localStorage.getItem("listLeads") as string);

    function verificaPassword() {
        let senhaCorreta = false;
        if (password.length >= 8) {
            const alfabeto: String[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
            const numeral: String[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            let valoresRetorno: ValoresRetorno = {
                alfabeto: 0,
                numero: 0,
                simbolo: 0
            };

            for (let i = 0; i < password.length; i++) {
                //Irá mudar caso tenha um valor do Alfabeto ou Numero
                let valorSalvoAlfabetoNumero = false;

                //Verifica se contem a letra no alfabeto
                let resultado: String[] = alfabeto.filter(valor => valor === password[i].toUpperCase());

                if (resultado.length >= 1) {
                    valoresRetorno.alfabeto = valoresRetorno.alfabeto + 1;
                    valorSalvoAlfabetoNumero = true;
                }

                //Verifica se contem o numero
                resultado = numeral.filter(valor => valor === password[i].toUpperCase());

                if (resultado.length >= 1) {
                    valoresRetorno.numero = valoresRetorno.numero + 1;
                    valorSalvoAlfabetoNumero = true;
                }

                //Retorna simbolo caso não seja alfabeto e numero
                if (valorSalvoAlfabetoNumero === false) {
                    valoresRetorno.simbolo = valoresRetorno.simbolo + 1;
                }

            }

            Object.values(valoresRetorno).forEach((key: any) => {
                if (key >= 1) senhaCorreta = true;
            })

            return senhaCorreta;

        }
        else {
            console.log("Password Menor que 8 digitos")
            return senhaCorreta;
        }
    }

    function verificaValorVazio(valorParaSalvar: string, funcaoSalvar: Function, valorOriginal: string) {
        const valorInterno = valorParaSalvar[valorParaSalvar.length - 1];
        if (valorInterno !== " ") {
            funcaoSalvar(valorParaSalvar)
        }
        else {
            funcaoSalvar(valorOriginal)
        }
    }

    function resetarEfeitoFaltaInformacao() {
        const objetoRetorno = Object.keys(efeitoFaltaInformacao).map(key => {
            return key = "";
        })

        setEfeitoFaltaInformacao(objetoRetorno as ValoresCssIput);
    }

    function verificaCampos() {
        let mensagemInterna = "";
        let erroInterno = false;

        resetarEfeitoFaltaInformacao();

        if (usuario === "") {
            setEfeitoFaltaInformacao({ usuario: "destaqueSpan" })
            mensagemInterna = "Usuario Vazio!";
            erroInterno = true;
        }
        else if (password === "") {
            setEfeitoFaltaInformacao({ password: "destaqueSpan" })
            mensagemInterna = "Password Vazio!";
            erroInterno = true;
        }
        else if (confirmacaoPassword === "") {
            setEfeitoFaltaInformacao({ confirmacao: "destaqueSpan" })
            mensagemInterna = "Confirmação de Password Vazio!";
            erroInterno = true;
        }

        if (verificaPassword() === false && erroInterno === false) {
            mensagemInterna = "Password Incorreto, utilize caracteres, números e simbolos!";
            erroInterno = true;
        }

        if (password !== confirmacaoPassword && erroInterno === false) {
            mensagemInterna = "Confirmação de Password diferente do Password";
            erroInterno = true;
        }

        if (erroInterno === false) {
            verificaToken();
        }
        else {
            setEfeitoMensagem({
                displayContainer: { display: "flex" },
                mensagem: mensagemInterna
            })
        }
    }

    function zerarDisplayMensagem() {
        setEfeitoMensagem({
            displayContainer: { display: "none" },
            mensagem: ""
        })
    }

    function verificaToken() {
        let mensagemInterna = "";
        let liberarMensagem = false;

        if (usuario !== "" && password !== "" && confirmacaoPassword !== "") {
            const valorCripografia: string = criptografia(`${usuario}&${password}`);

            if (localStorageGeral === null) {
                localStorage.setItem("listLeads", JSON.stringify({
                    login: {
                        user: usuario,
                        password: password,
                        token: valorCripografia
                    }
                } as LocalStorage));

                mensagemInterna = "Login Efetuado com sucesso!";
                liberarMensagem = true;
            }
            else if (verificacaoToken(`${usuario}&${password}`, localStorageGeral.login?.token as string)) {
                mensagemInterna = "Login Efetuado com sucesso!";
                liberarMensagem = true;
            }
        }

        if (liberarMensagem === true) {
            setEfeitoMensagem({
                displayContainer: { display: "flex" },
                mensagem: mensagemInterna
            })
        }

    }

    useEffect(() => {
        if (usuario !== null && password !== null && confirmacaoPassword !== null) {
            const localStorageGeralUseEffect: LocalStorage = JSON.parse(localStorage.getItem("listLeads") as string);
            if (localStorageGeralUseEffect !== null) {
                if (localStorageGeralUseEffect.login?.token !== null) {
                    if (verificacaoToken(`${localStorageGeralUseEffect.login?.user}&${localStorageGeralUseEffect.login?.password}`, localStorageGeralUseEffect.login?.token as string)) {
                        let mensagemInterna = "";
                        mensagemInterna = "Bem vindo de volta!";

                        setEfeitoMensagem({
                            displayContainer: { display: "flex" },
                            mensagem: mensagemInterna
                        })
                    }
                }
            }
        }
    }, [password, usuario, confirmacaoPassword])

    return (
        <>
            <div className="containerLogin">
                <div className="containerTituloLogin">
                    <span>
                        Elo
                    </span>
                    <span>
                        Group
                    </span>
                </div>
                <div className="containerCamposPreenchimentoLogin">
                    <div className={`${efeitoFaltaInformacao.usuario} containerInput`}>
                        <span>Usuário*</span>
                        <input type="text" value={usuario} onChange={event => { verificaValorVazio(event.target.value, setUsuario, usuario) }}></input>
                    </div>
                    <div className={`${efeitoFaltaInformacao.password} containerInput`}>
                        <span>Password*</span>
                        <input type="password" value={password} onChange={event => { verificaValorVazio(event.target.value, setPassword, password) }}></input>
                    </div>
                    <div className={`${efeitoFaltaInformacao.confirmacao} containerInput`}>
                        <span>Confirmação Password*</span>
                        <input type="password" value={confirmacaoPassword} onChange={event => { verificaValorVazio(event.target.value, setConfirmacaoPassword, confirmacaoPassword) }}></input>
                    </div>
                </div>
                <div className="containerButtonLogin">
                    <button onClick={() => verificaCampos()}>
                        Registrar / Entrar
                    </button>
                </div>
            </div>
            <Mensagem mensagem={efeitoMensagem.mensagem} displayContainer={efeitoMensagem.displayContainer} setDisplay={zerarDisplayMensagem} />
        </>
    );
}

export { Login };