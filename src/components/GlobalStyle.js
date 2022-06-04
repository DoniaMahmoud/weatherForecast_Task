import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
} 

//Mobile Friendly
html{
    @media(max-width:1700px){
        font-size: 75%;
    }
   
}
body{
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
    h2{
        font-weight: normal;
    }
}


`;

export default GlobalStyle;
