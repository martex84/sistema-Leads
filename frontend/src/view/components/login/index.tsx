
import "./styles.scss";

function Login() {
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
                        <input type="text"></input>
                    </div>
                    <div className="containerInput">
                        <span>Password*</span>
                        <input type="password"></input>
                    </div>
                    <div className="containerInput">
                        <span>Confirmação Password*</span>
                        <input type="password"></input>
                    </div>
                </div>
                <div className="containerButtonLogin">
                    <button>
                        Registrar
                    </button>
                </div>
            </div>
        </>
    );
}

export { Login };