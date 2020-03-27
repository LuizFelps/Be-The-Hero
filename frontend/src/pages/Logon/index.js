// Isso aqui é vai ser tudo um componente da pagina
// Variaveis sempre com {} chaves
import React, {useState} from 'react';
import {FiLogIn} from 'react-icons/fi'; /*Icone de "Não tem cadastro" */
import {Link, useHistory} from 'react-router-dom'; //substitui o "a"

import './styles.css'

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import api from '../../services/api';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', {id})//isso aqui tudo pega o nome da ong e deixa salvo
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile')

        }catch (err){
            alert('Falha no login, tente novamente.')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link"  to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tem cadastro?</Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    );

}