import { useCallback, useEffect, useState } from "react";
import { Logo } from "../../components/logo";
import { Link } from "react-router-dom";

import { RowLead } from "../../components/rowLead";
import { ArrayRowLead, LocalStorageLead } from "../../../types";

import "./styles.scss";

const nomeLocalStorage = "listLeads-leads";

if (localStorage.getItem(nomeLocalStorage) === null) {

    localStorage.setItem(nomeLocalStorage, JSON.stringify([]));
}

function Leads() {

    const [localStorageLead, setLocalStorageLead] = useState<LocalStorageLead[]>([])

    function setMove(key: number, valores: ArrayRowLead) {
        const localStorageLeadInterna = localStorageLead.map((componente, index) => {
            if (index === key) {
                componente.arrayRow.primeiroCampo = valores.primeiroCampo;
                componente.arrayRow.segundoCampo = valores.segundoCampo;
                componente.arrayRow.terceiroCampos = valores.terceiroCampos;
            }

            return componente;
        })

        setLocalStorageLead(localStorageLeadInterna)

        localStorage.setItem(nomeLocalStorage, JSON.stringify(localStorageLeadInterna));
    }

    useEffect(() => {
        if (localStorageLead.length === 0) {
            if (localStorage.getItem(nomeLocalStorage) !== null) {
                setLocalStorageLead(JSON.parse(localStorage.getItem(nomeLocalStorage) as string));
            }
        }
    }, [setLocalStorageLead])

    useCallback(() => {
        setLocalStorageLead(JSON.parse(localStorage.getItem(nomeLocalStorage) as string));
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
                            <Link to="/leads/new">
                                Novo Lead (+)
                            </Link>
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
                            {localStorageLead.map((objeto, index) => {
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