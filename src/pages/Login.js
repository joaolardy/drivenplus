// eslint-disable-next-line
import React, { useState } from 'react'
import styled from 'styled-components'
import logo from '../assets/images/logo.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export default function Login({setTokenLogin, setRespostaLogin}) {
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        email: '',
        password: ''
    });
    function setarInputLogin(e){
        console.log(e.target.value);
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    function handleForm(e) {
        e.preventDefault();
        const requisicaoLogin = axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/auth/login', login);
        requisicaoLogin.then( (res) => {
            setTokenLogin(res.data.token);
            console.log(res.data);
            if(res.data.membership === null){
                // setRespostaLogin(res.data);
                navigate("/subscriptions");
            }
            if(res.data.membership !== null){
                setRespostaLogin(res.data);
                navigate('/home');
            }

        });
        requisicaoLogin.catch( (err) => {
            console.log(err);
            if(err.response.status === 401){
                alert('Usuário e/ou senha incorretos, tente novamente')
            }
        });

    }

    return (
        <ContainerLogin>
            <img src={logo} alt='logo' />
            <form onSubmit={handleForm}>
                <input type="text" name='email' onChange={setarInputLogin} value={login.email} placeholder='E-mail' />
                <input type='password' name='password' onChange={setarInputLogin} value={login.password} placeholder='Senha' />
                <button type='submit'>ENTRAR</button>
            </form>
            <Link to='/sign-up'>
                <p>Não possui uma conta? Cadastre-se</p>
            </Link>
        </ContainerLogin>
    )
}

const ContainerLogin = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: black;
    width: 100%;
    height: 100vh; 

    img{
        width: 299px;
        height: 49px;
        margin-top: 134px;
        margin-bottom: 100px;
    }
    input{
        display: block;
        width: 299px;
        height: 52px;
        border-radius: 8px;
        margin-bottom: 16px;
        padding-left: 10px;
        font-size: 14px;
        line-height: 16px;
        font-weight: 400;
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
    p{
        margin-top: 24px;
        color: white;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        text-decoration-line: underline;
        font-family: Roboto;
    }
    `