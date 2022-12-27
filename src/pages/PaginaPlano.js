import { useParams } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import axios from "axios";
import iconeBeneficios from '../assets/images/icon_beneficios.png';
import iconePreco from '../assets/images/icone_preco.png';
import Cartao from "../components/Cartao";

export default function PaginaPlano({ tokenLogin,setPlano, plano}) {
    const dominio = useParams();
    const [dadosPlano, setDadosPlano] = useState(null)
    useEffect(() => {
        const obterPlano = axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${dominio.idPlano}`, { headers: { Authorization: `Bearer ${tokenLogin}` } });
        obterPlano.then((res) => {
            console.log(res.data);
            setDadosPlano(res.data);
        })
    }, [plano]);

    if (dadosPlano === null) {
        return (
            <ContainerPaginaPlano>
                loading...
            </ContainerPaginaPlano>
        )
    }
    if (dadosPlano) {
        return (
            <ContainerPaginaPlano>
                <ContainerLogo>
                    <ImagemPlano src={dadosPlano.image} alt={dadosPlano.image} />
                    <h1>{dadosPlano.name}</h1>
                </ContainerLogo>
                <ContainerDados>
                    <div>
                        <IconePlano src={iconeBeneficios} alt="beneficios"/>
                        <h2>Benefícios:</h2>
                    </div>
                    {dadosPlano.perks.map((perk, i) => <p key={perk.id}>{i+1} . {perk.title}</p>)}
                    <span>.</span>
                    <div>
                        <IconePlano src={iconePreco} alt='precos' />
                        <h2>Preço</h2>
                    </div>
                    <p>R${dadosPlano.price} cobrados mensalmente</p>
                </ContainerDados>
                <Cartao membershipId={dadosPlano.perks[0].membershipId} tokenLogin={tokenLogin} setPlano={setPlano} plano={plano}/>
            </ContainerPaginaPlano>
        );
    }
}

const ContainerPaginaPlano = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: black;
    width: 100%;
    height: 100vh; 

    h1{
        font-family : 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;
        color: white;
        margin-bottom: 20px;
    }

    h2{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: white;
    }

    span{
        height:12px;
    }

    p{
        color: white;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
    }

    div{
        display: flex;  
    }
`

const IconePlano = styled.img`
    width: 20px;
    height: 20px
`

const ImagemPlano = styled.img`
    width: 139px;
    height: 95px;
`
const ContainerLogo = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const ContainerDados = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 299px;

    div{
        display: flex;
    }
`