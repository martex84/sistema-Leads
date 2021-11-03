import { useEffect, useState } from "react";

import { criptografia, verificarToken } from "../../../services/criptografia";
import { LocalStorageLogin, ValoresMessagem, RetornoLocalStorage } from "../../../types";
import { autenticacaoLogin } from "../../../services/autenticacaoLogin"
import { criacaoLocalStorage } from "../../../services/criacaoLocalStorage";
import { Mensagem } from "../mensagem";
import { Logo } from "../logo"

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

const nomeLocalStorage: RetornoLocalStorage = criacaoLocalStorage();


function Login() {
    const [usuario, setUsuario] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmacaoPassword, setConfirmacaoPassword] = useState<string>("");
    const [efeturarLogin, setEfeturarLogin] = useState<boolean>(false);
    const [efeitoFaltaInformacao, setEfeitoFaltaInformacao] = useState<ValoresCssIput>({
        usuario: "",
        password: "",
        confirmacao: ""
    });
    const [efeitoMensagem, setEfeitoMensagem] = useState<ValoresMessagem>({
        displayContainer: { display: "none" },
        mensagem: ""
    })

    const localStorageGeral = JSON.parse(localStorage.getItem(nomeLocalStorage.login) as string);

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

            mensagemInterna = "Usuario vazio!";

            erroInterno = true;

            setEfeturarLogin(false);
        }
        else if (password === "") {
            setEfeitoFaltaInformacao({ password: "destaqueSpan" })

            mensagemInterna = "Password vazio!";

            erroInterno = true;

            setEfeturarLogin(false);
        }
        else if (verificaPassword() === false && erroInterno === false) {
            mensagemInterna = "Password incorreto, utilize caracteres, números e símbolos ou valor maior que 8 caracteres!";

            erroInterno = true;

            setEfeturarLogin(false);
        }
        else if (confirmacaoPassword === "") {
            setEfeitoFaltaInformacao({ confirmacao: "destaqueSpan" })

            mensagemInterna = "Confirmação de password vazio!";

            erroInterno = true;

            setEfeturarLogin(false);
        }
        else if (password !== confirmacaoPassword && erroInterno === false) {
            mensagemInterna = "Confirmação de password diferente do password";

            erroInterno = true;

            setEfeturarLogin(false);
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

    function acaoBotaoMensagem() {
        if (efeturarLogin === true) {
            window.location.href = `${window.location.href}leads`
        }

        setEfeitoMensagem({
            displayContainer: { display: "none" },
            mensagem: ""
        })
    }

    function verificaToken() {
        let mensagemInterna = "";
        let liberarMensagem = false;
        const diaAtual = new Date;

        console.log(diaAtual.getUTCDay);

        if (usuario !== "" && password !== "" && confirmacaoPassword !== "") {
            const valorCripografia: string = criptografia(`${usuario}&${password}`);

            if (`${localStorageGeral}` === "") {
                localStorage.setItem("listLeads-login", JSON.stringify({
                    login: {
                        user: usuario,
                        password: criptografia(`${password}`),
                        token: valorCripografia
                    }
                } as LocalStorageLogin));

                mensagemInterna = "Login efetuado com sucesso!";

                setEfeturarLogin(true);

                liberarMensagem = true;
            }
            else if (verificarToken(`${usuario}&${password}`, localStorageGeral.login?.token as string)) {
                mensagemInterna = "Login efetuado com sucesso!";

                liberarMensagem = true;

                setEfeturarLogin(true);
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
        if (usuario !== null && password !== null) {

            if (JSON.parse(localStorage.getItem(nomeLocalStorage.login) as string) === "Erro-Login") {
                setEfeitoMensagem({
                    displayContainer: { display: "flex" },
                    mensagem: "Falha na autenticação, favor realizar login"
                })

                localStorage.setItem(nomeLocalStorage.login, JSON.stringify(""))
            }
            else {
                const valorAutenticacaoLogin = autenticacaoLogin();

                if (valorAutenticacaoLogin.permissao === true && localStorage.getItem(nomeLocalStorage.login) !== "") {
                    let mensagemInterna = "";

                    const localStorageInterno: LocalStorageLogin = JSON.parse(localStorage.getItem(nomeLocalStorage.login) as string)

                    mensagemInterna = `Bem vindo de volta ${localStorageInterno.login?.user}!`;

                    setEfeitoMensagem({
                        displayContainer: { display: "flex" },
                        mensagem: mensagemInterna
                    })

                    setEfeturarLogin(true);
                }
            }
        }
    }, [password, usuario, confirmacaoPassword])

    return (
        <>
            <div className="containerLogin">
                <Logo />
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
            <Mensagem mensagem={efeitoMensagem.mensagem} displayContainer={efeitoMensagem.displayContainer} setDisplay={acaoBotaoMensagem} />
        </>
    );
}

export { Login };