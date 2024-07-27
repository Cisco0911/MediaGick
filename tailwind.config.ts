import type { Config } from "tailwindcss";
import {CUSTOM_WHITE, PRIMARY_COLOR, SECONDARY_COLOR} from "./src/features/ui/theme";

const config: Config = {
  content: [
	  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
	    colors: {
		    primary: PRIMARY_COLOR,
		    secondary: SECONDARY_COLOR,
		    custom_white: CUSTOM_WHITE,
	    },
	    backgroundImage: {
		    "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
		    "gradient-conic":
			    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
	    },
    },
  },
  plugins: [
	  // require('@tailwindcss/forms'),
  ],
};
export default config;
