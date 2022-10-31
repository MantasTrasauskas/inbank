import { LoanDecision } from './ILoanDecisionService';
import CreditModifierCahce from '../cache/CreditModifierCahce';

class LoanDecisionService {
  private cMCache: CreditModifierCahce;
  private loanAmountMaxLimits: number;
  private loanPeriodLimit: number;

  constructor(loanAmountMaxLimits: number, loanPeriodLimit: number) {
    this.cMCache = new CreditModifierCahce();
    this.loanAmountMaxLimits = loanAmountMaxLimits;
    this.loanPeriodLimit = loanPeriodLimit;
  }

  getLoanDecision(
    personalNumber: number,
    loanAmount: number,
    loanPeriod: number
  ): LoanDecision {
    const creditModifier = this.getModifier(personalNumber);
    const creditScore = this.getCreditScore(
      creditModifier,
      loanAmount,
      loanPeriod
    );
    const calculateLoanAmountAvailable = this.getCurrentLoanAmount(
      creditScore,
      loanAmount
    );
    const isSummedApproved = this.isSumApproved(
      creditScore,
      calculateLoanAmountAvailable,
      loanAmount
    );
    const maxLoanAmount = this.getMaxLoanAmount(
      creditModifier,
      this.loanAmountMaxLimits,
      this.loanPeriodLimit
    );
    return {
      loanAmountAvailable: calculateLoanAmountAvailable,
      isSummedApproved: isSummedApproved,
      maxLoanAmount: maxLoanAmount,
    };
  }

  isSumApproved(
    creditScore: number,
    calculatedLoanAmount: number,
    loanAmount: number
  ): boolean {
    if (creditScore >= 1) {
      if (loanAmount <= calculatedLoanAmount) {
        return true;
      }
    }
    return false;
  }

  getMaxLoanAmount(
    creditModifier: number,
    loanAmountMaxLimits: number,
    loanPeriodLimit: number
  ): number {
    const maxCreditScore = this.getCreditScore(
      creditModifier,
      loanAmountMaxLimits,
      loanPeriodLimit
    );
    return this.getCurrentLoanAmount(maxCreditScore, loanAmountMaxLimits);
  }

  getCurrentLoanAmount(creditScore: number, loanAmount: number): number {
    return Math.round(creditScore * loanAmount);
  }

  private getModifier(personalNumber: number): number {
    const creditModifier = this.cMCache.getCreditModifier(personalNumber);
    return creditModifier;
  }
  getCreditScore(
    creditModifier: number,
    loanAmount: number,
    loanPeriod: number
  ): number {
    const creditScore = (creditModifier / loanAmount) * loanPeriod;
    return creditScore;
  }
}
export = LoanDecisionService;
