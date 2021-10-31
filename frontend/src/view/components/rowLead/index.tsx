
import { useEffect, useState } from "react";

import { ArrayRowLead } from "../../../types"

import "./styles.scss";

type ConfiguracaoRowLead = {
    setMove: (key: string, valores: ArrayRowLead) => void
    informacao: {
        key: number,
        objeto: ArrayRowLead
    }
}

function RowLead(props: ConfiguracaoRowLead) {

    console.log(props)

    const [valorRow, setValorRow] = useState<ArrayRowLead>({
        primeiroCampo: props.informacao.objeto.primeiroCampo,
        segundoCampo: props.informacao.objeto.segundoCampo,
        terceiroCampos: props.informacao.objeto.terceiroCampos
    });

    const [tipoAtual, setTipoAtual] = useState<string>("");

    const [tipoFuturo, setTipoFuturo] = useState<string>("");

    function salvarValorAtualFuturo(valor: string) {
        if (tipoAtual === "") {
            setTipoAtual(valor)
        }
        else {
            setTipoFuturo(valor);
        }
    }

    useEffect(() => {
        if (tipoAtual !== "" && tipoFuturo !== "") {
            let arrayValores: ArrayRowLead;
            if (tipoAtual === "1" && tipoFuturo === "2") {
                arrayValores = {
                    primeiroCampo: "",
                    segundoCampo: valorRow.primeiroCampo,
                    terceiroCampos: ""
                }
                props.setMove("1", arrayValores);
                setValorRow(arrayValores);
            }
            if (tipoAtual === "2" && tipoFuturo === "3") {
                arrayValores = {
                    primeiroCampo: "",
                    segundoCampo: "",
                    terceiroCampos: valorRow.segundoCampo
                }
                props.setMove("2", arrayValores);
                setValorRow(arrayValores);
            }

            setTipoAtual("");

            setTipoFuturo("");
        }
    }, [tipoAtual, tipoFuturo, props, valorRow])

    return (
        <>
            <li className="containerDadosRowLead">
                <div onDragLeave={() => salvarValorAtualFuturo("1")} draggable="true">
                    {valorRow.primeiroCampo}
                </div>
                <div onDragLeave={() => salvarValorAtualFuturo("2")} draggable="true">
                    {valorRow.segundoCampo}
                </div>
                <div onDragLeave={() => salvarValorAtualFuturo("3")} draggable="true">
                    {valorRow.terceiroCampos}
                </div>
            </li>
        </>
    );
}

export { RowLead }