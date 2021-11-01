import { useCallback, useEffect, useState } from "react";
import { Logo } from "../../components/logo";

import { RowLead } from "../../components/rowLead";
import { ArrayRowLead } from "../../../types";

import "./styles.scss";

const nomeLocalStorage = "listLeads-leads";

if (localStorage.getItem(nomeLocalStorage) === null) {
    localStorage.setItem(nomeLocalStorage, "");
}

function Leads() {

    const [arrayRowLead, setArrayRowLead] = useState<ArrayRowLead[]>([])

    function setMove(key: number, valores: ArrayRowLead) {
        const arrayRetorno = arrayRowLead.map((componente, index) => {
            if (index === key) {
                componente.primeiroCampo = valores.primeiroCampo;
                componente.segundoCampo = valores.segundoCampo;
                componente.terceiroCampos = valores.terceiroCampos;
            }

            return componente;
        })

        setArrayRowLead(arrayRetorno)

        localStorage.setItem(nomeLocalStorage, JSON.stringify(arrayRetorno));
    }

    useEffect(() => {
        if (arrayRowLead.length === 0) {
            if (localStorage.getItem(nomeLocalStorage) !== null) {
                setArrayRowLead(JSON.parse(localStorage.getItem(nomeLocalStorage) as string));
            }
        }
    }, [arrayRowLead])

    useCallback(() => {
        setArrayRowLead(JSON.parse(localStorage.getItem(nomeLocalStorage) as string));
    }, [localStorage.getItem(nomeLocalStorage)])

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