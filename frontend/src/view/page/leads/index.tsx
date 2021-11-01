import { useState } from "react";
import { Logo } from "../../components/logo";

import { RowLead } from "../../components/rowLead";
import { ArrayRowLead } from "../../../types";

import "./styles.scss";



function Leads() {

    const [arrayRowLead, setArrayRowLead] = useState<ArrayRowLead[]>([
        {
            primeiroCampo: "Informação 1",
            segundoCampo: "",
            terceiroCampos: ""
        },
        {
            primeiroCampo: "Informação 2",
            segundoCampo: "",
            terceiroCampos: ""
        }
    ])

    function setMove(key: string, valores: ArrayRowLead) {
        if (key === "1") {

        }
        switch (key) {
            case "1":
                setArrayRowLead([{
                    primeiroCampo: "",
                    segundoCampo: arrayRowLead[0].primeiroCampo,
                    terceiroCampos: ""
                }])
                break;

            case "2":
                setArrayRowLead([{
                    primeiroCampo: "",
                    segundoCampo: arrayRowLead[0].primeiroCampo,
                    terceiroCampos: ""
                }])
                break;

        }
    }

    return (
        <>
            <div className="containerLeads">
                <div>
                    <div className="containerHeaderLeads">
                        <Logo />
                        <div className="detalhePainelLeads">
                            Painel de Leads
                        </div>
                    </div>
                    <div className="containerButtonNewLeads">
                        <button>
                            Novo Lead (+)
                        </button>
                    </div>
                    <div className="containerConteudoLeads">
                        <ul className="containerListaConteudoLeads">
                            <li className="sumarioListaConteudoLeads">
                                <div className="containerDescricaoConteudoLeads">
                                    Cliente em Potencial
                                </div>
                                <div className="containerDescricaoConteudoLeads">
                                    Dados Confirmados
                                </div>
                                <div className="containerDescricaoConteudoLeads">
                                    Reunião Agendada
                                </div>
                            </li>
                            {arrayRowLead.map((objeto, index) => {
                                return (
                                    <RowLead setMove={setMove}
                                        informacao={{
                                            objeto: objeto,
                                            key: index
                                        }}
                                        key={index}
                                    />
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export { Leads }