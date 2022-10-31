import config from "../../config";

export const isPersonalNrValid = (value) => {
    return config.REACT_APP_PERSONAL_NUMEBR_LIMITS.includes(Number(value));
}

export const isLoanAmountValid = (value) => {
    const loanAmount = Number(value)
    if (isNaN(loanAmount)) return false;
    if (loanAmount < config.REACT_APP_LOAN_AMOUNT_LIMIT[0] || loanAmount > config.REACT_APP_LOAN_AMOUNT_LIMIT[1]) return false;
    return true;
}
export const isLoanPeriodValid = (value) => {
    const currentDate = new Date();
    const newDate = new Date(value);
    if (isNaN(newDate)) return false;
    const months = newDate.getMonth() - currentDate.getMonth() +
        (12 * (newDate.getFullYear() - currentDate.getFullYear()));
    if (months < config.REACT_APP_LOAN_PERIOD_LIMIT[0] || months > config.REACT_APP_LOAN_PERIOD_LIMIT[2]) return false;
    return true;
}
