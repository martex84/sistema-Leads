
import { CSSProperties, useState } from "react";

import { ArrayRowLead, LocalStorageLead } from "../../../types"
import { Mensagem } from "../mensagem";

import "./styles.scss";

type ConfiguracaoRowLead = {
    setMove: (key: number, valores: ArrayRowLead) => void,
    mostrarMensagem: (key: number) => void,
    informacao: {
        key: number,
        objeto: LocalStorageLead
    }
}

type ConfiguracaoEfeitoDrag = {
    primeiroCampo?: string,
    segundoCampo?: string,
    terceiroCapo?: string
}

function RowLead(props: ConfiguracaoRowLead) {

    const [valorRow, setValorRow] = useState<ArrayRowLead>({
        primeiroCampo: props.informacao.objeto.arrayRow.primeiroCampo,
        segundoCampo: props.informacao.objeto.arrayRow.segundoCampo,
        terceiroCampos: props.informacao.objeto.arrayRow.terceiroCampos
    });

    const [tipoAtual, setTipoAtual] = useState<string>("");

    const [objetoEfeitoDrag, setObjetoEfeitoDrag] = useState<ConfiguracaoEfeitoDrag>({
        primeiroCampo: "",
        segundoCampo: "",
        terceiroCapo: ""
    });

    const [valorTextoEfeito, setValorTextoEfeito] = useState<ConfiguracaoEfeitoDrag>({
        primeiroCampo: "",
        segundoCampo: "",
        terceiroCapo: ""
    })

    function salvarValorAtualFuturo(valor: string, event: any) {

        const tamanhoComponenteAtual = (event.target.innerText as string).length;

        let arrayValores: ArrayRowLead;

        let objetoInternoEfeitoDrag = objetoEfeitoDrag;

        switch (valor) {
            case "1":
                if (tipoAtual === "" && event.type === "dragstart" && tamanhoComponenteAtual !== 0) {
                    setTipoAtual("1");

                    objetoInternoEfeitoDrag.primeiroCampo = "selecaoDadosRowLead";
                    objetoInternoEfeitoDrag.segundoCampo = "destinoDadosRowLead";

                    setValorTextoEfeito({
                        primeiroCampo: "",
                        segundoCampo: "Araste Aqui!",
                        terceiroCapo: ""
                    })

                    setObjetoEfeitoDrag(objetoInternoEfeitoDrag);

                    return;
                }
                break

            case "2":
                if (tipoAtual === "1" && event.type === "mouseenter") {
                    arrayValores = {
                        primeiroCampo: "",
                        segundoCampo: valorRow.primeiroCampo,
                        terceiroCampos: ""
                    }

                    setValorTextoEfeito({
                        primeiroCampo: "",
                        segundoCampo: "",
                        terceiroCapo: ""
                    })

                    salvarValorLocalStorage(arrayValores);

                    objetoInternoEfeitoDrag.primeiroCampo = "";
                    objetoInternoEfeitoDrag.segundoCampo = "";

                    setObjetoEfeitoDrag(objetoInternoEfeitoDrag);

                    return
                }
                else if (tipoAtual === "" && event.type === "dragstart" && tamanhoComponenteAtual !== 0) {
                    setTipoAtual("2");

                    setValorTextoEfeito({
                        primeiroCampo: "",
                        segundoCampo: "",
                        terceiroCapo: "Araste Aqui!"
                    })

                    objetoInternoEfeitoDrag.segundoCampo = "selecaoDadosRowLead";
                    objetoInternoEfeitoDrag.terceiroCapo = "destinoDadosRowLead";

                    setObjetoEfeitoDrag(objetoInternoEfeitoDrag);

                    return;
                }
                break;

            case "3":
                if (tipoAtual === "2" && event.type === "mouseenter") {
                    arrayValores = {
                        primeiroCampo: "",
                        segundoCampo: "",
                        terceiroCampos: valorRow.segundoCampo
                    }

                    setValorTextoEfeito({
                        primeiroCampo: "",
                        segundoCampo: "",
                        terceiroCapo: ""
                    })

                    salvarValorLocalStorage(arrayValores);

                    objetoInternoEfeitoDrag.segundoCampo = "";
                    objetoInternoEfeitoDrag.terceiroCapo = "";

                    setObjetoEfeitoDrag(objetoInternoEfeitoDrag);

                    return;
                }
                break;
        }

        setTipoAtual("");

    }

    function salvarValorLocalStorage(arrayValores: any) {
        props.setMove(props.informacao.key, arrayValores);

        setValorRow(arrayValores);

        setTipoAtual("");

    }



    return (
        <>
            <li className="containerDadosRowLead">
                <div>
                    <span
                        className={objetoEfeitoDrag.primeiroCampo}
                        onDragStart={(event) => salvarValorAtualFuturo("1", event)}
                        onDoubleClick={() => props.mostrarMensagem(props.informacao.key)}
                        draggable="true">
                        {`${valorRow.primeiroCampo}${valorTextoEfeito.primeiroCampo}`}
                    </span>
                </div>
                <div>
                    <span
                        className={objetoEfeitoDrag.segundoCampo}
                        onDragStart={(event) => salvarValorAtualFuturo("2", event)}
                        onMouseEnter={(event) => salvarValorAtualFuturo("2", event)}

                        draggable="true">
                        {`${valorRow.segundoCampo}${valorTextoEfeito.segundoCampo}`}
                    </span>
                </div>
                <div>
                    <span
                        className={objetoEfeitoDrag.terceiroCapo}
                        onMouseEnter={(event) => salvarValorAtualFuturo("3", event)}

                        draggable="true">
                        {`${valorRow.terceiroCampos}${valorTextoEfeito.terceiroCapo}`}
                    </span>
                </div>
            </li>
        </>
    );
}

export { RowLead }