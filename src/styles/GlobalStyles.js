import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	:root {
		/* FOR GLOBAL COLORS & VARIABLES */
		--bg: #ffffff;
		--font: #000000;
	}

	html,
	body {
		margin: 0;
		padding: 0;
		height: 100%;
		position: relative;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
			sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	a, button {
		outline: none;
		cursor: pointer;
		--webkit-tap-highlight-color: transparent;
	}
`;
