
import { CSSProperties, useState } from "react";

import { Logo } from "../../components/logo";
import { Mensagem } from "../../components/mensagem";
import { ValoresMessagem } from "../../../types"
import { ObjetoInformacaoLead, ObjetoOportunidades } from "../../../types"

import "./styles.scss";



type DestaqueSpan = {
    name?: string,
    telefone?: string,
    email?: string
}

function NewLeads() {

    const [objetoInformacaoLead, setObjetoInformacaoLead] = useState<ObjetoInformacaoLead>({
        name: "",
        telefone: "",
        email: "",
        oportunidades: []
    });

    const [name, setName] = useState<string>("");
    const [telefone, setTelefone] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [destaqueSpan, setDestaqueSpan] = useState<DestaqueSpan>({
        name: "",
        telefone: "",
        email: ""
    });

    const [configuracaoMensagem, setConfiguracaoMensagem] = useState<ValoresMessagem>({
        displayContainer: { display: "none" },
        mensagem: ""
    });

    const [checkBoxOportunidade, setCheckboxOportunidade] = useState<ObjetoOportunidades>({
        rpa: "",
        produtoDigital: "",
        analytics: "",
        bpm: "",
        total: false
    });

    const [rpaChecked, setRpaChecked] = useState<boolean>(false);
    const [produtoDigitalChecked, setProdutoDigitalChecked] = useState<boolean>(false);
    const [analyticsChecked, setAnalyticsChecked] = useState<boolean>(false);
    const [bpmChecked, setBpmChecked] = useState<boolean>(false);
    const [totalChecked, setTotalChecked] = useState<boolean>(false);


    function salvarTelefone(valor: string) {

        if (telefone.length === 0) {
            setTelefone(`(${valor}`);
        }
        else if ((telefone)?.length === 2) {
            setTelefone(`${valor}) `);
        }
        else {
            setTelefone(valor);
        }

    }

    function verificaEmail() {
        let simboloPresente = false;

        for (let i = 0; i <= email.length; i++) {
            if (email[i] === "@") simboloPresente = true;
        }

        return simboloPresente;
    }

    function verificarCampos() {
        let erroCaptado = false;
        let mensagemErro = "";

        if (name === "") {
            erroCaptado = true;

            mensagemErro = "Preencha o campo nome!"

            setDestaqueSpan({
                name: "spanDestaqueNewLeads",
                telefone: "",
                email: ""
            })
        }
        else if (telefone === "") {
            erroCaptado = true;

            mensagemErro = "Preencha o campo telefone!"

            setDestaqueSpan({
                name: "",
                telefone: "spanDestaqueNewLeads",
                email: ""
            })
        }
        else if (email === "") {
            erroCaptado = true;

            mensagemErro = "Preencha o campo email!"

            setDestaqueSpan({
                name: "",
                telefone: "",
                email: "spanDestaqueNewLeads"
            })
        }
        else if (verificaEmail() === false) {
            erroCaptado = true;

            mensagemErro = "Preencha o campo email corretamente!"

            setDestaqueSpan({
                name: "",
                telefone: "",
                email: "spanDestaqueNewLeads"
            })
        }

        if (erroCaptado === true) {
            mudarConfiguracaoMensagem(mensagemErro, { display: "flex" })
        }
        else {
            setDestaqueSpan({
                name: "",
                telefone: "",
                email: ""
            })
        }
    }

    function mudarConfiguracaoMensagem(mensagem: string, display: CSSProperties) {
        setConfiguracaoMensagem({
            displayContainer: display,
            mensagem: mensagem
        })
    }

    function closeMensagem() {
        mudarConfiguracaoMensagem("", { display: "none" })
    }

    function salvarCheckBox(opcao: string) {
        let objetoInternaCheckBox = checkBoxOportunidade;

        switch (opcao) {
            case "rpa":
                objetoInternaCheckBox.rpa = objetoInternaCheckBox.rpa !== "" ? "" : "RPA";

                setRpaChecked(
                    rpaChecked === true ? false : true
                )
                break;

            case "produtoDigital":
                objetoInternaCheckBox.produtoDigital = objetoInternaCheckBox.produtoDigital !== "" ? "" : "Produto Digital";

                setProdutoDigitalChecked(
                    produtoDigitalChecked === true ? false : true
                )
                break;

            case "analytics":
                objetoInternaCheckBox.analytics = objetoInternaCheckBox.analytics !== "" ? "" : "Analytics";

                setAnalyticsChecked(
                    analyticsChecked === true ? false : true
                )
                break;

            case "bpm":
                objetoInternaCheckBox.bpm = objetoInternaCheckBox.bpm !== "" ? "" : "BPM";

                setBpmChecked(
                    bpmChecked === true ? false : true
                )
                break;

            case "total": {
                if (totalChecked === false) {
                    setRpaChecked(true);
                    setProdutoDigitalChecked(true);
                    setAnalyticsChecked(true);
                    setBpmChecked(true);
                    setTotalChecked(true);

                    objetoInternaCheckBox.rpa = "RPA";
                    objetoInternaCheckBox.produtoDigital = "Produto Digital";
                    objetoInternaCheckBox.analytics = "Analytics";
                    objetoInternaCheckBox.bpm = "BPM";
                }
                else {
                    Object.keys(objetoInternaCheckBox).forEach((key) => {
                        if (key !== "total") {
                            objetoInternaCheckBox[key] = ""
                        }
                    })

                    setRpaChecked(false);
                    setProdutoDigitalChecked(false);
                    setAnalyticsChecked(false);
                    setBpmChecked(false);
                    setTotalChecked(false);
                }
            }
        }

        setCheckboxOportunidade(objetoInternaCheckBox);

    }

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
                                <span className={destaqueSpan.name}>Nome *</span>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={event => { setName(event.target.value) }}
                                ></input>
                            </div>
                            <div>
                                <span className={destaqueSpan.telefone}>Telefone *</span>
                                <input
                                    type="tel"
                                    value={telefone}
                                    onChange={event => { salvarTelefone(event.target.value) }}
                                />
                            </div>
                            <div>
                                <span className={destaqueSpan.email}>Email *</span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={event => { setEmail(event.target.value) }}
                                />
                            </div>
                        </div>
                        <div className="containerAcoesNewLeads">
                            <div className="tabelaOportunidadeNewLeads">
                                <label>Oportunidades *</label>
                                <ul className="listaOportunidadesNewLeads">
                                    <li>
                                        <div>
                                            <input type="checkbox" onChange={() => { salvarCheckBox("total") }} />
                                        </div>
                                        <div className="containerInformacaoListaNewLeads"></div>
                                    </li>
                                    <li>
                                        <div>
                                            <input
                                                type="checkbox"
                                                onChange={() => salvarCheckBox("rpa")}
                                                checked={rpaChecked}
                                                name="inputTeste"
                                            />
                                        </div>
                                        <div className="containerInformacaoListaNewLeads">
                                            RPA
                                        </div>
                                    </li>
                                    <li className="backgroundAlternativoListaNewLeads">
                                        <div>
                                            <input
                                                type="checkbox"
                                                onChange={() => salvarCheckBox("produtoDigital")}
                                                checked={produtoDigitalChecked}
                                            />
                                        </div>
                                        <div className="containerInformacaoListaNewLeads">
                                            Produto Digital
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <input
                                                type="checkbox"
                                                onChange={() => salvarCheckBox("analytics")}
                                                checked={analyticsChecked}
                                            />
                                        </div>
                                        <div className="containerInformacaoListaNewLeads">
                                            Analytics
                                        </div>
                                    </li>
                                    <li className="backgroundAlternativoListaNewLeads">
                                        <div>
                                            <input
                                                type="checkbox"
                                                onChange={() => salvarCheckBox("bpm")}
                                                checked={bpmChecked}
                                            />
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
                                <button onClick={() => { verificarCampos() }}>
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Mensagem displayContainer={configuracaoMensagem.displayContainer} mensagem={configuracaoMensagem.mensagem} setDisplay={closeMensagem} />
            </div>
        </>
    );
}

export { NewLeads }