var options = {
	textPixelMode: false,
	hotkeys:{
		enabled: true
	},
	icon: {
		circular: false,
		img: 'accessible',
	}
}

window.addEventListener('load', function () { new Accessibility(options); }, false);