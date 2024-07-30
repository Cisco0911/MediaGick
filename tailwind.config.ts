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
    },
  },
	darkMode: "class",
	plugins: [
	  nextui(),
	  // require('@tailwindcss/forms'),
  ],
};
export default config;
