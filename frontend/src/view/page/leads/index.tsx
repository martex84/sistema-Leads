import { useCallback, useEffect, useState } from "react";
import { Logo } from "../../components/logo";
import { Link } from "react-router-dom";

import { RowLead } from "../../components/rowLead";
import { ArrayRowLead, LocalStorageLead, RetornoAutenticacao, RetornoLocalStorage } from "../../../types";
import { criacaoLocalStorage } from "../../../services/criacaoLocalStorage";
import { autenticacaoLogin } from "../../../services/autenticacaoLogin";

import "./styles.scss";

const nomeLocalStorage: RetornoLocalStorage = criacaoLocalStorage();

function Leads() {

    const localStorageInterna = JSON.parse(localStorage.getItem(nomeLocalStorage.leads) as string);

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

        localStorage.setItem(nomeLocalStorage.leads, JSON.stringify(localStorageLeadInterna));
    }

    useEffect(() => {
        if (localStorageLead.length === 0) {
            if (localStorage.getItem(nomeLocalStorage.leads) !== null) {
                setLocalStorageLead(localStorageInterna);
            }
        }
    }, [setLocalStorageLead, localStorageInterna, localStorageLead])

    useEffect(() => {
        if (localStorage.getItem(nomeLocalStorage.login) !== null) {
            const autenticacaoLoginInterno: RetornoAutenticacao = autenticacaoLogin();

            if (autenticacaoLoginInterno.permissao === false) {
                localStorage.setItem(nomeLocalStorage.login, JSON.stringify("Erro-Login"));
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