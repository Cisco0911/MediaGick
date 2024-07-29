import { useState, useEffect } from 'react';

/**
 * A custom hook to adjust the font size based on the zoom level of the browser.
 *
 * This hook calculates the appropriate font size based on the device pixel ratio and
 * a base font size. It also adjusts the font size dynamically on window resize and
 * when the DOM is fully loaded.
 *
 * @param baseFontSize The base font size to use (default is 20).
 * @returns The calculated font size value.
 */
function useZoomFontSize(baseFontSize = 20) {
	const [fontSize, setFontSize] = useState(baseFontSize);

	useEffect(() => {
		// Function to adjust the font size based on zoom level
		function adjustFontSize() {
			const zoomLevel = window.devicePixelRatio;
			const newFontSize = baseFontSize / zoomLevel;
			setFontSize(newFontSize);
		}

		// Adjust the font size initially
		adjustFontSize();

		// Add event listeners for window resize and DOMContentLoaded
		window.addEventListener('resize', adjustFontSize);
		window.addEventListener('DOMContentLoaded', adjustFontSize);

		// Cleanup event listeners on unmount
		return () => {
			window.removeEventListener('resize', adjustFontSize);
			window.removeEventListener('DOMContentLoaded', adjustFontSize);
		};
	}, [baseFontSize]); // Only re-run effect if baseFontSize changes

	return fontSize;
}

export default useZoomFontSize;