/** @type {import('tailwindcss').Config} */



module.exports = {
  content:[
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"], 
        kanit:['Kanit','sans-serif'],
        poppins:[ "Poppins", 'sans-serif'],

      },
    },
  },
};
