import type { Config } from "tailwindcss";
import {CUSTOM_WHITE, FOURTH_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR} from "./src/features/ui/theme";
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
	  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
	  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
	    colors: {
		    primary: PRIMARY_COLOR,
		    secondary: SECONDARY_COLOR,
		    tertiary: TERTIARY_COLOR,
		    fourth: FOURTH_COLOR,
		    custom_white: CUSTOM_WHITE,
	    },
	    backgroundImage: {
		    "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
		    "gradient-conic":
			    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
	    },
	    // screens: {
		//     'sm': '640px',
		//     // => @media (min-width: 640px) { ... }
	    //
		//     'md': '768px',
		//     // => @media (min-width: 768px) { ... }
	    //
		//     'lg': '1024px',
		//     // => @media (min-width: 1024px) { ... }
	    //
		//     'xl': '1280px',
		//     // => @media (min-width: 1280px) { ... }
	    //
		//     '2xl': '1536px',
		//     // => @media (min-width: 1536px) { ... }
	    // }
	    // screens: {
		//     'xs': '33rem',
		//     // => @media (min-width: 475px) { ... }
	    //
		//     'sm': '45rem',
		//     // => @media (min-width: 640px) { ... }
	    //
		//     'md': '102.6vh',
		//     // => @media (min-width: 768px) { ... }
	    //
		//     'lg': '138.7vh',
		//     // => @media (min-width: 1024px) { ... }
	    //
		//     'xl': '91rem',
		//     // => @media (min-width: 1280px) { ... }
	    //
		//     '2xl': '109',
		//     // => @media (min-width: 1536px) { ... }
	    //
		//     '3xl': '128',
		//     // => @media (min-width: 1792px) { ... }
	    // }
    },
  },
	darkMode: "class",
	plugins: [
	  nextui(),
	  // require('@tailwindcss/forms'),
  ],
};
export default config;
