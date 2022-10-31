
# Inbank homework
## What it contains
./back - contains the back end NodeJS API
./front - contains the ReactJS frontend

## How to run

To Start back go to `./back` run `yarn && yarn start`
To Start front go to `./front` run `yarn && yarn start`

## How to test back end
Go to  `./back` run `yarn test`

## Environment Variables

To run back end API, you will need to add the following environment variables to your .env file in ./back

```
PERSONAL_NUMEBR_LIMITS='[49002010965,49002010976,49002010987,49002010998]'
LOAN_AMOUNT_LIMIT='[2000, 10000]'
LOAN_PERIOD_LIMIT='[12,60]'
DEBUG_LOGS='true'
PORT='4000'
```

To run front end, you will need to add the following environment variables to your .env file in ./front

```
REACT_APP_PERSONAL_NUMEBR_LIMITS: [49002010965,49002010976,49002010987,49002010998],
REACT_APP_LOAN_AMOUNT_LIMIT: [2000, 10000],
REACT_APP_LOAN_PERIOD_LIMIT: [12,60],
BACK_END_URL: 'http://localhost:4000/loandecision',
```

# NOTES
## What is Here
### Backend API
A working NodeJS app with very few unit tests written with type script. What it desperately lacks is more unit tests, `./back/app.test.ts` will be enough to show that I can write them and know how to do that.
Includes query param validation.
Also in the homework description I have noticed that it says how to calculate the credit rating, but does not say how the maximum loan amount can be calculated.
There for for now it max loan amount is calculates by multiplying credit score with loan amount.


### Front end
Simple ReactJS app with single form. Sadly had no time to include unit tests. Also as I have not worked with front end for nearly 2 years knowledge is a bit rusty.
Includes query param font end validation.
Result section does not look great, and homework description lacks details on how it should look like.
Error display also does not look great. but displays all errors. 
