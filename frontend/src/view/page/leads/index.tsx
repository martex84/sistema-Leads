import { useCallback, useEffect, useState } from "react";
import { Logo } from "../../components/logo";
import { Link } from "react-router-dom";

import { RowLead } from "../../components/rowLead";
import { ArrayRowLead, LocalStorageLead, RetornoAutenticacao } from "../../../types";

import "./styles.scss";
import { autenticacaoLogin } from "../../../services/autenticacaoLogin";

const nomeLocalStorage = "listLeads-leads";

if (localStorage.getItem(nomeLocalStorage) === null) {

    localStorage.setItem(nomeLocalStorage, JSON.stringify([]));
}

function Leads() {

    const localStorageInterna = JSON.parse(localStorage.getItem(nomeLocalStorage) as string);

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
                setLocalStorageLead(localStorageInterna);
            }
        }
    }, [setLocalStorageLead, localStorageInterna, localStorageLead])

    useEffect(() => {
        if (localStorage.getItem(nomeLocalStorage) !== null) {
            const autenticacaoLoginInterno: RetornoAutenticacao = autenticacaoLogin();

            if (autenticacaoLoginInterno.permissao === false) {
                window.location.href = autenticacaoLoginInterno.link
            }

        }
    }, [])

    useCallback(() => {
        setLocalStorageLead(localStorageInterna);
    }, [localStorageInterna])

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