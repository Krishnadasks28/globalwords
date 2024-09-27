/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textStrokeWidth:{
        '1':'1px',
        '2':'2px'
      },
      textStrokeColor:{
        blue:'#588DA4'
      }
    },
  },
  plugins: [
    function ({addUtilities}){
      addUtilities({
        '.text-stroke-1': {
          '-webkit-text-stroke-width': '1px',
        },
        '.text-stroke-2': {
          '-webkit-text-stroke-width': '2px',
        },
        '.text-stroke-blue':{
          '-webkit-text-stroke-color':'#588DA4'
        }
      })
    }
  ],
}