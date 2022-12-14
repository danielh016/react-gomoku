import styled from 'styled-components';

export const MessageBox = styled.div`
  background: ${(props) => {
    if (props.theme === 'dark') return '#2979FF';
    if (props.theme === 'light') return '#F3F3F3';
    return '#F3F3F3';
  }};
  border-radius: 20px;
  padding: 5px 20px;
  color: white;
  display: inline-block;
  max-width: 80%;
`;

export const MessageText = styled.p`
  color: ${(props) => {
    if (props.theme === 'dark') return 'white';
    if (props.theme === 'light') return '#353535';
    return '#353535';
  }};
  width: 100%;
  letter-spacing: 0;
  float: left;
  font-size: 1.1em;
  word-wrap: break-word;

  img {
    vertical-align: middle;
  }
`;

export const MessageContainer = styled.div`
  display: flex;
  justify-content: ${(props) => {
    if (props.start) return 'flex-start';
    if (props.end) return 'flex-end';
    return 'flex-end';
  }};
  padding: 0 5%;
  margin-top: 3px;
`;

export const SentText = styled.p`
  display: flex;
  align-items: center;
  font-family: Helvetica;
  color: #828282;
  letter-spacing: 0.3px;

  padding-left: ${(props) => (props.left ? '10px' : '0')};
  padding-right: ${(props) => (props.right ? '10px' : '0')};
`;
