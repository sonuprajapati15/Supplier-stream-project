import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Inter', Arial, sans-serif;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    min-height: 100vh;
  }
  * {
    box-sizing: border-box;
  }
  a {
    color: ${({ theme }) => theme.colors.blue};
    text-decoration: none;
  }
`;

export default GlobalStyle;