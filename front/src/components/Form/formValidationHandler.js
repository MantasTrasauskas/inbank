export const isPersonalNrValid = (value) => {
    return [49002010965, 49002010976, 49002010987, 49002010998].includes(Number(value));
}

export const isLoanAmountValid = (value) => {
    const loanAmount = Number(value)
    if (isNaN(loanAmount)) return false;
    if (loanAmount < 2000 || loanAmount > 10000) return false;
    return true;
}
export const isLoanPeriodValid = (value) => {
    const currentDate = new Date();
    const newDate = new Date(value);
    if (isNaN(newDate)) return false;
    const months = newDate.getMonth() - currentDate.getMonth() +
        (12 * (newDate.getFullYear() - currentDate.getFullYear()));
    if (months < 12 || months > 60) return false;
    return true;
}
