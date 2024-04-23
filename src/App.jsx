/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import {useDispatch} from  "react-redux"
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import { Header, Footer} from './components'
import {Outlet} from 'react-router-dom'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(() => {setLoading(false)})
  }, [])

  // return (
  //   <>
  //     <h1>Sankshep - Write Your Own </h1>
  //   </>
  // )

  return !loading ? (
  <div className='min-h-screen flex-wrap flex content-between bg-slate-400'>
    <div className='w-full block'>
      <Header/>
        <main>
          TODO : <Outlet/>
        </main>
      <Footer/>
    </div>
  </div>) : null

}

export default App
