import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import "./styles.css"

export default function Home(){
    return(
        <div className="home">
            <Title />
            <Movies />
        </div>
    )
}

function Title(){
    return(
        <div className="title">
            Selecione o Filme
        </div>
    )
}

function Movies(){
    const [image, setImage] = useState()

    useEffect(()=>{
        const promise = axios.get("https://mock-api.driven.com.br/api/v7/cineflex/movies")
        promise.then(response => {
            setImage(response.data)
        })
        promise.catch(console.log("deu erro"))
    },[])

    return(
        <div className="movies">
            { image ? (
                image.map(filme => <Movie posterURL = {filme.posterURL} key = {filme.posterURL} id = {filme.id} />)
                ) :
                <div>carregando imagens</div>
            }
        </div>
    )
}

function Movie({posterURL, id}){
    const link = `/sessoes/${id}`
    return(
        <div className="movie">
            <Link to = {link}>
                <img src={posterURL} alt="posterURL" />
            </Link>
        </div>
    )
}