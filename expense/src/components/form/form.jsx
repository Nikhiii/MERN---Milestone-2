import * as React from 'react';
import { BsPlusCircle as PlusIcon } from 'react-icons/bs';
// import { nanoid } from 'nanoid';
import styled from 'styled-components';


const FormStyles = styled.form `
    max-width: 60rem;
    margin: 0 auto;
    display: flex;
    justify-content: center;
`;
const FormInput = styled.input `
      color: inherit;
      padding: 1.4rem;
      border: 1px solid gray;
      border-radius: 8px;
      margin-right: 1rem;
      transition: border 300ms;
      font-size: 1.4rem;
      grid-area: description;
      flex: 1;
`;

const FormInputValue = styled.input `
      color: inherit;
      padding: 1.4rem;
      border: 1px solid gray;
      border-radius: 8px;
      margin-right: 1rem;
      transition: border 300ms;
      font-size: 1.4rem;
      grid-area: type;
      font-weight: bold;
`;

const Select = styled.select `
      color: inherit;
      padding: 1.4rem;
      border: 1px solid gray;
      border-radius: 8px;
      margin-right: 1rem;
      transition: border 300ms;
      font-size: 1.4rem;
      grid-area: type;
      font-weight: bold;
    `;

const Button = styled.button `
      grid-area: submit;
      padding: 0 0.8rem;
      font-size: 3rem;
      border: 1px solid transparent;
  
      svg {
        fill: #019245;
      }
  
      &:focus {
        border: 1px solid #019245;
      }
`
function Form({ onSubmit }) {
    const descriptionRef = React.useRef(null);
    const [type, setType] = React.useState('income');
    const [description, setDescription] = React.useState('');
    const [value, setValue] = React.useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (!descriptionRef.current) return;
      onSubmit({
              id: Date.now(),
              type,
              description,
              value: Number(value),
            });
        
            setDescription('');
            setValue('');
            descriptionRef.current.focus();
  
      // `onSubmit` should be called with form values like id, type(expense or income),description and value(number). 
  
  
      // The form should be reset after submission and description input should have focus. 
      //It should not call 'onSubmit' when 'ref.current' is null.
      
    };
  
    
    const isButtonDisabled = description === '' || value === '';
  
    return (
      <FormStyles data-testid="form" onSubmit={handleSubmit}>
        <Select
          aria-label="select type"
          value={type}
          onChange={(e) => setType(e.currentTarget.value)}
        >
          <option aria-label="income" value="income">
            ➕
          </option>
          <option aria-label="expense" value="expense">
            ➖
          </option>
        </Select>
        <FormInput
          type="text"
          placeholder="Add description"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          ref={descriptionRef}
          required
        />
        <FormInputValue
          type="number"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          required
        />
  
        <Button
          aria-label="submit"
          type="submit"
          disabled={isButtonDisabled}
        >
          <PlusIcon />
        </Button>
      </FormStyles>
    );
  }
  
  export { Form };
  
