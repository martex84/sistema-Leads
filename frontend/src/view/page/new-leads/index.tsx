
import { CSSProperties, useEffect, useState } from "react";

import { Logo } from "../../components/logo";
import { Mensagem } from "../../components/mensagem";
import { ObjetoOportunidades, LocalStorageLead, ValoresMessagem, RetornoAutenticacao, RetornoLocalStorage } from "../../../types"
import { autenticacaoLogin } from "../../../services/autenticacaoLogin";
import { criacaoLocalStorage } from "../../../services/criacaoLocalStorage"

import "./styles.scss";

type DestaqueSpan = {
    [index: string]: any,
    name: string,
    telefone: string,
    email: string,
    oportunidades: string,
}

const nomeLocalStorage: RetornoLocalStorage = criacaoLocalStorage();

function NewLeads() {

    const [name, setName] = useState<string>("");
    const [telefone, setTelefone] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [destaqueSpan, setDestaqueSpan] = useState<DestaqueSpan>({
        name: "",
        telefone: "",
        email: "",
        oportunidades: ""
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
    const [ativarTemplateTelefone, setAtivarTemplateTelefone] = useState<boolean>(false);


    function salvarTelefone(valor: string) {

        let valorIterno: string = "";

        let valorComparacao: string[] = [
            "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "(", ")", " ",
        ];

        const tamanhoValor: number = valor.length;

        for (let i = 0; i <= tamanhoValor; i++) {
            for (let valorArray of valorComparacao) {

                if (valor[i] === valorArray) {
                    valorIterno = valorIterno + valorArray;
                }
            }
        }

        if (valorIterno.slice(valorIterno.length - 2, valorIterno.length) === "  ") {
            valorIterno = valorIterno.slice(0, tamanhoValor - 1);
        }

        switch (tamanhoValor) {
            case 1:
                if (ativarTemplateTelefone === true) {
                    setTelefone("")
                    setAtivarTemplateTelefone(false);
                }
                else {
                    setTelefone(
                        `(${valorIterno}`
                    )
                }
                break;

            case 3:
                if (ativarTemplateTelefone === false) {
                    setAtivarTemplateTelefone(true);

                    setTelefone(
                        `${valorIterno}) `
                    )
                }
                else {
                    setTelefone(valorIterno);
                }
                break;

            default:
                setTelefone(valorIterno);
                break;

        }

    }

    function verificaEmail() {
        let simboloPresente = false;

        for (let i = 0; i <= email.length; i++) {
            if (email[i] === "@") simboloPresente = true;
        }

        return simboloPresente;
    }

    function mudarSpanDestaque(campoPreencher: string, valor: string) {
        let objetoDestaqueSpanInterno: DestaqueSpan = {
            name: "",
            telefone: "",
            email: "",
            oportunidades: ""
        };

        Object.keys(objetoDestaqueSpanInterno).forEach((key: any) => {
            if (key === campoPreencher) {
                objetoDestaqueSpanInterno[key] = valor
            }
        })

        setDestaqueSpan(objetoDestaqueSpanInterno);
    }

    function verificarCampos() {
        let erroCaptado = false;
        let mensagemErro = "";
        let contagemCheckbox: number = 0;

        Object.values(checkBoxOportunidade).forEach(valor => {
            if (valor !== "") {
                contagemCheckbox++;
            }
        })


        if (name === "") {
            erroCaptado = true;

            mensagemErro = "Preencha o campo nome!"

            mudarSpanDestaque("name", "spanDestaqueNewLeads")
        }
        else if (telefone === "") {
            erroCaptado = true;

            mensagemErro = "Preencha o campo telefone!"

            mudarSpanDestaque("telefone", "spanDestaqueNewLeads")
        }
        else if (email === "") {
            erroCaptado = true;

            mensagemErro = "Preencha o campo email!"

            mudarSpanDestaque("email", "spanDestaqueNewLeads")
        }
        else if (verificaEmail() === false) {
            erroCaptado = true;

            mensagemErro = "Preencha o campo email corretamente!"

            mudarSpanDestaque("email", "spanDestaqueNewLeads")
        }
        else if (contagemCheckbox === 0) {
            erroCaptado = true;

            mensagemErro = "Escolha ao menos um tipo de oportunidade!"

            mudarSpanDestaque("oportunidades", "spanDestaqueNewLeads")
        }

        if (erroCaptado === true) {
            configuracaoMensagem(mensagemErro, { display: "flex" })
        }
        else {
            setDestaqueSpan({
                name: "",
                telefone: "",
                email: "",
                oportunidades: ""
            })

            const localStorageInterno: any[] = JSON.parse(localStorage.getItem(nomeLocalStorage.leads) as string);

            let oportunidades: string[] = [];

            Object.values(checkBoxOportunidade).forEach(valores => {
                if (valores !== "") oportunidades.push(valores);
            })

            const localStorageLead: LocalStorageLead = {
                arrayRow: {
                    primeiroCampo: name,
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

            localStorage.setItem(nomeLocalStorage.leads, JSON.stringify(localStorageInterno));

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

    useEffect(() => {
        if (localStorage.getItem(nomeLocalStorage.login) !== null) {
            const autenticacaoLoginInterno: RetornoAutenticacao = autenticacaoLogin();

            if (autenticacaoLoginInterno.permissao === false) {
                localStorage.setItem(nomeLocalStorage.login, JSON.stringify("Erro-Login"));
                window.location.href = autenticacaoLoginInterno.link
            }

        }
    }, [])

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
                                <span className={destaqueSpan.oportunidades}>Oportunidades *</span>
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