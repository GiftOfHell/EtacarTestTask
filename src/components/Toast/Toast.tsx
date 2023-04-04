import React, {useContext} from "react";

import toastStyles from "./Toast.module.scss";
import {ToastContext, ToastContextState} from "../../contexts/toast.context";

function Toast() {
    const {errorMessage, shouldShowToast, setShouldShowToast} = useContext<ToastContextState>(ToastContext);

    const preparedToastClassName = `{${toastStyles.toast} ${shouldShowToast ? toastStyles.show : toastStyles.do_not_show}`;

    return (
        <div className={preparedToastClassName}>
            <div className={toastStyles.toast_header}>
                <strong>Error Message</strong>
                <div className={toastStyles.close} onClick={() => setShouldShowToast(false)}>×</div>
            </div>
            <div className={toastStyles.toast_body}>{errorMessage}</div>
        </div>
    );
}

export default Toast;
