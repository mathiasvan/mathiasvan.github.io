let letterClassifier;
let canvas;
let resultsDiv;
let clearButton;
let speakButton;
let cameraButton;
let isCameraOn = false;
let capture;
let inputImage;
let label;

function setup() {
	canvas = createCanvas(400, 400);
	pixelDensity(1);
	let options = {
		inputs: [64, 64, 4],
		task: "imageClassification",
	};
	letterClassifier = ml5.neuralNetwork(options);
	console.log("Loading Model...");
	const modelDetails = {
		model: "model/model.json",
		metadata: "model/model_meta.json",
		weights: "model/model.weights.bin",
	};
	inputImage = createGraphics(64, 64);
	letterClassifier.load(modelDetails, modelLoaded);
	background(255);
	resultsDiv = createDiv("Loading Model...").class("resultsDiv");

	clearButton = createButton("Clear Screen");
	clearButton.mousePressed(function () {
		background(255);
	});
	// * The speak and camera button are useless.
	// speakButton = createButton("Speak!");
	// speakButton.mousePressed(function () {
	// 	speechSynthesis.speak(new SpeechSynthesisUtterance(label));
	// });
	// capture = createCapture(VIDEO);
	// capture.size(width, height);
	// capture.hide();
	// cameraButton = createButton("Switch to camera!").id("camButton");
	// cameraButton.mousePressed(function () {
	// 	if (isCameraOn) {
	// 		isCameraOn = false;
	// 		background(255);
	// 	} else {
	// 		isCameraOn = true;
	// 	}
	// });
	footer = createDiv("&copy MVN · 2021 · All Rights Reserved").class("footer")
}

function modelLoaded() {
	console.log("Model Ready!");
	classifyImage();
}

function gotResults(err, results) {
	if (err) {
		console.error(err);
		return;
	}

	label = results[0].label;
	let confidence = nf(100 * results[0].confidence, 2, 2);

	resultsDiv.html(label + " " + confidence + "%");
	// console.log(results);

	classifyImage();
}

function classifyImage() {
	inputImage.copy(canvas, 0, 0, 400, 400, 0, 0, 64, 64);
	// image(input, 0, 0);

	letterClassifier.classify({ image: inputImage }, gotResults);
}

function draw() {
	// let camButton = document.getElementById("camButton");
	// if (isCameraOn) {
	// 	image(capture, 0, 0, width, height);
	// 	filter(THRESHOLD, 0.4);
	// 	camButton.innerHTML = "Switch to mouse!";
	// } else if (mouseIsPressed) {
	// 	// *** strokeweight configuration ***
	// 	strokeWeight(20);
	// 	line(mouseX, mouseY, pmouseX, pmouseY);
	// 	camButton.innerHTML = "Switch to camera!";
	// }
	if (mouseIsPressed) {
		// *** strokeweight configuration ***
		strokeWeight(20);
		line(mouseX, mouseY, pmouseX, pmouseY);
	}
}

// Fix for the copy() function.
p5.Renderer2D._copyHelper = function (
	srcImage,
	sx,
	sy,
	sw,
	sh,
	dx,
	dy,
	dw,
	dh
) {
	var canvas;
	if (srcImage instanceof p5.Image) {
		canvas = srcImage.canvas;
	} else if (srcImage instanceof p5.Graphics) {
		srcImage.loadPixels();
		canvas = srcImage.elt;
	}
	var s = canvas.width / srcImage.width;
	this.drawingContext.drawImage(
		canvas,
		s * sx,
		s * sy,
		s * sw,
		s * sh,
		dx,
		dy,
		dw,
		dh
	);
};
