import Mikado from "../node_modules/mikado/src/mikado.js";
import Array from "../node_modules/mikado/src/array.js";
import { route } from "../node_modules/mikado/src/event.js";
import tpl_app from "./template/app.js";
import tpl_item from "./template/item.js";
import assignData from "./data.js";

Mikado.once(document.body, tpl_app).eventCache = true;

// This implementation is using a full reactive paradigm.
// It just applies changes to the store like an Array.

let selected;
const store = new Array();
const view = new Mikado(tpl_item, { mount: document.getElementById("tbody"), observe: store });
const event = { stop: true };

route("run", () => assignData(store, 1000), event);
route("runlots", () => assignData(store, 10000), event);
route("add", () => assignData(store, 1000, true), event);
route("update", () => {
    for(let i = 0, len = store.length; i < len; i += 10)
        store[i].label += " !!!"
}, event);
route("clear", () => store.splice(), event);
route("swaprows", () => {
    const tmp = store[998];
    store[998] = store[1];
    store[1] = tmp;
}, event);
route("remove", target => store.splice(view.index(target), 1), event);
route("select", target => {
    selected >= 0 && (store[selected].class = "");
    selected = view.index(target);
    /** @export */
    store[selected].class = "danger";
}, event);