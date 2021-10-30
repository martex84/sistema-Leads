
import { useState } from "react";
import "./styles.scss";

type ValoresRetorno = {
    alfabeto: number,
    numero: number,
    simbolo: number
}

function Login() {
    const [usuario, setUsuario] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmacaoPassword, setConfirmacaoPassword] = useState<string>("");

    function verificaPassword() {
        if (password.length >= 8) {
            const alfabeto: String[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
            const numeral: String[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            let valoresRetorno: ValoresRetorno = {
                alfabeto: 0,
                numero: 0,
                simbolo: 0
            };

            console.log(password);

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

            console.log(valoresRetorno)

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
                    <div className="containerInput">
                        <span>Usuário*</span>
                        <input type="text" value={usuario} onChange={event => { verificaValorVazio(event.target.value, setUsuario, usuario) }}></input>
                    </div>
                    <div className="containerInput">
                        <span>Password*</span>
                        <input type="password" value={password} onChange={event => { verificaValorVazio(event.target.value, setPassword, password) }}></input>
                    </div>
                    <div className="containerInput">
                        <span>Confirmação Password*</span>
                        <input type="password" value={confirmacaoPassword} onChange={event => { verificaValorVazio(event.target.value, setConfirmacaoPassword, confirmacaoPassword) }}></input>
                    </div>
                </div>
                <div className="containerButtonLogin">
                    <button onClick={() => verificaPassword()}>
                        Registrar
                    </button>
                </div>
            </div>
        </>
    );
}

export { Login };