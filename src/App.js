import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./Componentes/Home/Home";
import Header from "./Componentes/Header/Header";
import EscolherSessao from "./Componentes/EscolherSessao/EscolherSessao";
import EscolherAssento from "./Componentes/EscolherAssento/EscolherAssento";
import Sucesso from "./Componentes/Sucesso/Sucesso";

import "./CSS/reset.css"
import "./CSS/styles.css"

export default function App(){
    let objeto = {
        title: "",
        data: "",
        hour: "",
        ingressos: [],
        name: "",
        cpf: ""
    }
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/sessoes/:id" element={<EscolherSessao />}/>
                <Route path="/assentos/:idSessao" element={<EscolherAssento objeto={objeto} />}/>
                <Route path="/sucesso" element={<Sucesso objeto={objeto}/>} />
            </Routes>

        </BrowserRouter>
    )
}