import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

import "./styles.css"

export default function EscolherAssento({objeto}){

    return(
        <div className="escolherAssento">
            <Title />
            <Seats objeto={objeto}/>
            <Description />
            <PersonalData objeto={objeto} />
            <Button />
            <Footer objeto={objeto}/>
        </div>
    )
}

function Title(){
    return(
        <div className="title">
            Selecione o(s) assento(s)
        </div>
    )
}

function Seats({objeto}){
    const {idSessao} = useParams()
    const [name, setName] = useState()    

    useEffect(()=> {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${idSessao}/seats`)
        promise.then( response => {
            console.log(response.data)
            setName(response.data.seats)
        }) 
        promise.catch(console.log("deu erro"))
    },[])
    
    return(
        <div className="assentos">
            {name ? (
                name.map(assentos => <Seat id = {assentos.id} name = {assentos.name} isAvailable = {assentos.isAvailable} key = {assentos.id} objeto={objeto}/>)
            ) :
                <div>Carregando Assentos</div>
            }
        </div>
    )
}

function Seat({name, isAvailable, objeto}){
    const [selecionado, setSelecionado] = useState(false)
    
    let css 
    
    function trocaCSS(){
        setSelecionado(! selecionado);
        
        if(selecionado) {
            let arr = []
            for (let i = 0; i < objeto.ingressos.length; i++) {
                if (objeto.ingressos[i] !== name) {
                    arr.push(objeto.ingressos[i])
                } else {
                    continue
                }
            }
            objeto.ingressos = arr;
            console.log(objeto)
        }
    }

    if(selecionado){
        css = "selecionado"
        objeto.ingressos.push(name)
    } else{
        css = "disponivel"
    } 

    return(
        isAvailable ?     
        <div className= {css} onClick={()=> trocaCSS()}>
            {name}
        </div> : 
        <div className="indisponivel">
            {name}
        </div>
    )
}

function Description() {
    return(
        <div className="status">
            <div>
            <div className="selecionado"></div>
            Selecionado
            </div>
            <div>
            <div className="disponivel"></div>
            Disponível
            </div>
            <div>
            <div className="indisponivel"></div>
            Indisponível
            </div>
        </div>
    )
}

function PersonalData({objeto}) {
    const [nome, setNome] = useState("")
    const [cpf, setCPF] = useState("")
    
    objeto.name = nome
    objeto.cpf = cpf
    console.log(objeto)


    return (
        <div>
            Nome do Comprador
            <input type="string" placeholder={"Digite seu nome..."} onBlur={(e) => setNome(e.target.value)} />
            CPF do Comprador
            <input type="string" placeholder={"Digite seu CPF..."} onBlur={(e) => setCPF(e.target.value)} />
        </div>
    )
}

function Button(){
    return(
        <Link to = "/sucesso">
            <div className="botao">
                <button>Reservar assento(s)</button>
            </div>
        </Link>
    )
}

function Footer({objeto}){
    const {idSessao} = useParams()
    const [poster, setPoster] = useState()
    const [day, setDay] = useState()
    const [hour, setHour] = useState()
    const [data, setData] = useState()

    objeto.data = data
    objeto.hour = hour
    objeto.title = poster
    
    
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${idSessao}/seats`)
        promise.then(response => {
            setPoster(response.data.movie)
            setDay(response.data.day.weekday)
            setHour(response.data.name)
            setData(response.data.day.date)
        })
        promise.catch(console.log("deu erro"))
    },[])

    return(
        poster ?
        <div className="footer">
            <img src={poster.posterURL} alt="posterURL" />
            <div className="filme">
                {poster.filme}
            </div>
                {day} - {hour}
            <div>
                
            </div>
        </div> : <>"deu ruim"</>
    )
}