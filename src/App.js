import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import SignUp from "./pages/SignUp";
import React, { useState } from 'react'
import Planos from "./pages/Planos";
import Home from "./pages/Home";
import PaginaPlano from "./pages/PaginaPlano";

export default function App() {
    const [tokenLogin, setTokenLogin] = useState('');
    const [respostaLogin, setRespostaLogin] = useState('');
    const [plano, setPlano] = useState(false);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login setTokenLogin={setTokenLogin} setRespostaLogin={setRespostaLogin}/>} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/subscriptions' element={<Planos tokenLogin={tokenLogin} />} />
                <Route path='/subscriptions/:idPlano' element={<PaginaPlano tokenLogin={tokenLogin} setPlano={setPlano} plano={plano}/>} />
                <Route path="/home" element={<Home respostaLogin={respostaLogin} tokenLogin={tokenLogin} setPlano={setPlano} plano={plano} />} />
            </Routes>
        </BrowserRouter>
    );
}
