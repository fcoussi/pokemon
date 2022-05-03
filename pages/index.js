
import Link from 'next/link'

//CREANDO COMPONENTE POKEMON
const Pokemon = ({ pokemon }) => {
  //OBTENEINDO ID DEL POKEMON
  const id = pokemon.url.split('/').filter(x => x).pop()
  return (
    <li><Link href={`/pokemones/${id}`}>{pokemon.name}</Link></li>
  )
}

export default function Pokemones({ pokemones }) {
  console.log(pokemones)
  return (
    //RETORNANDO LISTA DE POKEMONES 
    <div>
      <p>Pokemones</p>
      <ul>
        {pokemones.map(pokemon => <Pokemon pokemon={pokemon} key={pokemon.name} />)}
      </ul>
    </div>
  )
}

//LA FUNCION GET STATIC PROPS NOS PERMITE INDICARLE A NEXT QUE ESTA PAGINA SE VA A EJECUTAR DE
//FORMA ESTATICA CUANDO EJECUTEMOS EL COMANDO DE npm build, ESTO DE MANERA INMEDIATA VA A GENERAR UNA
//PAGINA HTML.
//UN ARCHIVO QUE SE VA A LLAMR INDEX HTML, POR LO CUAL ESTE ARCHIVO VA A SER EL QUE
//EL QUE SE SIRVE AL USUARIO FINAL EN LUGAR DE ESTE INDEX.js

/**
 * AL ESCRIBIR NPM RUN BUILD, ESTE HACE USO DE UN SSG (STATIC SITE GENERATION)
 * LO QUE ESTA HACIENDO NEXT ES TOMAR ESTE ARCHIVO DE INDEX Y GENERAR ARCHIVOS
 * DE HTML QUE CORRESPONDEN, EN ESTE CASO A NUESTROS ARCHIVOS JS 
 */
export const getStaticProps = async () => {
  //NOS VA A DEVOLVER 151 POKEMONES
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  const data = await response.json()

  return {
    //DEBEMOS PASAR LA PROPIEDAD PROPS, DE LO CONTRARIO NO OBTENDREMOS TODOS
    //LOS POKEMONES.
    props: { pokemones: data.results }
  }
}