var options = {
	textPixelMode: true,
	hotkeys:{
		enabled: true
	},
	icon: {
		circular: [true],
		img: ['accessibility'],
	}
}

window.addEventListener('load', function () { new Accessibility(options); }, false);