import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import {
  Login,
  Pdfview,
  Dashboard,
  Signup,
  Fileupload,
  TokenPage,
} from "./components";

import PrivateRoute from "./auth/PrivateRoutes";
import OpenRoute from "./auth/OpenRoutes";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route path="/fileupload" element={<Fileupload />} />
          </Route>

          <Route path="/pdfview/:argument" exact element={<Pdfview />} />
          <Route path="/token/:token" exact element={<TokenPage />} />
          <Route exact path="/" element={<OpenRoute />}>
            <Route path="/login" exact element={<Login />} />

            <Route path="/signup" exact element={<Signup />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
