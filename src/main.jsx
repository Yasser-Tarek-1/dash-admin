import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { ThemeProvider, createTheme } from "@mui/material";
import "./global.css";
import { yellow } from "@mui/material/colors";
import { store } from "./store";
import { Provider } from "react-redux";

const theme = createTheme({
  palette: {
    primary: {
      main: "#131921",
    },
    secondary: { main: yellow[800] },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);
