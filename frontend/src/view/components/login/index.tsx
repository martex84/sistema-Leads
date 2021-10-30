
import { useState } from "react";

import { } from "crypto-js"
import { criptografia, verificacaoToken } from "../../../services/criptografia";
import { LocalStorage } from "../../../types";

import "./styles.scss";

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
        resetarEfeitoFaltaInformacao();

        if (usuario === "") {
            setEfeitoFaltaInformacao({ usuario: "destaqueSpan" })
            console.log("Usuario Vazio");
            return
        }
        else if (password === "") {
            setEfeitoFaltaInformacao({ password: "destaqueSpan" })
            console.log("Password Vazio");
            return
        }
        else if (confirmacaoPassword === "") {
            setEfeitoFaltaInformacao({ confirmacao: "destaqueSpan" })
            console.log("Confirmação de Password Vazio");
            return
        }

        if (verificaPassword() === false) {
            console.log("Password Incorreto");
            return
        }

        if (password !== confirmacaoPassword) {
            console.log("Confirmação de Password diferente do Password");
            return
        }

        const valorCripografia: string = criptografia(`${usuario}&${password}`);

        if (localStorageGeral === null) {
            localStorage.setItem("listLeads", JSON.stringify({
                login: {
                    user: usuario,
                    password: password,
                    token: valorCripografia
                }
            } as LocalStorage));

            console.log("Login Efetuado")
        }
        else if (verificacaoToken(`${usuario}&${password}`, localStorageGeral.login?.token as string)) {
            console.log("Login Efetuado")
        }

    }
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
        </>
    );
}

export { Login };