import Document from 'next/document'
//PERMITE CAPTURAR TODAS LAS CLASES GENERADAS POR NUESTRA LIBRERÍA STYLED-COMPONENT
import { ServerStyleSheet } from 'styled-components'


export default class MyDocument extends Document {

    //LA FUNCION RECIBE UN CONTEXTO
    static async getInitialProps(ctx) {
        //NOS PERMITE CREAR UNA HOJA DE ESTILO PERO AL LADO DEL SERVIDOR
        const sheet = new ServerStyleSheet()
        //RENDERIZAR LAS PAGINAS
        const originalRenderPage = ctx.renderPage

        try {
            //REEMPLAZAR RENDERPAGE
            ctx.renderPage = () =>
                originalRenderPage({
                    //RECIBE EL EL COMPONENTE APP Y RECIBIR LAS PROPIEDADES
                    //LA FUNCION NOS VA A PERMITIR PASAR MÁS PROPIEDADES Y ELEMENTOS
                    //AL RENDERIZADO 
                    enhanceApp: App => props =>
                        //IR A BUSCAR TODOS LOS ESTILOS DENTRO DE NUESTRA APLICACIÓN
                        //RECOLECTANDO ESTILOS ANTES DE PASAR LA PÁGINA AL USUARIO
                        sheet.collectStyles(<App {...props} />),
                })
            //OBTENER LAS PROPIEDADES INICIALES DE NUESTRO DOCUMENTO
            const initialProps = await Document.getInitialProps(ctx)

            //RETORNANADO LAS PROPIEDADES INICIALES, PERO A LA VEZ 
            //AGREGANDO ALGO MÁS
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {/**AGREGANDO LOS ESTILOS A LOS DOCUMENTOS GENERADOS
                        AL LADO DEL SERVIDOR */}
                        {sheet.getStyleElement()}
                    </>
                )
            }

        } finally {
            sheet.seal()
        }
    }
}