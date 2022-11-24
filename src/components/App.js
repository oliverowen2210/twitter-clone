import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import Twitter from "./Twitter";
import SignupPage from "./SignupPage";

function App(props) {
  return (
    <Router>
      <Routes>
        <Route path="/:user" element={<Twitter firebase={props.firebase} />} />
        <Route
          path="/signup"
          element={<SignupPage auth={props.firebase.auth} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
