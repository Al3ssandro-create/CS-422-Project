/* eslint-disable*/
const {nextui} = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{html,js,tsx,ts}",

    ],
    theme: {
        extend: {
            colors: {
                red: '#9E2D32',
            }
        },
    },
    darkMode: "class",
    plugins: [nextui()],
};