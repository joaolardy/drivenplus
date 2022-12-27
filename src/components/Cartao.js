import styled from "styled-components"
import React, { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cartao({membershipId, tokenLogin, setPlano, plano}){
    const navigate = useNavigate();
    const [dadosCartao, setDadosCartao] = useState({
            membershipId: membershipId,
            cardName: "",
            cardNumber: "",
            securityNumber: '',
            expirationDate: ""
    })

    function setarInputCartao(e){
        console.log(e.target.value);
        setDadosCartao({
            ...dadosCartao,
            [e.target.name]: e.target.value
        })
    }

    function handleForm(e){
        e.preventDefault();
        const assinarPlano = axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions', dadosCartao, { headers: { Authorization: `Bearer ${tokenLogin}` } });
        assinarPlano.then( (res) => {
            console.log(res);
            setPlano(!plano);
            navigate('/home');
        } );
        assinarPlano.catch( (err) => alert('Ocorreu um erro na compra do seu plano, tente novamente'));
    }
    return(
        <ContainerCartao>
            <form onSubmit={handleForm}>
                <input type='text' name='cardName' onChange={setarInputCartao} value={dadosCartao.cardName} placeholder="Nome impresso no cartão" />
                <input type='number' name='cardNumber' onChange={setarInputCartao} value={dadosCartao.cardNumber} placeholder="Digitos do cartão" />
                <InputDividido>
                    <input type='number' name='securityNumber' onChange={setarInputCartao} value={dadosCartao.securityNumber} placeholder="Código de segurança" />
                    <input type='text' name='expirationDate' onChange={setarInputCartao} value={dadosCartao.expirationDate} placeholder="Validade MM/AA" />
                </InputDividido>
                <button type="submit">ASSINAR</button>
            </form>
        </ContainerCartao>
    );
}

const ContainerCartao = styled.div`
    margin-top: 35px;
    width: 300px;
    display: flex;
    flex-direction: column;

    input{
        width:299px;
        height: 52px;
        padding-left: 8px;
        margin-bottom: 8px;
        border-radius: 8px;
        border: none;
    }
    button{
        width: 299px;
        height: 52px;
        background-color: #FF4791;
        color: white;
        border-radius: 8px;
        border: none;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
    }
`
const InputDividido = styled.div`
    width:299px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    input{
        width: 145px;
        height: 52px;
        border-radius: 8px;
    }
`