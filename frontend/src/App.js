import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/noteState";
import About from "./components/About";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ToastContext from "./context/AlertContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./components/Admin";

function App() {
  return (
    <NoteState>
      <ToastContext.Provider value={toast}>
        <BrowserRouter>
          <ToastContainer />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<h1>Error</h1>} />
          </Routes>
        </BrowserRouter>
      </ToastContext.Provider>
    </NoteState>
  );
}

export default App;
