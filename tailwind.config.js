import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        './resources/js/**/**/*.jsx',
        "./node_modules/flowbite/**/*.js",
        flowbite.content(),
    ],

    theme: {
        extend: {},
    },

    plugins: [forms, require('flowbite/plugin'),flowbite.plugin()],
};