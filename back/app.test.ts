import request from 'supertest';
import app from './App';

describe('GET /quote', () => {
  it('Should return isSummedApproved and loanAmountAvailable and loanAmountAvailable given personalNumber, loanAmount and loanPeriod', async () => {
    const res = await request(app)
      .get('/loandecision')
      .query({
        personalNumber: '49002010976',
        loanAmount: '2001',
        loanPeriod: '60'
      });

    expect(res.body.isSummedApproved).toBeTruthy();
    expect(res.body.loanAmountAvailable).toBe(6000);
    expect(res.body.loanAmountAvailable).toBe(6000);
  });
  it('Should return error for Personal Number', async () => {
    const res = await request(app)
      .get('/loandecision')
      .query({
        personalNumber: '49002010976s',
        loanAmount: '2001',
        loanPeriod: '60'
      });

    expect(res.body.errors.length).toBe(1);
    expect(res.body.errors[0].param).toBe('personalNumber');
  });
});
