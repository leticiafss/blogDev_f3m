import React from 'react'
import { useState, useEffect } from 'react'
import { userAuthentication } from '../../hooks/userAuthentication'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const {userLogin, error: authError, loading} = userAuthentication()
  const handlerSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const user = {
      email,
      password
    }

    const res = await userLogin(user) 

    console.log(res)
  }
  return (
    <div className='divlogin'>
      <h1>Faça seu Login</h1>
      <form onSubmit={handlerSubmit}>
        <label className='labelLogin'>E-mail:
          <input type="email"
           name='email'
           placeholder='Insira seu e-mail'
           value={email} 
           onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <label className='labelLogin'>Senha:
          <input type="password"
          name='password'
          placeholder='Insira sua senha'
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <button className='btn'>{!loading ? 'Entrar' : 'Aguarde...'}</button>
        {error && <p className='error'>{error}</p>}
      </form>
      <p>Não é cadastrado?<a className='linkcadaster' href="./register"> Cadastre-se</a></p>
    </div>
  )
}