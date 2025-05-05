import React, { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import {
  Move,
  X,
  RotateCw,
  PanelRight,
  Type,
  Palette,
  Layout,
  SaveIcon,
  Download,
  ExternalLink,
} from "lucide-react";
import CanvasToolbar from "./CanvasToolbar";
import TextInputPanel from "./TextInputPanel";
import Sidebar from "./Sidebar";
import { Stage, Layer, Circle, Rect, Star, RegularPolygon } from "react-konva";
import anime from 'animejs';
import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';

const Canvas = () => {
  const [show, setShow] = useState(false);
  const [exportReady, setExportReady] = useState(false);
  const [elements, setElements] = useState([
    {
      id: "1",
      type: "text",
      content: "Resize Me!",
      position: { x: 450, y: 430 },
      rotation: 0,
      style: {
        fontSize: "24px",
        fontWeight: "normal",
        color: "#439BF9",
        fontStyle: "normal",
        textDecoration: "none",
        textShadow: "none",
      },
    },
  ]);


  const [newText, setNewText] = useState("");
  const [textColor, setTextColor] = useState("#3B82F6");
  const [fontSize, setFontSize] = useState(18);
  const [showTextInput, setShowTextInput] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [rotationValue, setRotationValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showBackgroundPicker, setShowBackgroundPicker] = useState(false);
  const [canvasBackgroundColor, setCanvasBackgroundColor] = useState("#FFFFFF");


  const [controlPanelPosition, setControlPanelPosition] = useState("top");


  const fileInputRef = useRef(null);
  const canvasContainerRef = useRef(null);

  const backgroundColors = [
    "#FFFFFF",
    "#E1F1FD",
    "#F0F9FF",
    "#F0FDF4",
    "#FEF9C3",
    "#FCE7F3",
    "#F1F5F9",
  ];

  const addElement = (type, content, style = {}) => {
    const newElement = {
      id: Date.now().toString(),
      type,
      content,
      position: { x: 100, y: 100 },
      rotation: 0,
      style,
    };
    setElements([...elements, newElement]);
  };

  const handleRotation = (id, degrees) => {
    setRotationValue(degrees);
    const updatedElements = elements.map((el) =>
      el.id === id ? { ...el, rotation: degrees } : el
    );
    setElements(updatedElements);
  };

  const updateElementStyle = (id, newStyle) => {
    const updatedElements = elements.map((el) =>
      el.id === id ? { ...el, style: { ...el.style, ...newStyle } } : el
    );
    setElements(updatedElements);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        addElement("image", event.target.result, {
          width: "200px",
          height: "200px",
        });
      };
      reader.readAsDataURL(file);
    }
    e.target.value = null;
  };

  const handleAddText = (e, textStyle = {}) => {
    e.preventDefault();
    if (newText.trim()) {
      addElement("text", newText, {
        color: textColor,
        fontSize: `${fontSize}px`,
        fontWeight: textStyle.fontWeight || "normal",
        fontStyle: textStyle.fontStyle || "normal",
        textDecoration: textStyle.textDecoration || "none",
        textShadow: textStyle.textShadow || "none",
        width: `${Math.max(
          200,
          Math.min(newText.length * fontSize * 0.6, 800)
        )}px`,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        overflow: "hidden",
      });
      setNewText("");
      setShowTextInput(false);
    }
  };

  const handleTextEdit = (id, newContent) => {
    const updatedElements = elements.map((el) =>
      el.id === id ? { ...el, content: newContent } : el
    );
    setElements(updatedElements);
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    setElements(elements.filter((el) => el.id !== id));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
  };

  const gridBgStyle = {
    backgroundColor: canvasBackgroundColor,
  };

  const handleElementSelect = (id) => {
    const element = elements.find((el) => el.id === id);
    if (element) {
      setRotationValue(element.rotation);
      setSelectedElement(id);

      if (element.position.y < 100) {
        setControlPanelPosition("bottom");
      } else {
        setControlPanelPosition("top");
      }
    }
  };

  const getSelectedElement = () => {
    return elements.find((el) => el.id === selectedElement);
  };

  const handleCanvasClick = (e) => {
    if (e.target.classList.contains("canvas-container")) {
      setSelectedElement(null);
    }
  };


  const handleAddElementFromSidebar = (type, content, style = {}) => {
    addElement(type, content, style);
  };

  const handleFontSizeChange = (newSize) => {
    if (selectedElement) {
      updateElementStyle(selectedElement, { fontSize: `${newSize}px` });
    }
  };

  const handleTextColorChange = (newColor) => {
    if (selectedElement) {
      updateElementStyle(selectedElement, { color: newColor });
    }
  };

  const toggleBackgroundPicker = () => {
    setShowBackgroundPicker(!showBackgroundPicker);
  };

  const handleBackgroundColorChange = (color) => {
    setCanvasBackgroundColor(color);
  };

  const renderKonvaShape = (element) => {
    const content = element.content;
    const width = parseInt(element.style.width);
    const height = parseInt(element.style.height);

    return (
      <div
        className="drag-handle"
        onClick={(e) => {
          e.stopPropagation();
          handleElementSelect(element.id);
        }}
        style={{
          cursor: "move",
          width: "100%",
          height: "100%",
        }}
      >
        <Stage width={width} height={height}>
          <Layer>
            {content.type === "circle" && (
              <Circle
                x={width / 2}
                y={height / 2}
                radius={Math.min(width, height) * 0.45}
                stroke={content.color}
                strokeWidth={1.5}
                fill={content.filled ? content.color : "transparent"}
              />
            )}
            {content.type === "rect" && (
              <Rect
                x={5}
                y={5}
                width={width - 10}
                height={height - 10}
                stroke={content.color}
                strokeWidth={1.5}
                fill={content.filled ? content.color : "transparent"}
              />
            )}
            {content.type === "regularPolygon" && (
              <RegularPolygon
                x={width / 2}
                y={height / 2}
                sides={content.props.sides}
                radius={Math.min(width, height) * 0.45}
                stroke={content.color}
                strokeWidth={1.5}
                fill={content.filled ? content.color : "transparent"}
                rotation={content.props.rotation || 0}
              />
            )}
            {content.type === "star" && (
              <Star
                x={width / 2}
                y={height / 2}
                numPoints={content.props.numPoints}
                innerRadius={Math.min(width, height) * 0.2}
                outerRadius={Math.min(width, height) * 0.45}
                stroke={content.color}
                strokeWidth={1.5}
                fill={content.filled ? content.color : "transparent"}
              />
            )}
          </Layer>
        </Stage>
      </div>
    );
  };


  const renderElement = (element) => {
    if (element.type === "text") {
      return (
        <div
          contentEditable={selectedElement === element.id}
          suppressContentEditableWarning={true}
          onBlur={(e) => {
            handleTextEdit(element.id, e.target.innerText);
            setIsEditing(false);
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleElementSelect(element.id);
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
            e.currentTarget.focus();
          }}
          onFocus={() => setIsEditing(true)}
          style={{
            ...element.style,
            outline: "none",
            minWidth: "50px",
            minHeight: "30px",
            maxWidth: "800px",
            cursor:
              isEditing && selectedElement === element.id ? "text" : "move",
            wordWrap: "break-word",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className={`focus:ring-1 focus:ring-blue-300 rounded transition-all p-2 ${
            isEditing && selectedElement === element.id ? "" : "drag-handle"
          }`}
        >
          {element.content}
        </div>
      );
    } else if (element.type === "image") {
      return (
        <div
          className="relative pointer-events-auto drag-handle"
          onClick={(e) => {
            e.stopPropagation();
            handleElementSelect(element.id);
          }}
          style={{
            cursor: "move",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={element.content}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
            }}
            draggable="false"
            className="rounded-md"
          />
        </div>
      );
    } else if (element.type === "sticker") {
      return (
        <div
          className="drag-handle flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            handleElementSelect(element.id);
          }}
          style={{
            cursor: "move",
            width: "100%",
            height: "100%",
            fontSize: element.style.fontSize || "48px",
            userSelect: "none",
          }}
        >
          {element.content}
        </div>
      );
    } else if (element.type === "konvaShape") {
      return renderKonvaShape(element);
    }

    return null;
  };

  const colors = [
    "#3B82F6",
    "#4CAF50",
    "#FFC107",
    "#F44336",
    "#9C27B0",
    "#000000",
  ];

  const getCurrentFontSize = () => {
    const element = getSelectedElement();
    if (element && element.type === "text" && element.style.fontSize) {
      return parseInt(element.style.fontSize);
    }
    return 24; 
  };
  
  const getCurrentColor = () => {
    const element = getSelectedElement();
    if (element && element.style && element.style.color) {
      return element.style.color;
    }
    return "#3B82F6";
  };

  const SavingLoader = () => {
    const progressRef = useRef(null);
    
    useEffect(() => {
      if (!progressRef.current) return;
  
      const animation = anime({
        targets: progressRef.current,
        keyframes: [
          { width: '15%' },
          { width: '100%' }
        ],
        easing: 'easeInOutQuad',
        duration: 1000,
        complete: () => {

          setShow(false);
          alert('Journal Saved Successfully')
          setExportReady(true);
        }
      });
  
      return () => {animation.pause();}
    }, []);
  
    return (
      <div className="absolute top-8 left-0 right-0 flex items-center justify-center z-50">
        <div className="bg-white px-6 py-4 rounded-lg shadow-lg border border-blue-100 flex flex-col items-center gap-2 max-w-[90%]">
          <span className="text-sm font-medium text-blue-700 mb-1">Saving your canvas...</span>
          <div className="w-48 bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="bg-blue-500 h-full"
              style={{ 
                width: '15%',
                background: "linear-gradient(90deg, #3B82F6, #60A5FA)" 
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const ExportOptions = () => {
    return (
      <div className="absolute top-2 right-12 z-50 flex items-center gap-2">
        <button 
          onClick={handleExportPDF}
          className="px-3 py-1.5 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 transition-colors flex items-center gap-1"
        >
          <Download size={14} />
          PDF
        </button>
        <button 
          onClick={handleExportPNG}
          className="px-3 py-1.5 bg-green-500 text-white text-xs rounded-md hover:bg-green-600 transition-colors flex items-center gap-1"
        >
          <ExternalLink size={14} />
          PNG
        </button>
      </div>
    );
  };

  const handleExportPDF = () => {
    exportCanvas('pdf');
  };
  
  const handleExportPNG = () => {
    exportCanvas('png');
  };
  
  const exportCanvas = (format) => {
    const canvasElement = canvasContainerRef.current;
    if (!canvasElement) return;
    

    const selectedElementBefore = selectedElement;
    setSelectedElement(null);
    

    const exportReadyBefore = exportReady;
    setExportReady(false);
    

    const filter = (node) => {
      if (node.classList) {
        if (
          node.classList.contains('control-panel') || 
          node.tagName === 'BUTTON' ||
          (node.getAttribute && node.getAttribute('aria-label')?.includes('color')) ||
          node.classList.contains('canvas-header') ||
          node.classList.contains('export-buttons')
        ) {
          return false;
        }
      }
      return true;
    };
    
    setTimeout(() => {
      htmlToImage.toPng(canvasElement, { 
        quality: 0.95,
        backgroundColor: canvasBackgroundColor,
        filter: filter,
        skipFonts: false,
        pixelRatio: 2
      })
      .then(function (dataUrl) {
        if (format === 'pdf') {
          const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
          });
          
          const imgProps = pdf.getImageProperties(dataUrl);
          const width = pdf.internal.pageSize.getWidth();
          const height = (imgProps.height * width) / imgProps.width;
          
          pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
          pdf.save('traveller-canvas.pdf');
        } else {
          const link = document.createElement('a');
          link.download = 'traveller-canvas.png';
          link.href = dataUrl;
          link.click();
        }
        
        setSelectedElement(selectedElementBefore);
        setExportReady(exportReadyBefore);
      })
      .catch(function (error) {
        console.error(`Error exporting to ${format.toUpperCase()}:`, error);
        alert(`There was an issue exporting to ${format.toUpperCase()}. Please try again.`);
        setSelectedElement(selectedElementBefore);
        setExportReady(exportReadyBefore);
      });
    }, 100);
  };
  
  const handleSaveCanvas = () => {
    setExportReady(false);
    setShow(true);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <div
        ref={canvasContainerRef}
        className="w-full max-w-4xl h-[72vh] bg-white rounded-2xl relative overflow-hidden canvas-container"
        style={{
          ...gridBgStyle,
          boxShadow: "0 10px 30px rgba(59, 130, 246, 0.1)",
          border: "none",
        }}
        onClick={handleCanvasClick}
      >
        <div className="absolute top-0 left-0 right-0 h-8 bg-blue-50 flex items-center justify-between z-10 canvas-header">
          <div className="relative left-[45%] text-xs text-blue-500 font-medium">
            Travel Canvas
          </div>
          <div className="flex items-center gap-2 mr-3 export-buttons">
            {exportReady ? (
              <>
                <button 
                  onClick={handleExportPDF}
                  className="px-3 py-1.5 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 transition-colors flex items-center gap-1"
                >
                  <Download size={14} />
                  PDF
                </button>
                <button 
                  onClick={handleExportPNG}
                  className="px-3 py-1.5 bg-green-500 text-white text-xs rounded-md hover:bg-green-600 transition-colors flex items-center gap-1"
                >
                  <ExternalLink size={14} />
                  PNG
                </button>
              </>
            ) : (
              <div className="cursor-pointer bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors z-20">
                <SaveIcon size={16} onClick={handleSaveCanvas} />
              </div>
            )}
          </div>
        </div>
        
        {show && <SavingLoader />}
        
        {elements.map((element) => (
          <Rnd
            key={element.id}
            default={{
              x: element.position.x,
              y: element.position.y,
              width: element.style.width || "auto",
              height: element.style.height || "auto",
            }}
            bounds="parent"
            enableResizing={{
              top: true,
              right: true,
              bottom: true,
              left: true,
              topRight: true,
              bottomRight: true,
              bottomLeft: true,
              topLeft: true,
            }}
            disableDragging={false}
            dragHandleClassName="drag-handle"
            onDragStart={(e) => {
              e.stopPropagation();
              handleElementSelect(element.id);
            }}
            onClick={() => handleElementSelect(element.id)}
            onDragStop={(e, d) => {
              const updatedElements = elements.map((el) =>
                el.id === element.id
                  ? {
                      ...el,
                      position: { x: d.x, y: d.y },
                    }
                  : el
              );
              setElements(updatedElements);

              if (d.y < 100) {
                setControlPanelPosition("bottom");
              } else {
                setControlPanelPosition("top");
              }
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              const updatedElements = elements.map((el) =>
                el.id === element.id
                  ? {
                      ...el,
                      position: { x: position.x, y: position.y },
                      style: {
                        ...el.style,
                        width: ref.style.width,
                        height: ref.style.height,
                        ...(el.type === "sticker" && {
                          fontSize: `${Math.min(
                            parseInt(ref.style.height) * 0.8,
                            parseInt(ref.style.width) * 0.8
                          )}px`,
                        }),
                      },
                    }
                  : el
              );
              setElements(updatedElements);
            }}
            z={selectedElement === element.id ? 1000 : 1}
          >
            <div
              className="relative group"
              style={{
                transform: `rotate(${element.rotation}deg)`,
                transformOrigin: "center center",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className={`drag-handle absolute -top-4 -left-4 w-8 h-8 bg-blue-400 text-white rounded-full flex items-center justify-center cursor-move transition-opacity shadow-md z-30 ${
                  selectedElement === element.id
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                <Move size={18} />
              </div>

              <div
                className={`absolute -inset-1 border rounded-md pointer-events-none ${
                  selectedElement === element.id
                    ? "border-blue-500 opacity-100"
                    : "border-blue-300 opacity-0 group-hover:opacity-100"
                } transition-all`}
              ></div>

              {renderElement(element)}
            </div>
          </Rnd>
        ))}

        <button
          onClick={toggleBackgroundPicker}
          className="absolute bottom-4 left-4 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors z-20"
          title="Change background color"
        >
          <Layout size={20} />
        </button>

        {showBackgroundPicker && (
          <div className="absolute bottom-16 left-4 bg-white rounded-lg shadow-lg p-3 z-30">
            <h4 className="text-sm text-blue-700 font-medium mb-2">
              Canvas Background
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {backgroundColors.map((color, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-md transition-all border ${
                    canvasBackgroundColor === color
                      ? "ring-2 ring-blue-500 ring-offset-1"
                      : "border-gray-200"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleBackgroundColorChange(color)}
                  aria-label={`Select background color ${color}`}
                />
              ))}

              <button
                className={`w-8 h-8 rounded-md overflow-hidden border border-gray-200 relative ${
                  !backgroundColors.includes(canvasBackgroundColor)
                    ? "ring-2 ring-blue-500 ring-offset-1"
                    : ""
                }`}
                aria-label="Custom background color"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
                  }}
                ></div>
                <input
                  type="color"
                  value={canvasBackgroundColor}
                  onChange={(e) => handleBackgroundColorChange(e.target.value)}
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  aria-label="Pick custom background color"
                />
              </button>
            </div>
          </div>
        )}

        {selectedElement && (
          <div
            className={`absolute ${
              controlPanelPosition === "top" ? "top-12" : "bottom-12"
            } left-0 right-0 flex justify-center z-50`}
          >
            <div className="bg-white rounded-lg shadow-lg p-3 border border-blue-100 max-w-[90%]">
              <div className="flex items-center gap-3 mb-2 flex-wrap justify-center">
                <label className="flex items-center gap-2 text-blue-700">
                  <RotateCw size={16} />
                  <span className="text-sm">Rotation:</span>
                  <input
                    type="number"
                    min="0"
                    max="359"
                    value={rotationValue}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value)) {
                        const normalizedValue = ((value % 360) + 360) % 360;
                        handleRotation(selectedElement, normalizedValue);
                      }
                    }}
                    className="w-16 bg-blue-50 border border-blue-100 rounded px-2 py-1 text-sm text-blue-800 focus:outline-none focus:border-blue-300"
                  />
                  <span className="text-sm">°</span>
                </label>

                <button
                  onClick={() => handleRotation(selectedElement, 0)}
                  className="px-2 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  Reset
                </button>

                <button
                  onClick={() => handleDelete(selectedElement)}
                  className="px-2 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-sm flex items-center gap-1"
                >
                  <X size={14} />
                  <span>Delete</span>
                </button>
              </div>

              {getSelectedElement()?.type === "text" && (
                <div className="mt-2 pt-2 border-t border-blue-100">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <div className="flex items-center gap-1 text-blue-700">
                      <Type size={14} />
                      <span className="text-xs">Size:</span>
                    </div>
                    <div className="flex-1 flex items-center gap-2 min-w-[150px]">
                      <input
                        type="range"
                        min="8"
                        max="72"
                        value={getCurrentFontSize()}
                        onChange={(e) =>
                          handleFontSizeChange(parseInt(e.target.value))
                        }
                        className="flex-1 h-1.5 accent-blue-500 bg-blue-100 rounded-full appearance-none cursor-pointer"
                      />
                      <span className="text-xs text-blue-700 w-8 text-right">
                        {getCurrentFontSize()}px
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1 text-blue-700">
                      <Palette size={14} />
                      <span className="text-xs">Color:</span>
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {colors.map((color, index) => (
                        <button
                          key={index}
                          className={`w-5 h-5 rounded-full transition-all ${
                            getCurrentColor() === color
                              ? "ring-1 ring-offset-1 ring-blue-300 scale-110"
                              : "hover:scale-105"
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => handleTextColorChange(color)}
                          aria-label={`Select color ${color}`}
                        />
                      ))}

                      <button
                        className={`w-5 h-5 rounded-full overflow-hidden border border-blue-100 relative hover:scale-105 transition-transform ${
                          !colors.includes(getCurrentColor())
                            ? "ring-1 ring-offset-1 ring-blue-300 scale-110"
                            : ""
                        }`}
                        aria-label="Custom color"
                      >
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
                          }}
                        ></div>
                        <input
                          type="color"
                          value={getCurrentColor()}
                          onChange={(e) =>
                            handleTextColorChange(e.target.value)
                          }
                          className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                          aria-label="Pick custom color"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <button
          onClick={() => setShowSidebar(true)}
          className="absolute bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors z-20"
          title="Open elements panel"
        >
          <PanelRight size={20} />
        </button>
      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageUpload}
      />

      <div className="w-full mt-8 relative">
        <CanvasToolbar
          textColor={textColor}
          setTextColor={setTextColor}
          showTextInput={showTextInput}
          setShowTextInput={setShowTextInput}
          fileInputRef={fileInputRef}
        />

        <TextInputPanel
          showTextInput={showTextInput}
          newText={newText}
          setNewText={setNewText}
          fontSize={fontSize}
          setFontSize={setFontSize}
          handleAddText={handleAddText}
        />
      </div>

      <Sidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        onAddElement={handleAddElementFromSidebar}
      />
    </div>
  );
};

export default Canvas;
