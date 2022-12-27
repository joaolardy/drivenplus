import React, { useState } from 'react';
import styled from 'styled-components';
import user_icon from '../assets/images/user.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

export default function Home({ respostaLogin, tokenLogin, setPlano, plano }) {
    const navigate = useNavigate();
    console.log(respostaLogin);

    useEffect(() => {
        const obterPlano = axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${respostaLogin.membership ? respostaLogin.membership.id : null}`, { headers: { Authorization: `Bearer ${tokenLogin}` } });
        obterPlano.then((res) => {
            console.log(res.data);
        })
    }, [plano])
    

    function cancelarPlano() {
        const cancelamento = axios.delete('https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions', { headers: { Authorization: `Bearer ${tokenLogin}` } });
        cancelamento.then((res) => {
            alert('seu plano foi cancelado com sucesso');
            navigate('/');
        });
        cancelamento.catch((err) => console.log(err))
    }

    if (respostaLogin.membership) {
        return (
            <ContainerHome>
                <BarraSuperior>
                    <img src={respostaLogin.membership.image} alt='plano' />
                    <img src={user_icon} alt='foto user' />
                </BarraSuperior>
                <h1>Olá, {respostaLogin.name}</h1>
                <ContainerBotoes>
                    {respostaLogin.membership.perks.map(
                        (perk) => <a href={perk.link}><Botao>{perk.title}</Botao></a>
                    )}
                </ContainerBotoes>
                <span></span>
                <ContainerBotoes>
                    <Link to='/subscriptions'>
                        <Botao onClick={() => alert('Sua mudança ficará disponível após refazer seu login')}>Mudar Plano</Botao>
                    </Link>
                    <BotaoCancelar onClick={cancelarPlano}>Cancelar Plano</BotaoCancelar>
                </ContainerBotoes>
            </ContainerHome>
        );
    }
    else {
        return (
            <ContainerHome>
                <h1>Necessário reenvio de formulário</h1>
                <Link to='/'>
                    <h3>Clique aqui para fazer login novamente</h3>
                </Link>
            </ContainerHome>
        )
    }
}

const ContainerHome = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: black;
    width: 100%;
    height: 100vh;
    
    h1{
        font-family: 'Roboto';
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        color: white;
        margin-bottom: 50px;
    }
    span {
        padding-bottom: 200px;
    }
    h3{
        font-family : 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;
        color: white;
        margin-bottom: 20px;
        text-decoration: underline;
    }
`
const BarraSuperior = styled.div`
    margin-top: 22px;
    margin-bottom: 12px;
    display: flex;
    width: 85%;
    justify-content: space-between;

    & img:first-child{
        height: 50px;
    }
    & img:nth-child(2){
        height: 34px;
    }
`

const ContainerBotoes = styled.div`
    width: 299px;
    display: flex;
    flex-direction: column;
`
const Botao = styled.button`
        width: 299px;
        height: 52px;
        background-color: #FF4791;
        color: white;
        border-radius: 8px;
        border: none;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        margin-bottom: 8px;
`
const BotaoCancelar = styled.button`
        width: 299px;
        height: 52px;
        background-color: #FF4747;
        color: white;
        border-radius: 8px;
        border: none;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        margin-bottom: 8px;
`