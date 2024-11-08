import type {Config} from "tailwindcss"
import {nextui} from "@nextui-org/react";

const config = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"

    ],
    prefix: "",

    theme: {
        // colors: {
        //     "D1": "#d1d1d1",
        //     "29": "#292929",
        //     "EE": "#EEEEEE",
        //     "76": "#767676",
        //     "55": "#555555",
        //     "CE": "#CECECE"
        // },
        //     // "D1":"#d1d1d1",
        //     // "D1":"#d1d1d1",
        //     // "D1":"#d1d1d1",
        // },
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors:{
                "D1": "#d1d1d1",
                "29": "#292929",
                "EE": "#EEEEEE",
                "E1": "#E1E1E1",
                "76": "#767676",
                "55": "#555555",
                "12": "#121212",
                "18": "#181818",
                "1E": "#1E1E1E",
                "F5": "#F5F5F5",
                "CE": "#CECECE",
                "2A": "#2A2A2A",
                "E0": "#E0E0E0"
            },
            keyframes: {
                "accordion-down": {
                    from: {height: "0"},
                    to: {height: "var(--radix-accordion-content-height)"},
                },
                "accordion-up": {
                    from: {height: "var(--radix-accordion-content-height)"},
                    to: {height: "0"},
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate"),
        nextui()
    ],
} satisfies Config

export default config