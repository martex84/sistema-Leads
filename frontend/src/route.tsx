import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "./App";
import { Leads } from "./view/page/leads";
import { NewLeads } from "./view/page/new-leads"

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={App} path="/" exact />
                <Route component={Leads} path="/leads" exact />
                <Route component={NewLeads} path="/leads/new" exact />
            </Switch>
        </BrowserRouter>);
}

export { Routes };