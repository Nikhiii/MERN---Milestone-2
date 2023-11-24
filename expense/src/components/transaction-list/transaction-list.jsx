import * as React from 'react';
import { TransactionItem } from './transaction-item/transaction-item';
import styled from 'styled-components';

const List  = styled.ul `
    list-style: none;
`


const TransactionList = ({ list, onDeleteClick }) => {
    return (
      <List>
        {/* 
        Map the TransactionItem component 
        So that it renders income list and expenditures list correctly with onDeleteClick functionality
        */}
         {list.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          onDeleteClick={onDeleteClick}
          {...transaction}
        />
      ))}
      </List>
    );
  }
  
  export { TransactionList };
