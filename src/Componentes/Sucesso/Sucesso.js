import { Link } from "react-router-dom"

import "./styles.css"

export default function Sucesso ({objeto}) {
    console.log(objeto)

    
    return(
        <div className="sucesso">
            <Status />
            <DadosFilme objeto={objeto}/>
            <Ticktes objeto={objeto}/>
            <Comprador objeto={objeto}/>
            <Button />
        </div>
    )
}

function Status(){
    return(
        <div className="status">
            Pedido feito <br /> com sucesso!
        </div>
    )
}

function DadosFilme({objeto}){
    return(
        <div className="dados-filme">
            <div className="title">
                FIlme e sessão
            </div>
            <div className="infos">
                {objeto.title.title} <br />
                {objeto.data} {objeto.hour}
            </div>
        </div>

    )
}

function Ticktes({objeto}){
    const novoObjeto = [objeto.ingressoTeste]
    console.log(novoObjeto[0].name)
    return(
        <div className="ingressos">
            <div className="title">
                Ingressos
            </div>
            {novoObjeto.map((ingresso) => <Assentos ingressos={ingresso}  /> )}
        </div>
    )
}

function Assentos({ingressos}){
    console.log(ingressos)
    return(
        <div className="infos">
            {ingressos.map((name) => {return <p>Assento {name.name}</p>})}
        </div>
    )
}

function Comprador({objeto}){
    return(
        <div className="comprador">
            <div className="title">
                Comprador
            </div>
            <div className="infos">
                <p>{objeto.name}</p>
                <p>{objeto.cpf}</p>
            </div>
        </div>
    )
}

function Button(){
    const link = "/"
    return(
        <Link to = {link}>
            <div className="button">Voltar pra Home</div>
        </Link>
    )
}