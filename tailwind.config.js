module.exports = {
    content: [
      "./src/**/*.{html,js}",
      "node_modules/flowbite-react/lib/esm/**/*.js"
    ],
    darkMode : 'class',
    theme: {
      extend: {
        transitionDuration: {
          '1500':'1500ms',
          '2000':'2000ms',
          '3000':'3000ms',
          '4000':'4000ms',
          '5000':'5000ms',
          '6000':'6000ms',
          '7000':'7000ms',
          '8000':'8000ms',
        }
      },
    },
    plugins: [
      require('flowbite/plugin'),
      require('tailwindcss-animate'),
    ],
}
