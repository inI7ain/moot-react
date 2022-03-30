import { Routes, Route } from "react-router-dom";

import LoginForm from "./components/loginForm/loginForm.component";
import SignupForm from "./components/signupForm/signupForm.component";
import Home from "./components/home/home.component";

import './App.scss';


function App() {
  return (
      <Routes>
        {/* Fiókkal kapcsolatos */}
        <Route index element={<LoginForm />} /> {/* index - alapértelmezett útvonal */}
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/logout" element={<SignupForm />} />

        {/* App navigáció */}
        <Route path="/home" element={<Home />}>

        </Route>
      </Routes>
  );
}

export default App;
