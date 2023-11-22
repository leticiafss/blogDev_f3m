import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import { userAuthentication } from '../hooks/userAuthentication'


const Navbar = ({user}) => {
  const { userLogout } = userAuthentication()
  const handlerLogout = () => {
    console.log('antes')
    userLogout()
    console.log('depois')
  }
  console.log(user)
  return (
    <>
    <nav className={styles.navbar}>
      <NavLink to='/'className={styles.brand}>
        Blog <span>Dev</span>{user && <span> - {user.displayName}</span>}
      </NavLink>
        <ul className={styles.links_list}>
          <li>
            <NavLink to='/' className={({isActive}) => (isActive ? styles.active : null)}>Home</NavLink>
          </li>
          <li>
            <NavLink to='/login' className={({isActive}) => (isActive ? styles.active : null)}>Login</NavLink>
          </li>
          <li>
            <NavLink to='/register' className={({isActive}) => (isActive ? styles.active : null)}>Cadastro</NavLink>
          </li>
          <li>
            <NavLink to='/about' className={({isActive}) => (isActive ? styles.active : null)}>Sobre</NavLink>
          </li>
          {user && <li>
            <button className='btn_loguot' onClick={handlerLogout}>Logout</button>
          </li> }
        </ul>
    </nav>
    </>
  )
}

export default Navbar