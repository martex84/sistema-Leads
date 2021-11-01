
import { Logo } from "../../components/logo";

import "./styles.scss";



function NewLeads() {

    return (
        <>
            <div className="containerNewLeads">
                <div>
                    <div className="containerHeaderNewLeads">
                        <Logo />
                        <div className="detalhePainelNewLeads">
                            Novo Lead
                        </div>
                    </div>
                    <div className="containerConteudoNewLeads">
                        <div className="containerInputNewLeads">
                            <div>
                                <span>Nome *</span>
                                <input type="text" />
                            </div>
                            <div>
                                <span>Telefone *</span>
                                <input type="text" />
                            </div>
                            <div>
                                <span>Email *</span>
                                <input type="email" />
                            </div>
                        </div>
                        <div className="containerAcoesNewLeads">
                            <div className="tabelaOportunidadeNewLeads">
                                <label>Oportunidades *</label>
                                <ul className="listaOportunidadesNewLeads">
                                    <li>
                                        <div>
                                            <input type="checkbox" />
                                        </div>
                                        <div className="containerInformacaoListaNewLeads"></div>
                                    </li>
                                    <li>
                                        <div>
                                            <input type="checkbox" />
                                        </div>
                                        <div className="containerInformacaoListaNewLeads">
                                            RPA
                                        </div>
                                    </li>
                                    <li className="backgroundAlternativoListaNewLeads">
                                        <div>
                                            <input type="checkbox" />
                                        </div>
                                        <div className="containerInformacaoListaNewLeads">
                                            Produto Digital
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <input type="checkbox" />
                                        </div>
                                        <div className="containerInformacaoListaNewLeads">
                                            Analytics
                                        </div>
                                    </li>
                                    <li className="backgroundAlternativoListaNewLeads">
                                        <div>
                                            <input type="checkbox" />
                                        </div>
                                        <div className="containerInformacaoListaNewLeads">
                                            BPM
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <span />
                                        </div>
                                        <div className="containerInformacaoListaNewLeads" />
                                    </li>
                                </ul>
                            </div>
                            <div className="containerBotaoNewLeads">
                                <button>
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export { NewLeads }