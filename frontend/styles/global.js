import { css } from '@emotion/core';

const global = css`

  @import url('https://fonts.googleapis.com/css?family=Montserrat:700|Hind+Madurai:400|Lora:500');
  
  :root {
    /* CUSTOM PROPS */
    --shadowLight: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    --shadowMedium: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    --shadowHeavy: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    --grey: #E6E6E6;
    --yellow: #FFB736;
    --red: #D93A2B;
    --green: #008C3E;
    --purple: #AA72DB;
    --pink: #F2AEBB;
    --pinkMuted: #EDBCAF;
    --blueLight: #BBCDF2;
    --blueMedium: #324E73;
    --blueDark: #1F2A40;
    --borderRadius: 5px;
  }

  html {
    font-size: 100%; /*16px*/
    box-sizing: border-box;
    margin: 0;
    padding: 0;

  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
  
  body {
    background-color: white;
    font-family: 'Hind Madurai', sans-serif;
    font-weight: 400;
    line-height: 1.65;
    color: #333;
    padding: 0;
    margin: 0;
  }

  p {margin-bottom: 1.15rem;}

  h1, h2, h3, h4, h5 {
    margin: 2.75rem 0 1.05rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    line-height: 1.15;
  }

  h1 {
    margin-top: 0;
    font-size: 4.209em;
  }

  h2 {font-size: 3.157em;}

  h3 {font-size: 2.369em;}

  h4 {font-size: 1.777em;}

  h5 {font-size: 1.333em;}

  small, .text_small {font-size: 0.75em;}
`;

export default global;