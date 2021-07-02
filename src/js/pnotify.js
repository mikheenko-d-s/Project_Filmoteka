import { info, error, defaults } from "@pnotify/core";
import '@pnotify/core/dist/Material.css';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/confirm/dist/PNotifyConfirm.css";


export function inform(text) {
    info({
        text: `${text}`,
    });
};
 
export function errorInfo(text) {
  error({
        title: "Error:",
        text: `${text}`,
    });  
};