declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PERSONAL_NUMEBR_LIMITS: string;
      LOAN_AMOUNT_LIMIT: string;
      LOAN_PERIOD_LIMIT: string;
      DEBUG_LOGS: string;
      PORT: string;
    }
  }
}

export {};
