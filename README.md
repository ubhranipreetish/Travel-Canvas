# Travel Canvas

A modern, interactive canvas editor with drag-and-drop functionality, perfect for creating visual content for your travel experiences.
Hosted URL : 'https://travelcanvas.netlify.app/'

## Features

### Canvas Editing
•⁠  ⁠*Interactive Canvas*: A full-featured editor with an intuitive interface
•⁠  ⁠*Background Customization*: Change canvas background color from a preset palette or use a custom color
•⁠  ⁠*Export Options*: Save your designs as PNG or PDF with high-quality output

### Element Manipulation
•⁠  ⁠*Text Elements*: Add, edit, resize, and style text with various formatting options
•⁠  ⁠*Image Support*: Upload and place images on the canvas
•⁠  ⁠*Drag and Drop*: Easily position elements anywhere on the canvas
•⁠  ⁠*Resize Controls*: Resize any element with intuitive handles
•⁠  ⁠*Rotation*: Rotate elements to any angle
•⁠  ⁠*Selection*: Select elements to edit their properties

### Text Formatting
•⁠  ⁠*Font Size Control*: Adjust text size with a slider
•⁠  ⁠*Color Options*: Change text color from a preset palette or custom color picker
•⁠  ⁠*Typography Styles*: Apply bold, italic, and other text styles

### Element Management
•⁠  ⁠*Add Elements*: Text, images, stickers, and shapes
•⁠  ⁠*Delete Elements*: Remove unwanted elements
•⁠  ⁠*Layer Control*: Arrange elements front to back
•⁠  ⁠*Alignment*: Position elements precisely where you want them

### User Experience
•⁠  ⁠*Responsive Controls*: Control panel changes position based on selected element location
•⁠  ⁠*Visual Feedback*: Selection indicators and resize handles
•⁠  ⁠*Undo/Redo*: Coming soon

## Setup Instructions

### Prerequisites
•⁠  ⁠Node.js 14.x or higher
•⁠  ⁠npm 6.x or higher

### Installation

1.⁠ ⁠Clone the repository
⁠ bash
git clone
cd travel-canvas
 ⁠

2.⁠ ⁠Install dependencies
⁠ bash
npm install
 ⁠

3.⁠ ⁠Start the development server
⁠ bash
npm run dev
 ⁠

4.⁠ ⁠Open your browser and navigate to:

http://localhost:5173


### Building for Production

To create a production build:

⁠ bash
npm run build
 ⁠

The built files will be in the ⁠ dist ⁠ directory, ready to be deployed to any static hosting service.

## Usage Guide

### Adding Elements

1.⁠ ⁠*Text*: Click the text button (T) in the toolbar, enter your text, adjust size and color, then click "Add Text"
2.⁠ ⁠*Images*: Click the image button (picture icon) and select an image from your device
3.⁠ ⁠*Shapes*: Open the sidebar by clicking the panel icon, then select a shape from the options

### Editing Elements

1.⁠ ⁠Click on any element to select it
2.⁠ ⁠Use the control panel to adjust rotation
3.⁠ ⁠For text elements, additional controls for size and color will appear
4.⁠ ⁠Double-click text to edit its content
5.⁠ ⁠Click and drag the resize handles to adjust element size
6.⁠ ⁠Click the delete button to remove an element

### Background Options

1.⁠ ⁠Click the layout icon in the bottom left corner
2.⁠ ⁠Select from preset background colors or use the color picker for custom colors

### Exporting Your Design

1.⁠ ⁠Click the save icon in the top right
2.⁠ ⁠Once processing is complete, choose to export as PDF or PNG
3.⁠ ⁠Your design will download automatically

## Troubleshooting

### Common Issues

#### Image Upload Problems

•⁠  ⁠*Images not appearing after upload*  
  This might be due to file format compatibility issues.
  
  *Solution:*  
  - Ensure you're using common image formats (JPG, PNG, GIF)
  - Check that the file size isn't too large (keep under 5MB)

#### Export Failures

•⁠  ⁠*Canvas not exporting properly*  
  Sometimes elements may be missing in exports due to rendering issues.
  
  *Solution:*  
  - Make sure all elements are fully loaded before export
  - Try disabling any ad-blockers that might interfere with the export process

#### Performance Issues

•⁠  ⁠*Canvas becoming slow with many elements*  
  The canvas may become less responsive as you add more elements.
  
  *Solution:*  
  - Try to limit the number of complex elements (especially images)
  - Close other browser tabs to free up memory

## Technology Stack

•⁠  ⁠React.js
•⁠  ⁠Konva.js for canvas shapes
•⁠  ⁠React-Rnd for resizable elements
•⁠  ⁠Lucide React for icons
•⁠  ⁠HTML-to-Image for canvas export
•⁠  ⁠jsPDF for PDF generation

### Combined with Resizable Elements

For a complete drag, drop, and resize solution, we combine drag functionality with resizable elements. This typically involves:

1.⁠ ⁠Managing element position state
2.⁠ ⁠Handling drag events
3.⁠ ⁠Processing resize events
4.⁠ ⁠Maintaining aspect ratios when needed

Check out the source code in ⁠ Canvas.jsx ⁠ to see how these features are implemented in Travel Canvas.