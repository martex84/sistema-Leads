import { RetornoLocalStorage } from "../types"

function criacaoLocalStorage() {
    const nomeLocalStorage: RetornoLocalStorage = {
        leads: "listLeads-leads",
        login: "listLeads-login"
    }

    if (localStorage.getItem(nomeLocalStorage.leads) === null) {

        localStorage.setItem(nomeLocalStorage.leads, JSON.stringify([]));
    }

    if (localStorage.getItem(nomeLocalStorage.login) === null) {
        localStorage.setItem(nomeLocalStorage.login, JSON.stringify(""));
    }

    return nomeLocalStorage
}

export { criacaoLocalStorage }