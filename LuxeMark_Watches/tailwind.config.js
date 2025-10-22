/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				luxe: {
					gold: '#ffd700',
					dark: '#1a1a1a',
					navy: '#2c3e50',
				},
			},
		},
	},
	plugins: [],
};



