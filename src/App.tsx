import { Navigate, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Votes from "./components/pages/Votes";
import Statistics from "./components/pages/Statistics";
import { useEffect } from "react";
import { socket } from "./main";
import { useAppDispatch } from "./redux/store";
import { fetchCandidates } from "./redux/Slices/candidatesSlice";

export default function App() {
  const dispatch = useAppDispatch()

  return (
    <div className="app">
      <Nav />
      <Routes>
      <Route path="/" element={<Navigate to={'/votes'}/>}></Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="votes" element={<Votes />} />
        <Route path="statistics" element={<Statistics />} />
    
      </Routes>

    </div>
  );

}
