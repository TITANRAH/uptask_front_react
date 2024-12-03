import { Link } from "react-router-dom"


function NotFound() {
  return (
    <div className="bg-gray-800">
    <h1 className="font-black text-center text-4xl text-white">
        Página no encotrada
    </h1>
    <p className="mt-10 text-center text-white">
    Tal vez quieras volver a {''}
        <Link className="text-fuchsia-500" to={'/'}>
            Proyectos
        </Link>
    </p>
    </div>
  )
}

export default NotFound