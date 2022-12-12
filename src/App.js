import { BrowserRouter as Router } from "react-router-dom";
import Views from "./views";
import { AuthContextProvider } from "./Context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { StyledEngineProvider } from "@mui/material/styles";

import "./App.css";
function App() {
  return (
    <AuthContextProvider>
      <StyledEngineProvider injectFirst>
        <Router>
          <Views />
        </Router>
      </StyledEngineProvider>
    </AuthContextProvider>
  );
}

export default App;
