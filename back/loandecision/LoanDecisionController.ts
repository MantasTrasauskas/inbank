import express, { Request, Response } from 'express';
import { validationResult, ValidationChain, query } from 'express-validator';
import LoanDecisionService from '../services/LoanDecisionService';
import LoadDecisionRequestValidator from '../common/LoadDecisionRequestValidator';
import { logger } from '../util/Logger';

interface LoanDecisionRequest {
  personalNumber: string;
  loanAmount: string;
  loanPeriod: string;
}
class LoanDecisionController {
  loanDecisionService: LoanDecisionService;
  router: express.Router;
  loanDecisionRequestValidator: LoadDecisionRequestValidator;
  private personalNrLimits: Array<number> = JSON.parse(
    process.env.PERSONAL_NUMEBR_LIMITS
  );
  private loanAmountLimits: Array<number> = JSON.parse(
    process.env.LOAN_AMOUNT_LIMIT
  );
  private loanPeriodLimit: Array<number> = JSON.parse(
    process.env.LOAN_PERIOD_LIMIT
  );

  constructor() {
    this.loanDecisionService = new LoanDecisionService(
      this.loanAmountLimits[1],
      this.loanPeriodLimit[1]
    );
    this.router = express.Router();
    this.loanDecisionRequestValidator = new LoadDecisionRequestValidator(
      this.personalNrLimits,
      this.loanAmountLimits,
      this.loanPeriodLimit
    );
  }

  validate = (validations: ValidationChain[]) => {
    return async (
      req: express.Request<
        Record<string, any> | undefined,
        unknown,
        unknown,
        LoanDecisionRequest
      >,
      res: express.Response,
      next: express.NextFunction
    ) => {
      await Promise.all(validations.map((validation) => validation.run(req)));

      const errors = validationResult(req);
      if (errors.isEmpty()) {
        logger.debug('No Errors in query params');
        return next();
      }
      logger.debug(`Errors in query params ${JSON.stringify(errors)}`);
      res.status(400).json({ errors: errors.array() });
    };
  };

  getRoutes() {
    const routes = this.router.get(
      '/',
      this.validate([
        query('personalNumber').custom(
          this.loanDecisionRequestValidator.isPersonalNrValid
        ),
        query('loanAmount').custom(
          this.loanDecisionRequestValidator.isLoanAmountValid
        ),
        query('loanPeriod').custom(
          this.loanDecisionRequestValidator.isLoanPeriodValid
        ),
      ]),
      async (
        req: Request<unknown, unknown, unknown, LoanDecisionRequest>,
        res: Response
      ) => {
        try {
          const loanDecisionResponse =
            await this.loanDecisionService.getLoanDecision(
              parseInt(req.query.personalNumber),
              parseInt(req.query.loanAmount),
              parseInt(req.query.loanPeriod)
            );
          logger.debug(`loanDecisionResponse: ${JSON.stringify(loanDecisionResponse)}`);
          res.status(200).send(loanDecisionResponse);
        } catch (e: any) {
          logger.error(`loanDecisionResponse error: ${e.message}`);
          res.status(500).send(e.message);
        }
      }
    );
    return routes;
  }
}
export = LoanDecisionController;
