import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "./App";
import { Leads } from "./view/page/leads";

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={App} path="/" exact />
                <Route component={Leads} path="/leads" exact />
            </Switch>
        </BrowserRouter>);
}

export { Routes };