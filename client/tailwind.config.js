/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], // Tipografía Principal
        roboto:     ['Roboto', 'sans-serif'],     // Tipografía Secundaria
        lato:       ['Lato', 'sans-serif'],       // Tipografía Alternativa
      },
      colors: {
        primary:    '#2B3A67', // Azul Oscuro*
        secondary:  '#3EB489', // Verde Esmeralda
        background: '#2B3A67', // Gris Claro
        accent:     '#FFA726', // Naranja Suave (contraste)
        text:       '#333333', // Gris Oscuro
        error:      '#D32F2F', // Rojo Alerta
      },
      // backgroundImage: {
      //   'fondo': "url('/fondoLogin.jpg')"
      // },
      boxShadow: {
        custom: '0px 0px 20px 2px #00000033',
        calendar: '0px 0px 4px 0.5px #00000026',
        cardContainer: '0px 0px 8px 1px #00000026',
        modal: '0px 0px 12px 0px #00000080',
        home: '0px 0px 4px 1px #00000033',
        customTable: '0px 0px 4px 1px #00000026',
      },
      fontSize: {
        customTitle: '28px',
        custom: '22px',
        customSubTitle: '26px',
        home: '32px',
      },
      padding: {
        '8p': '8%',
      },
      lineHeight: {
        custom: '18.75px',
      },
      transitionDuration: {
        '600': '600ms',
      },
      borderWidth: {
        half: '0.5px'
      },
    },
  },
  plugins: [
    require('tailwindcss/plugin')(({ addVariant }) => {
      addVariant('search-cancel', '&::-webkit-search-cancel-button');
    }),
  ],
}

