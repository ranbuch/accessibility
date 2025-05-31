import { Accessibility } from '../src/main';

window.addEventListener('DOMContentLoaded', () => {
	const output = document.getElementById('output');
	if (output) {
		output.textContent = 'Accessibility package loaded!';
	}

	// Example usage:
	const acc = new Accessibility();

	console.log('Accessibility instance created:', acc);
});
