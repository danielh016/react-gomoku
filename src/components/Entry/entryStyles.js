import styled from 'styled-components';

export const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  height: 100vh;
  align-items: center;
  background-color: #1a1a1d;

  @media (min-width: 320px) and (max-width: 480px) {
    height: 100%;
  }
`;

export const InnerContainer = styled.div`
  width: 20%;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 90%;
  }
`;

export const Input = styled.input`
  border-radius: 0;
  padding: 15px 20px;
  width: 100%;
  margin-bottom: 20px;
`;

export const Heading = styled.h1`
  color: white;
  font-size: 2.5em;
  padding-bottom: 10px;
  border-bottom: 2px solid white;
`;

export const Button = styled.button`
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #2979ff;
  padding: 20px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  width: 100%;
  margin-top: 20px;

  :focus {
    outline: 0;
  }
`;
