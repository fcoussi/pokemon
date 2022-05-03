/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**FORMA DE ACEPTAR IMÁGENES QUE SE ENCUENTREN FUERA DE NUESTRO PROGRAMA */
  //LUEGO EJECUTAR npm build , para asegurqar los cambios
  images: {
    domains: ['raw.githubusercontent.com']
  }
}

module.exports = nextConfig
