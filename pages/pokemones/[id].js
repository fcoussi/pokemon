//PARA PODER OBTENER LOS DATOS USANDO SERVER DIDE RENDERING (SSR)
//DEBEMOS UTILIZAR UNA FUNCION  LLAMADA (getServerSideProps)

import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'

const Pokemon = ({ data }) => {
    const router = useRouter()
    console.log(router)

    if (router.isFallback) {
        return <p>Cargando...</p>
    }

    return (
        <div>
            <h1>{data.name} número #{data.id}</h1>
            <Image src={data.sprites.front_default} width={400} height={400} />
            <Link href="/">Volver al inicio</Link>
        </div>
    )
}

export default Pokemon

//LA FUNCION SE VA A EJECUTAR CADA VEZ QUE REALIZEMOS 
//UNA PETICIÓN DESDE NUESTRA URL
// export const getServerSideProps = async ({ params }) => {
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
//     const data = await response.json()

//     return { props: { data } }
// }

export const getStaticProps = async ({ params }) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
    const data = await response.json()

    return { props: { data } }
}

export const getStaticPaths = async () => {
    const paths = [
        {params: {id: '1'}},
        {params: {id: '2'}},
    ]
    return {
        paths: paths,
        /**NOS RENDERIZARA EL COMPONENTE POKEMON */
        fallback: true,
        //fallback: false,
        //fallback: 'blocking',
    } 
}
