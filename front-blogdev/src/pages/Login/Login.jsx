import React, { useEffect } from 'react'
import { useState } from 'react'
import { userAuthentication } from '../../hooks/userAuthentication'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const {createUser, error: authError, loading} = userAuthentication()
  
  const handlerSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const user = {
      displayName,
      email,
      password
    }

    if(password != confirmedPassword){
      setError('As senhas precisam ser iguais.')
      return
    }

    const res = await createUser(user) 

    console.log(res)
  }
  
  useEffect(() => {
    if(authError){
      setError(authError)
    }
  }, [authError])
  return (
    <div>
      <h1>Entrar no BlogDev</h1>
      <form onSubmit={handlerSubmit}>
        <span>E-mail:</span>
        <label>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entre com seu e-mail"
          ></input>
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entre com sua senha"
          ></input>
        </label>
        {!loading && <button className="btn">Login</button>}
        {loading && <button className="btn">Aguarde...</button>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
