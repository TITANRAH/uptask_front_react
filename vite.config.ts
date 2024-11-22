import { defineConfig } from 'vite'

// TODO: @ PARA LAS RUTAS 

// INSTALAR npm i -D @types/node

// LLAMARLO ACA EN VITE CONFIG fileURLToPath, URL
import {fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  //PARA USR ARROBA ESCRIBIR TODO ESTO Y LUEGO IR A TSCONFIG
  resolve: {
    alias:{
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
