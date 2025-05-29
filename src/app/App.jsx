import { StyledEngineProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Layout from "../components/layouts/layout";
import { Provider } from "react-redux";
import { store } from './store.js'
import './styles/global.css'

createRoot(document.getElementById("root")).render(
    <StrictMode>
      <Provider store={store}>
        <StyledEngineProvider>
          <Layout />
        </StyledEngineProvider>
      </Provider>
    </StrictMode>
  );