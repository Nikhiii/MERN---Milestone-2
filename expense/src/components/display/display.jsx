import * as React from 'react';
import { currencyFormat, percentFormat } from '../../utils';
import styled from 'styled-components';

const DisplayStyles = styled.div`
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 5rem;
`;
const TitleStyles = styled.h2`
    font-size: 2.5rem,
      font-weight: 300,
      margin-bottom: 1.5rem,
      text-align: center
`;

const BudgetStyles = styled.h1`
      font-size: 4.6rem;
      font-weight: 300;
      text-align: center;
      margin-bottom: 1.5rem;
`;
const IncomeStyle = styled.div`
        display: flex;
        align-items: center;
        padding: 1.2rem;
        border-radius: 8px;
        font-size: 1.8rem;
        background-color: rgba(1, 146, 69, 0.8);
  `;
const IncText = styled.div `
    flex: 1;
`;
const IncValue = styled.div `
margin-right: 0.5rem;
`;

const ExpenseStyles = styled.div`
      display: flex;
      align-items: center;
      padding: 1.2rem;
      border-radius: 8px;
      font-size: 1.8rem;
      background-color: rgba(228, 87, 53, 0.8);  
`;
const Percentage = styled.div`
        font-size: 1.3rem;
        width: 3.4rem;
        padding: 0.5rem;
        border-radius: 8px;
        background-color: rgba(228, 87, 53, 0.2);
        text-align: center;
`;
const Value = styled.div`
margin-right: 0.5rem;
`;
const Text = styled.div`
flex: 1;
`;

const Display = ({ income, expenses }) => {
  console.log(income)
    const budget = income - expenses;
    const expensesPercentage = income !== 0 ? expenses / income : 0;
  
    return (
      <DisplayStyles>
        <Title />
        <Budget value={budget} />
        <Income value={income} />
        <Expenses value={expenses} percentage={expensesPercentage} />
      </DisplayStyles>
    );
  }
  
  // Title
  const  Title = () => {
    const month = new Date().toLocaleString('default', { month: 'long' });
    const year = new Date().getFullYear();
  
    return (
      <TitleStyles>
        Budget available in {month} {year}:
      </TitleStyles>
    );
  }
  
  // Budget
  const Budget = ({ value }) => {
    const sign = value > 0 ? '+ ' : value < 0 ? '- ' : '';
  
    return (
      <BudgetStyles>
        {sign}
        {currencyFormat(Math.abs(value))}
      </BudgetStyles>
    );
  }
  
  // Income
  const Income = ({ value }) => {
    return (
      <IncomeStyle>
        <IncText>Income</IncText>
        <IncValue>
          {value === 0 ? '' : '+ '}
          {currencyFormat(value)}
        </IncValue>
        <div className="percentage hidden">&nbsp;</div>
      </IncomeStyle>
    );
  }
  

  // Expenses
  const Expenses = ({
    value,
    percentage,
  }) => {
    return (
      <ExpenseStyles>
        <Text>Expenses</Text>
        <Value>
          {value === 0 ? '' : '- '}
          {currencyFormat(value)}
        </Value>
        <Percentage>{percentFormat(percentage)}</Percentage>
      </ExpenseStyles>
    );
  }
  
  export { Display };