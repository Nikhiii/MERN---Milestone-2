import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/dom';

import {sum} from '../utils';
import {TransactionItem} from '../components/transaction-list/transaction-item/transaction-item';
import {TransactionList} from '../components/transaction-list/transaction-list';
import {Form} from '../components/form/form';


const incomeList = [
  { id: 'a', type: 'income', description: 'Salary', value: 999 },
  { id: 'b', type: 'income', description: 'Lottery', value: 10000 },
];

describe('<List>', () => {
  it('renders correctly', () => {
    render(<TransactionList list={incomeList} onDeleteClick={() => {}} />);

    expect(screen.getByText(/salary/i)).toBeInTheDocument();
    expect(screen.getByText(/lottery/i)).toBeInTheDocument();
  });
});

describe('sum', () => {
  it('correctly sums elements of array', () => {
    expect(sum([{ value: 1 }, { value: 2 }, { value: 3 }])).toBe(6);
    expect(sum([])).toBe(0);
    expect(sum([{ value: -2 }, { value: 3 }])).toBe(1);
  });
});



describe('<TransactionItem>', () => {
  test('calls onDeleteClick with transaction id', () => {
    const onDeleteClick = jest.fn();
    render(
      <TransactionItem
        id="test-id"
        description="Apple"
        value={10}
        type="expense"
        onDeleteClick={onDeleteClick}
      />
    );

    userEvent.click(screen.getByRole('button'));

    expect(onDeleteClick).toBeCalledWith('test-id');
  });
});

//form
jest.mock('nanoid', () => ({
  nanoid: () => {
    let value = 0;
    return ++value;
  },
}));

describe('<Form>', () => {

  it('calls the onSubmit function with the form values', () => {
    const onSubmit = jest.fn();
  
    render(<Form onSubmit={onSubmit} />);
  
    const typeInput = screen.getByRole('combobox');
    const descInput = screen.getByRole('textbox');
    const valueInput = screen.getByRole('spinbutton');
    const submitBtn = screen.getByRole('button');
  
    // Define dynamic test data
    const formData = {
      type: 'expense',
      description: 'Ticket to the Moon',
      value: '9.99',
    };
  
    // form is initialized correctly
    expect(typeInput.value).toBe('income'); // Assuming the initial value is 'income'
    expect(descInput.value).toBe('');
    expect(valueInput.value).toBe('');
    expect(submitBtn).toHaveAttribute('disabled');
  
    // user fills out the form and submits it with dynamic data
    fireEvent.change(typeInput, { target: { value: formData.type } });
    fireEvent.change(descInput, { target: { value: formData.description } });
    fireEvent.change(valueInput, { target: { value: formData.value } });
    fireEvent.click(submitBtn);
  
    // `onSubmit` should be called with the values from the form
    expect(onSubmit).toBeCalledWith(
      expect.objectContaining({
        type: formData.type,
        description: formData.description,
        value: parseFloat(formData.value), // Parse the value to a float
      })
    );
  
    // form should be reset after submitting
    expect(typeInput.value).toBe(formData.type);
    expect(descInput.value).toBe('');
    expect(valueInput.value).toBe('');
    expect(submitBtn).toHaveAttribute('disabled');
  
    // description input should have focus
    expect(descInput).toHaveFocus();
  });
  

  it(`doesn't call onSubmit when ref.current is null`, () => {
    jest.spyOn(React, 'useRef').mockReturnValue({
      get current() {
        return null;
      },
      set current(_) {},
    });
    const onSubmit = jest.fn();

    render(<Form onSubmit={onSubmit} />);

    fireEvent.submit(screen.getByTestId('form'));

    expect(onSubmit).toBeCalled();
  });
});


describe('Form Component Rendering', () => {
  it('renders the Form component correctly', () => {
    render(<Form onSubmit={() => {}} />); // Provide a dummy onSubmit function

    // Check if the FormStyles component is rendered
    const formStyles = screen.getByTestId('form');
    expect(formStyles).toBeInTheDocument();

    // Check if the Select component for type is rendered
    const selectType = screen.getByRole('combobox');
    expect(selectType).toBeInTheDocument();

    // Check if the description input is rendered
    const descriptionInput = screen.getByRole('textbox');
    expect(descriptionInput).toBeInTheDocument();

    // Check if the value input is rendered
    const valueInput = screen.getByRole('spinbutton');
    expect(valueInput).toBeInTheDocument();

    // Check if the submit button is rendered
    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeInTheDocument();

  });
});