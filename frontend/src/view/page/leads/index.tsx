import React, { CSSProperties, ReactNode, useCallback, useEffect, useState } from "react";
import { Logo } from "../../components/logo";
import { Link } from "react-router-dom";

import { RowLead } from "../../components/rowLead";
import { ArrayRowLead, LocalStorageLead, RetornoAutenticacao, RetornoLocalStorage } from "../../../types";
import { criacaoLocalStorage } from "../../../services/criacaoLocalStorage";
import { autenticacaoLogin } from "../../../services/autenticacaoLogin";

import "./styles.scss";
import { Mensagem } from "../../components/mensagem";

const nomeLocalStorage: RetornoLocalStorage = criacaoLocalStorage();

type ObjetoMensagem = {
    name: string,
    email: string,
    telefone: string,
    tipo: string
}

function Leads() {

    const [childrenMensagem, setChildrenMesagem] = useState<ReactNode>((<></>));

    const [displayMessage, setDisplayMessage] = useState<CSSProperties>({ display: "none" });

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

    function mostrarMensagem(key: number) {

        const objetoInterno: ObjetoMensagem = {
            name: "",
            email: "",
            telefone: "",
            tipo: ""
        }

        for (let index in localStorageLead) {
            const indexInterno: number = parseInt(index);

            if (indexInterno === key) {
                const { email, telefone, name, oportunidades } = localStorageLead[key].informacao;

                objetoInterno.name = name;
                objetoInterno.email = email;
                objetoInterno.telefone = telefone;

                let oportunidadesString: string = "";

                for (let oportunidade of oportunidades) {
                    if (oportunidade !== "") {
                        if (oportunidadesString.length === 0) {
                            oportunidadesString = oportunidadesString + oportunidade;
                        }
                        else {
                            oportunidadesString = oportunidadesString + " - " + oportunidade;
                        }
                    }
                }

                objetoInterno.tipo = oportunidadesString;
            }
        }

        setDisplayMessage({ display: "flex" })

        setChildrenMesagem(<div className="mensagemDetalhada">
            <div> Informação Detalhada </div>
            <div>
                <p>
                    <span>Nome:</span>
                    {objetoInterno.name}
                </p>
                <p>
                    <span>Email:</span>
                    {objetoInterno.email}
                </p>
                <p>
                    <span>Telefone:</span>
                    {objetoInterno.telefone}
                </p>
                <p>
                    <span>Tipo:</span>
                    {objetoInterno.tipo}
                </p>
            </div>
        </div>)
    }

    function closeMensagem() {
        setDisplayMessage({ display: "none" })
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
            <div className="containerExternoLeads">
                <div className="containerInternoLeads">
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
                                        mostrarMensagem={mostrarMensagem}
                                        key={index}
                                    />
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <Mensagem
                    displayContainer={displayMessage}
                    children={childrenMensagem}
                    setDisplay={closeMensagem}
                />
            </div>
        </>
    );
}

export { Leads }