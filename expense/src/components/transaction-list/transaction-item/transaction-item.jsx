import * as React from 'react';
import { BsXCircle as CrossIcon } from 'react-icons/bs';
import { currencyFormat } from '../../../utils';
import styled from 'styled-components';

const TransactionItemStyle = styled.li `
    padding: 1.3rem;
    border-bottom: 1px solid var(--gray);
    display: flex;
    justify-content: space-between;
    align-items: center;
  
    &:first-child {
      border-top: 1px solid var(--gray);
    }
  
    /* ITEM HOVER */
    &:hover {
      background-color: var(--gray-extra-light);
`;

const Value = styled.div `
    color: var(--color);
      margin-right: 1rem;
      transition: transform 300ms;
      &:hover {
  
     
        transform: translateX(-20px);
     
    }
`;
const Description = styled.div `
      flex: 1;
      padding: 0.5rem;
`;

const Button = styled.button `
     font-size: 1.9rem;
     svg {
        fill: var(--color);
      }
      &:hover {
      display: flex;
      }
`;

const TransactionItem = ({
  id,
  type,
  description,
  value,
  onDeleteClick,
}) => {
  return (
    <TransactionItemStyle>
    <Description>{description}</Description>

    <Value>
      {type === 'income' ? '+' : '-'}
      {currencyFormat(value)}
    </Value>

    <Button onClick={() => onDeleteClick(id)}>
      <CrossIcon />
    </Button>
  </TransactionItemStyle>
  );
}

export { TransactionItem };
