import NewPasswordForm from '@/components/auth/NewPasswordForm'
import NewPasswordToken from '@/components/auth/NewPasswordToken'
import TitleForm from '@/components/TitleForm'
import { ConfirmToken } from '@/types/index'
import React, { useState } from 'react'

// TODO: FORGOT PASSWORD 2

// CREO EL COMPONENTE QUE COMPRUEBA QUE EL TOKEN ES VALIDO INGRESANDO EL TOKEN ENVIADO AL CORREO 

function NewPassword() {

  // 1 creamos los seteos de token y set token is valid token y setisvalidtoken 
  // usamos para isvalidtoken para mostra uno u otro aunque comienza en false para mostrar el input de del token
  // pasamos las funciones al componente de inputs del token , token settoken y setisvalidtoken 
  // hacmos el post del nueovo token y si es valido mostramos el formulario de nueva contraseña
  // mediante el seto de setisvalidtoken a true 

  const [token, setToken] = useState<ConfirmToken['token']>('')
  const [isValidToken, setIsValidToken] = useState(false)
  return (
   <>
   <TitleForm 
        titleH1="Crear Cuenta"
        titleP="Llena el formulario para"
        titleSpan="crear tu cuenta"
      />

      {!isValidToken ? (<NewPasswordToken token={token} setToken={setToken}  setIsValidToken={setIsValidToken}/>) : (<NewPasswordForm token={token}/>)}

   </>
  )
}

export default NewPassword