module.exports = {
    content: [
      "./src/**/*.{html,js}",
      "node_modules/flowbite-react/lib/esm/**/*.js"
    ],
    darkMode : 'class',
    theme: {
      extend: {},
    },
    plugins: [
      require('flowbite/plugin')
    ],
}
