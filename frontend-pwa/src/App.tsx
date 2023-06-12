import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useMemo } from "react";
import AppRoutes from "./routes/AppRoutes";
import BlueTheme from "./theme/BlueTheme";
import { IAppState } from "./models/GeneralTypes";
import "./App.css";
import useNotifyBar from "./hooks/useNotifyBar";

function App() {
  const { mode, notify } = useSelector((state: IAppState) => state.general);
  const [openToast, , snackBar] = useNotifyBar();
  useEffect(() => {
    if (notify) {
      openToast(notify);
    }
  }, [notify]);
  const theme = useMemo(() => createTheme(BlueTheme[mode]), [mode]);
  return (
    <div className={"app"}>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppRoutes />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
      {snackBar}
    </div>
  );
}

export default App;
