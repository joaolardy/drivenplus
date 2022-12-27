import styled from "styled-components"
import React from "react"
import { Link } from "react-router-dom"

export default function CardPlano({imagem, preco, id}){
    return(
        <Link to={`/subscriptions/${id}`}>
            <ContainerCard>
                <img src={imagem} alt={imagem}/>
                <p>R${preco}</p>
            </ContainerCard>
        </Link>
    )
}

const ContainerCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 290px;
    height: 180px;
    border: 3px solid #7E7E7E;
    border-radius: 12px;
    background-color: black;
    margin-bottom: 15px;

    img{
        width: 139px;
        height: 95px;
    }
    p{
        color: white;
        font-family: Roboto;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
    }
    `