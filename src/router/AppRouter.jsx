import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";

export const AppRouter = () => {

    const {status, checkAuthToken} = useAuthStore();
    //const authStatus = 'Not-Authenticated'

    useEffect(() => {
      checkAuthToken();
    }, [])
    

    if(status === 'Checking'){
      return (
        <h3>Cargando...</h3>
      )
    }
  return (
    <Routes>
        {
            (status === 'Not-Authenticated')
                ? <Route path='/auth/*' element={<LoginPage/>}/>
                : <Route path='/*' element={<CalendarPage/>}/>
        }

        <Route path="/*" element={ <Navigate to='/auth/login'/> }/>

    </Routes>
  )
}
