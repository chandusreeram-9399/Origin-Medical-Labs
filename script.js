let canvas = document.getElementById("imageCanvas");
let ctx = canvas.getContext("2d");
let image = new Image();
let scale = 1;
let cropping = false;
let cropStart = {};
let cropEnd = {};
let dicomTags = {};

// Upload handler
document.getElementById("imageUpload").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (fileExtension === "dcm") {
        processDicom(file);
    } else {
        processImage(file);
    }
});

// Process DICOM File
function processDicom(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const dicomData = new Uint8Array(e.target.result);
        try {
            // Parse the DICOM file
            const dataSet = dicomParser.parseDicom(dicomData);

            // Extract and display metadata
            extractDicomMetadata(dataSet);
        } catch (error) {
            alert("Error parsing DICOM file: " + error.message);
        }
    };
    reader.readAsArrayBuffer(file);
}

// Extract DICOM Metadata
function extractDicomMetadata(dataSet) {
    const metadataDisplay = document.getElementById("dicomMetadata");
    const metadata = {
        "Patient Name": dataSet.string('x00100010') || "N/A",
        "Patient ID": dataSet.string('x00100020') || "N/A",
        "Study Date": dataSet.string('x00080020') || "N/A",
        "Modality": dataSet.string('x00080060') || "N/A"
    };

    // Clear and populate metadata display
    metadataDisplay.innerHTML = "";
    for (const [key, value] of Object.entries(metadata)) {
        const p = document.createElement("p");
        p.textContent = `${key}: ${value}`;
        metadataDisplay.appendChild(p);
    }
}

// Process Normal Image
function processImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        image.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
};

// Zoom Functions
function zoomIn() {
    scale += 0.1;
    drawImageScaled();
}

function zoomOut() {
    if (scale > 0.2) {
        scale -= 0.1;
        drawImageScaled();
    }
}

function reset() {
    scale = 1;
    cropping = false;
    cropStart = {};
    cropEnd = {};
    drawImageScaled();
}

function drawImageScaled() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const width = image.width * scale;
    const height = image.height * scale;
    const x = (canvas.width - width) / 2;
    const y = (canvas.height - height) / 2;
    ctx.drawImage(image, x, y, width, height);
}

// Enable Crop
function enableCrop() {
    cropping = true;
    canvas.addEventListener("mousedown", startCrop);
    canvas.addEventListener("mouseup", endCrop);
}

function startCrop(event) {
    if (!cropping) return;
    const rect = canvas.getBoundingClientRect();
    cropStart = { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

function endCrop(event) {
    if (!cropping) return;
    const rect = canvas.getBoundingClientRect();
    cropEnd = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    drawCropBox();
}

function drawCropBox() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawImageScaled();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(
        cropStart.x,
        cropStart.y,
        cropEnd.x - cropStart.x,
        cropEnd.y - cropStart.y
    );
}

// Apply Crop
function applyCrop() {
    if (!cropStart.x || !cropEnd.x) return;

    const width = cropEnd.x - cropStart.x;
    const height = cropEnd.y - cropStart.y;

    if (width <= 0 || height <= 0) {
        alert("Invalid crop dimensions.");
        return;
    }

    const croppedImage = ctx.getImageData(cropStart.x, cropStart.y, width, height);
    canvas.width = width;
    canvas.height = height;
    ctx.putImageData(croppedImage, 0, 0);

    cropping = false;
}
