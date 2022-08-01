import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

import "./styles.css"

export default function EscolherSessao(){
    return(
        <div className="escolherSessao">
            <Title />
            <Sections />
            <Footer />
        </div>
    )
}

function Title(){
    return(
        <div className="title">
            Selecione o horário
        </div>
    )
}

function Sections(){
    const [sections, setSections] = useState()
    const {id} = useParams()

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v7/cineflex/movies/${id}/showtimes`)
        promise.then(response => {
            setSections(response.data.days)
        })
        promise.catch(console.log("error"))
    },[])

    return(
        <div className="sessoes">
            {sections ?
                (sections.map(day => <Section weekday = {day.weekday} date = {day.date} showtimes = {day.showtimes} key = {day.id} />))
                : "carregando Sessão"
            }
        </div>
    )
}

function Section({weekday, date, showtimes}){
    return(
        <div>
            <div className="data">
                {weekday} - {date}
            </div>
            <div className="horarios">
                {showtimes.map(hours => <Hours name = {hours.name} id = {hours.id} key = {hours.id} />)}
            </div>
        </div>
    )
}

function Hours({name, id}){
    const link = `/assentos/${id}`
    return(
        <div className="horario">
            <Link to = {link}>
                {name}
            </Link>
        </div>
    )
}

function Footer(){
    const {id} = useParams()
    const [poster, setPoster] = useState()

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v7/cineflex/movies/${id}/showtimes`)
        promise.then(response => {
            setPoster(response.data)
            console.log(poster)
        })
        promise.catch(console.log("deu erro"))
    },[])

    return(
        poster ?
        <div className="footer">
            <img src= {poster.posterURL} alt="posterURL" />
            <div className="filme">{poster.title}</div>
        </div> : <></>
    )
}