import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  border-top: 2px solid #d3d3d3;
`;

export const StyledInput = styled.input`
  border: none;
  border-radius: 0;
  padding: 2%;
  width: 80%;
  font-size: 1.2em;

  :focus {
    outline: none;
  }
`;

export const SendButton = styled.button`
  color: #fff !important;
  cursor: pointer;
  text-transform: uppercase;
  text-decoration: none;
  background: green;
  padding: 10px;
  display: inline-block;
  border: none;
  width: 20%;

  :hover {
    opacity: 0.8;
  }
`;
