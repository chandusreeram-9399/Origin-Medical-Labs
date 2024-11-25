# Medical Image Manipulation SaaS Application

## Project Overview
This project implements a SaaS application designed to manipulate medical images. It includes features like image upload, zoom, cropping, and metadata extraction for DICOM files. The application is built using HTML, CSS, JavaScript, and libraries such as `dicom-parser` for DICOM file parsing.

---

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Libraries**:
  - [dicom-parser](https://github.com/dicom-parser): For parsing DICOM files and extracting metadata.
  - [KonvaJS](https://konvajs.org/): For interactive 2D canvas-based image manipulation.
- **Tools**: Visual Studio Code for development and testing.

---

## Thought Process and Implementation Approach

### 1. Understanding the Requirements
- **Key Functionalities**:
  - Upload and display medical images (PNG and DICOM formats).
  - Manipulate images with zoom and cropping functionalities.
  - Extract and display metadata from DICOM files.

- **Goals**:
  - Provide an intuitive and responsive user interface.
  - Ensure efficient image rendering and metadata parsing.
  - Maintain modular and reusable code.

### 2. Designing the Application
- **Frontend Design**:
  - Used HTML and CSS to structure and style the application.
  - Designed a responsive layout for a seamless user experience on all devices.

- **Image Manipulation Logic**:
  - Implemented zoom and crop using JavaScript, leveraging KonvaJS for smooth and interactive image editing.
  - Added reset functionality to allow users to undo changes.

- **Metadata Extraction**:
  - Integrated `dicom-parser` to parse DICOM files and extract relevant metadata.
  - Displayed extracted data in a clean, readable format alongside the image.

### 3. Code Structure
- **index.html**: Main file for structuring the UI and user interactions.
- **style.css**: Stylesheet for visual design and responsive layout.
- **script.js**: Contains JavaScript logic for image manipulation and metadata extraction.

---

## Assumptions

1. **File Support**:
   - The application assumes input files will be in PNG or DICOM format.
   - Error handling for unsupported formats is minimal.

2. **Metadata Fields**:
   - Only commonly available metadata fields in DICOM files are extracted and displayed.

3. **Image Manipulation Scope**:
   - Focused on basic zoom and crop functionalities. Advanced features like rotation or filtering are not included.

---

## Challenges

1. **DICOM Metadata Extraction**:
   - Handling variations in metadata structures across different DICOM files.
   - Ensuring parsing efficiency for large DICOM files.

2. **User-Friendly Interactions**:
   - Implementing smooth zoom and crop functionality for desktop and mobile devices.
   - Maintaining performance with high-resolution images.

3. **UI Responsiveness**:
   - Achieving consistent user experience across different screen sizes and resolutions.

---

## Methodology

### 1. Research and Planning
- Identified suitable libraries such as `dicom-parser` for DICOM file parsing and KonvaJS for image manipulation.
- Mapped user workflows to match project requirements.

### 2. Development
- **Step 1**: Built a functional UI to upload and display images.
- **Step 2**: Integrated JavaScript logic for zoom and crop functionality.
- **Step 3**: Added DICOM metadata extraction and display features.

### 3. Testing
- Tested with multiple PNG and DICOM files to ensure robustness.
- Conducted usability tests to refine the interface and improve responsiveness.

---

## How to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/chandusreeram-9399/Origin-Medical-Labs.git
