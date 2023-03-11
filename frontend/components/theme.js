export const lightTheme = {
  palette: {
    type: "light",
    primary: {
      main: "#01BAEF",
      gray: "#e0e0e0",
      border: "#d2dae1",
      light: "#FFFFFF",
      dark: "#555",
    },
    secondary: {
      main: "#FA58B6", //"previously #E07A5F"
      gray: "#F2F6F9",
      light: "#f3f6f9",
      dark: "#011627",
    },
    background: {
      paper: "#fff",
      default: "#fff",
    },
    info: {
      main: "#FF8B13",
      secondary: "#01BAEF",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h1: { fontFamily: "Poppins, sans-serif" },
    body2: {
      fontFamily: "Poppins, sans-serif",
      fontSize: "0.9rem",
      fontWeight: 400,
      lineHeight: 1.8,
    },
    h2: {
      fontFamily: "Poppins, sans-serif",
    },
    h3: {
      fontFamily: "Poppins, sans-serif",
      fontFamily: "Major Mono Display, monospace",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.1rem",
      fontFamily: "Poppins, sans-serif",
      color: "#00112c",
    },
    h5: {
      fontWeight: 400,
      fontSize: "1.1rem",
      fontFamily: "Poppins, sans-serif",
      color: "#00112c",
    },
    h6: {
      fontWeight: 300,
      fontSize: "0.78rem",
      fontFamily: "sans-serif",
    },
    caption: {
      color: "primary.light",
      fontSize: "0.8rem",
      fontWeight: "light",
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: "1.1rem",
      fontFamily: "Roboto, sans-serif",
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: ".95rem",
      fontFamily: "Roboto, sans-serif",
    },
  },
  props: {
    MuiAppBar: {
      color: "default",
    },
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: "small",
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
};
