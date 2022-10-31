import { CustomValidator } from 'express-validator';

class LoanDecisionRequestValidator {
  private personalNrLimits: Array<number>;
  private loanAmountLimits: Array<number>;
  private loanPeriodLimit: Array<number>;

  constructor(
    personalNrLimits: Array<number>,
    loanAmountLimits: Array<number>,
    loanPeriodLimit: Array<number>
  ) {
    this.personalNrLimits = personalNrLimits;
    this.loanAmountLimits = loanAmountLimits;
    this.loanPeriodLimit = loanPeriodLimit;
  }

  isPersonalNrValid: CustomValidator = (value) => {
    return new Promise((resolve, reject) => {
      if (!this.personalNrLimits.includes(Number(value))) {
        reject('Please enter correct value for Personal Number');
      } else {
        resolve('ok');
      }
    });
  };

  isLoanAmountValid: CustomValidator = (value) => {
    return new Promise((resolve, reject) => {
      const loanAmount = Number(value);
      if (isNaN(loanAmount)) {
        reject('Please enter correct value for Loan Amount');
      } else if (
        loanAmount < this.loanAmountLimits[0] ||
        loanAmount > this.loanAmountLimits[1]
      ) {
        reject('Please enter correct value for Loan Amount');
      } else {
        resolve('ok');
      }
    });
  };

  isLoanPeriodValid: CustomValidator = (value) => {
    return new Promise((resolve, reject) => {
      if (isNaN(value)) {
        reject('Please enter correct value for Loan Period');
      }

      if (value < this.loanPeriodLimit[0] || value > this.loanPeriodLimit[1]) {
        reject('Please enter correct value for Loan Period');
      } else {
        resolve('ok');
      }
    });
  };
}

export = LoanDecisionRequestValidator;
