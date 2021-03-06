import { createGlobalStyle } from 'styled-components'
import { media } from 'styles'

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    width: 100%;
    height: 100%;
    color: #555;
    overflow: hidden;
  }

  #root {
    width: 100%;
    height: 100%;
    background-color: #fff;
    overflow: hidden;
  }

  h1 {
    font-family: 'Fjalla One', sans-serif;
    font-size: 32px;

    ${media.tabletPortraitUp`
      font-size: 40px;
    `}

    ${media.desktopUp`
      font-size: 50px;
    `}
  }
`

export default GlobalStyle
