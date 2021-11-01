
import { Logo } from "../../components/logo";

import "./styles.scss";



function Leads() {

    return (
        <>
            <div className="containerNewLeads">
                <div>
                    <div className="containerHeaderNewLeads">
                        <Logo />
                        <div className="detalhePainelNewLeads">
                            Painel de Leads
                        </div>
                    </div>
                    <div className="containerConteudoNewLeads">

                    </div>
                </div>
            </div>
        </>
    );
}

export { Leads }