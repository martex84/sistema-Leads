
import { CSSProperties, useState } from "react";

import { Logo } from "../../components/logo";
import { Mensagem } from "../../components/mensagem";
import { ValoresMessagem } from "../../../types"
import { ObjetoInformacaoLead, ObjetoOportunidades, LocalStorageLead } from "../../../types"

import "./styles.scss";

type DestaqueSpan = {
    name?: string,
    telefone?: string,
    email?: string
}

const nomeLocalStorage = "listLeads-leads";

if (localStorage.getItem(nomeLocalStorage) === null) {

    localStorage.setItem(nomeLocalStorage, JSON.stringify([]));
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

    const [configuracaoAtualMensagem, setConfiguracaoAtualMensagem] = useState<ValoresMessagem>({
        displayContainer: { display: "none" },
        mensagem: ""
    });

    const [checkBoxOportunidade, setCheckboxOportunidade] = useState<ObjetoOportunidades>({
        rpa: "",
        produtoDigital: "",
        analytics: "",
        bpm: ""
    });

    const [rpaChecked, setRpaChecked] = useState<boolean>(false);
    const [produtoDigitalChecked, setProdutoDigitalChecked] = useState<boolean>(false);
    const [analyticsChecked, setAnalyticsChecked] = useState<boolean>(false);
    const [bpmChecked, setBpmChecked] = useState<boolean>(false);
    const [totalChecked, setTotalChecked] = useState<boolean>(false);
    const [salvarMensagem, setSalvarMensagem] = useState<boolean>(false);


    function salvarTelefone(valor: string) {


        if (valor === "(") {
            setTelefone("")
            console.log(valor)
        }
        else if (valor.length >= 1) {
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
            configuracaoMensagem(mensagemErro, { display: "flex" })
        }
        else {
            setDestaqueSpan({
                name: "",
                telefone: "",
                email: ""
            })

            const localStorageInterno: any[] = JSON.parse(localStorage.getItem(nomeLocalStorage) as string);

            let oportunidades: string[] = [];

            Object.values(checkBoxOportunidade).forEach(valores => {
                if (valores !== "") oportunidades.push(valores);
            })

            const localStorageLead: LocalStorageLead = {
                arrayRow: {
                    primeiroCampo: "",
                    segundoCampo: "",
                    terceiroCampos: ""
                },
                informacao: {
                    name: name,
                    telefone: telefone,
                    email: email,
                    oportunidades: oportunidades
                }
            };

            localStorageInterno.push(localStorageLead);

            localStorage.setItem(nomeLocalStorage, JSON.stringify(localStorageInterno));

            limparCampos();

            configuracaoMensagem("Lead Cadastrada com sucesso, voltando para o gerênciamento!", { display: "flex" })

            setSalvarMensagem(true);
        }
    }

    function limparCampos() {
        setName("");
        setEmail("");
        setTelefone("");

        limparCheckBox();
    }

    function limparCheckBox() {
        let objetoInternaCheckBox = checkBoxOportunidade;

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

    function configuracaoMensagem(mensagem: string, display: CSSProperties) {
        setConfiguracaoAtualMensagem({
            displayContainer: display,
            mensagem: mensagem
        })
    }

    function closeMensagem() {
        configuracaoMensagem("", { display: "none" })

        if (salvarMensagem === true) {
            setSalvarMensagem(false);

            window.location.href = "http://localhost:3000/leads";
        }
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
                    limparCheckBox();
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
                                            <input
                                                type="checkbox"
                                                onChange={() => { salvarCheckBox("total") }}
                                                checked={totalChecked}
                                            />
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
                <Mensagem displayContainer={configuracaoAtualMensagem.displayContainer} mensagem={configuracaoAtualMensagem.mensagem} setDisplay={closeMensagem} />
            </div>
        </>
    );
}

export { NewLeads }