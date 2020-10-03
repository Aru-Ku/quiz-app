import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
	palette: {
		primary: {
			main: "#ffffff",
			dark: "#115293",
			light: "#4791db",
		},
		secondary: {
			main: "#dc004e",
			dark: "#9a0036",
			light: "#e33371",
		},
	},
});

theme = responsiveFontSizes(theme);

export default theme;
