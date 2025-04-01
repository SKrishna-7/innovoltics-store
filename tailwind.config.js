/** @type {import('tailwindcss').Config} */



module.exports = {
  content:[
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}", // Add this if using App Router
    "./*.{js,jsx,ts,tsx}", // Include root-level files if needed
  ],
  safelist: [
    "bg-gradient-to-br",
    "from-blue-900",
    "via-purple-800",
    "to-black",
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
