import CardPlano from '../components/CardPlano';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';


export default function Planos({ tokenLogin }) {
    const [planos, setPlanos] = useState([]);
    useEffect(() => {
        const obterPlanos = axios.get('https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships', { headers: { Authorization: `Bearer ${tokenLogin}` } });
        obterPlanos.then((res) => {
            // console.log(res);
            setPlanos(res.data);
        });

    }, []);
    return (
        <ContainerPlanos>
            <p>Escolha seu Plano</p>
            {planos.map((plano) => <CardPlano key={plano.id} id={plano.id} imagem={plano.image} preco={plano.price} /> )}
        </ContainerPlanos>
    );
}

const ContainerPlanos = styled.div`
    display: flex;
    flex-direction: column;
    background-color: black;
    justify-content: center;
    align-items: center;
    height: 100vh;

    p{
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;
        color: white;
        font-family: Roboto;
        margin-top:25px;
        margin-bottom:25px;
    }
`