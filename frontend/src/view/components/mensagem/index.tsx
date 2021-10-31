import { VscClose } from "react-icons/vsc"

import { ValoresMessagem } from "../../../types"

import "./styles.scss";



function Mensagem(props: ValoresMessagem) {

    return (
        <>
            <div className={`containerMensagem`} style={props.displayContainer}>
                <div className="containerInternoMensagem">
                    <div className="mensagem">
                        {props.mensagem}
                    </div>
                    <button onClick={() => {
                        return props.setDisplay !== undefined ? props.setDisplay() : null
                    }}>
                        <VscClose size="35" className="iconCloseMesagem" />
                    </button>
                </div>
            </div>
        </>
    );
}

export { Mensagem };