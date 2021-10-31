import { Logo } from "../../components/logo";

import "./styles.scss";

function Leads() {
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
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export { Leads }