import express, { Application } from 'express';
import LoanDecisionController from './loandecision/LoanDecisionController';

const app: Application = express();

app.use(express.json());

const loanDecisionController = new LoanDecisionController();
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  next();
});
app.use('/loandecision', loanDecisionController.getRoutes());

export default app;
