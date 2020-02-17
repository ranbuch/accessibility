var options = {
	textPixelMode: true,
	hotkeys:{
		enabled: true
	},
	icon: {
		circular: true,
		img: 'accessible'
	}
}

window.addEventListener('load', function () { new Accessibility(options); }, false);