import styled from "styled-components"
import React, { useState } from "react"   
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export default function SignUp(){
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        name: '',
        cpf: '',
        password: ''
    })

    function setarInput(e){
        console.log(e.target.value);
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    function handleForm(e){
        e.preventDefault();
        let requisicao = axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up', form);
        requisicao.then((res) => {
            console.log(res);
            alert('Usuário cadastrado com sucesso, entre com seu login e senha:');
            navigate('/');
        });
        requisicao.catch((err) => {
            if(err.response.status === 409){
                console.log(err);
                alert('Este email já está cadastrado, entre com seu login e senha')
            }else{
                alert('Ocorreu um erro, tente novamente');
            }

        });
    }

    return(
        <ContainerSignUp>
            <form onSubmit={handleForm}>
                <input type='text' onChange={setarInput} value={form.name} name='name' placeholder="Nome"/>
                <input type='number' onChange={setarInput} value={form.cpf} name="cpf" placeholder="CPF"/>
                <input type='email' onChange={setarInput} value={form.email} name='email' placeholder="E-mail"/>
                <input type='password' onChange={setarInput} value={form.password} name='password' placeholder="Senha"/>
                <button type='submit'>CADASTRAR</button>
            </form>
            <Link to='/'>
                <p>Já possuí uma conta? Entre</p>
            </Link>
        </ContainerSignUp>
    )
}

const ContainerSignUp = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: black;
    width: 100%;
    height: 100vh; 
    form{
        margin-top: 150px;
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