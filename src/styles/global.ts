import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyles = createGlobalStyle`
  ${normalize}

  *,
  h1,
  *::after,
  *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  a {
    text-decoration: none;
  }
  
  button {
    border: none;
    outline: none;
    background-color: unset;
  }

  html{
    font-size: 62.5%;
  }

  body {
    font-family:'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    font-size: 1.6rem;
  }
  
  #root .app {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
`;

export default GlobalStyles;
