import React, { useState } from "react";
import { SmilePlus, Shapes, Image as ImageIcon, X, Palette } from "lucide-react";
import { Stage, Layer, Circle, Rect, Star, RegularPolygon } from 'react-konva';

const emojis = [
  "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", 
  "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
  "👍", "👎", "👋", "✌️", "🤞", "👏", "🙌", "🤲", "🤝", "🙏",
  "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "💔", "❣️", "💕"
];

const shapes = [
  {
    name: "Circle",
    type: "circle",
  },
  {
    name: "Square",
    type: "rect",
  },
  {
    name: "Triangle",
    type: "regularPolygon",
    sides: 3,
  },
  {
    name: "Star",
    type: "star",
    innerRadius: 20,
    outerRadius: 40,
    numPoints: 5,
  },
  {
    name: "Diamond",
    type: "regularPolygon",
    sides: 4,
    rotation: 45,
  },
  {
    name: "Pentagon",
    type: "regularPolygon",
    sides: 5,
  }
];

const shapeColors = [
  "#3B82F6", 
  "#EF4444", 
  "#10B981", 
  "#F59E0B", 
  "#8B5CF6", 
  "#EC4899", 
  "#000000", 
];


const stickers = [
  { 
    name: "Trophy", 
    emoji: "🏆" 
  },
  { 
    name: "Medal", 
    emoji: "🥇" 
  },
  { 
    name: "Star", 
    emoji: "⭐" 
  },
  { 
    name: "Gift", 
    emoji: "🎁" 
  },
  { 
    name: "Rocket", 
    emoji: "🚀" 
  },
  { 
    name: "Fire", 
    emoji: "🔥" 
  },
  { 
    name: "Light Bulb", 
    emoji: "💡" 
  },
  { 
    name: "Rainbow", 
    emoji: "🌈" 
  }
];


const ShapePreview = ({ shape, filled, color }) => {
  const stageWidth = 100;
  const stageHeight = 100;

  return (
    <Stage width={stageWidth} height={stageHeight}>
      <Layer>
        {shape.type === "circle" && (
          <Circle
            x={stageWidth / 2}
            y={stageHeight / 2}
            radius={40}
            stroke={color}
            strokeWidth={1}
            fill={filled ? color : 'transparent'}
          />
        )}
        {shape.type === "rect" && (
          <Rect
            x={10}
            y={10}
            width={stageWidth - 20}
            height={stageHeight - 20}
            stroke={color}
            strokeWidth={1}
            fill={filled ? color : 'transparent'}
          />
        )}
        {shape.type === "regularPolygon" && (
          <RegularPolygon
            x={stageWidth / 2}
            y={stageHeight / 2}
            sides={shape.sides}
            radius={40}
            stroke={color}
            strokeWidth={1}
            fill={filled ? color : 'transparent'}
            rotation={shape.rotation || 0}
          />
        )}
        {shape.type === "star" && (
          <Star
            x={stageWidth / 2}
            y={stageHeight / 2}
            numPoints={shape.numPoints}
            innerRadius={shape.innerRadius}
            outerRadius={shape.outerRadius}
            stroke={color}
            strokeWidth={1}
            fill={filled ? color : 'transparent'}
          />
        )}
      </Layer>
    </Stage>
  );
};

const Sidebar = ({ onAddElement, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("emoji");
  const [selectedShape, setSelectedShape] = useState(null);
  const [shapeColor, setShapeColor] = useState("#3B82F6");
  const [shapeFilled, setShapeFilled] = useState(false);

  const handleAddEmoji = (emoji) => {
    onAddElement("sticker", emoji, { 
      fontSize: "48px",
      width: "60px", 
      height: "60px"
    });
  };

  const handleAddShape = (shape) => {
    onAddElement("konvaShape", {
      type: shape.type,
      props: {
        sides: shape.sides,
        numPoints: shape.numPoints,
        innerRadius: shape.innerRadius,
        outerRadius: shape.outerRadius,
        rotation: shape.rotation || 0
      },
      color: shapeColor,
      filled: shapeFilled,
      name: shape.name
    }, { 
      width: "100px", 
      height: "100px",
    });
    setSelectedShape(null);
  };

  const handleAddSticker = (sticker) => {
    onAddElement("sticker", sticker.emoji, { 
      fontSize: "72px",
      width: "100px", 
      height: "100px"
    });
  };


  const renderShapePreviewThumb = (shape) => {
    const thumbSize = 64;
    
    return (
      <Stage width={thumbSize} height={thumbSize}>
        <Layer>
          {shape.type === "circle" && (
            <Circle
              x={thumbSize / 2}
              y={thumbSize / 2}
              radius={thumbSize * 0.4}
              stroke="#3B82F6"
              strokeWidth={1}
              fill="transparent"
            />
          )}
          {shape.type === "rect" && (
            <Rect
              x={thumbSize * 0.15}
              y={thumbSize * 0.15}
              width={thumbSize * 0.7}
              height={thumbSize * 0.7}
              stroke="#3B82F6"
              strokeWidth={1}
              fill="transparent"
            />
          )}
          {shape.type === "regularPolygon" && (
            <RegularPolygon
              x={thumbSize / 2}
              y={thumbSize / 2}
              sides={shape.sides}
              radius={thumbSize * 0.4}
              stroke="#3B82F6"
              strokeWidth={1}
              fill="transparent"
              rotation={shape.rotation || 0}
            />
          )}
          {shape.type === "star" && (
            <Star
              x={thumbSize / 2}
              y={thumbSize / 2}
              numPoints={shape.numPoints}
              innerRadius={shape.innerRadius * 0.6}
              outerRadius={shape.outerRadius * 0.6}
              stroke="#3B82F6"
              strokeWidth={1}
              fill="transparent"
            />
          )}
        </Layer>
      </Stage>
    );
  };

  return (
    <div 
      className={`fixed top-0 right-0 h-full bg-white shadow-xl transition-all duration-300 z-40 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ width: "280px" }}
    >
      <button 
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
      >
        <X size={20} />
      </button>
      
      <div className="p-4 border-b border-blue-100">
        <h2 className="text-lg font-medium text-blue-700">Elements</h2>
        <p className="text-sm text-blue-500">Add items to your canvas</p>
      </div>

      <div className="flex border-b border-blue-100">
        <button
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === "emoji" ? "text-blue-600 border-b-2 border-blue-500" : "text-gray-500"
          }`}
          onClick={() => {
            setActiveTab("emoji");
            setSelectedShape(null);
          }}
        >
          <div className="flex items-center justify-center gap-1">
            <SmilePlus size={16} />
            <span>Emojis</span>
          </div>
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === "shapes" ? "text-blue-600 border-b-2 border-blue-500" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("shapes")}
        >
          <div className="flex items-center justify-center gap-1">
            <Shapes size={16} />
            <span>Shapes</span>
          </div>
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === "stickers" ? "text-blue-600 border-b-2 border-blue-500" : "text-gray-500"
          }`}
          onClick={() => {
            setActiveTab("stickers");
            setSelectedShape(null);
          }}
        >
          <div className="flex items-center justify-center gap-1">
            <ImageIcon size={16} />
            <span>Stickers</span>
          </div>
        </button>
      </div>

      <div className="p-4 h-[calc(100vh-135px)] overflow-y-auto">
        {activeTab === "emoji" && (
          <div className="grid grid-cols-5 gap-2">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                className="w-full aspect-square flex items-center justify-center text-2xl bg-blue-50 hover:bg-blue-100 rounded transition-colors"
                onClick={() => handleAddEmoji(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        {activeTab === "shapes" && (
          <>
            {selectedShape ? (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-blue-700">{selectedShape.name}</h3>
                  <button 
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => setSelectedShape(null)}
                  >
                    Back
                  </button>
                </div>
                
                <div className="mb-4 flex justify-center">
                  <div className="w-24 h-24 flex items-center justify-center">
                    <ShapePreview 
                      shape={selectedShape} 
                      filled={shapeFilled} 
                      color={shapeColor} 
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-blue-700 mb-2 flex items-center gap-1">
                    <Palette size={16} />
                    <span>Choose Color</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {shapeColors.map((color, index) => (
                      <button
                        key={index}
                        className={`w-7 h-7 rounded-full transition-all ${shapeColor === color ? 'ring-2 ring-offset-2 ring-blue-300 scale-110' : 'hover:scale-105'}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setShapeColor(color)}
                        aria-label={`Select color ${color}`}
                      />
                    ))}
                    
                    <button 
                      className={`w-7 h-7 rounded-full overflow-hidden border border-blue-100 relative hover:scale-105 transition-transform ${!shapeColors.includes(shapeColor) ? 'ring-2 ring-offset-2 ring-blue-300 scale-110' : ''}`}
                      aria-label="Custom color"
                    >
                      <div className="absolute inset-0" style={{ background: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)' }}></div>
                      <input 
                        type="color"
                        value={shapeColor}
                        onChange={(e) => setShapeColor(e.target.value)}
                        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                        aria-label="Pick custom color"
                      />
                    </button>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={shapeFilled}
                      onChange={(e) => setShapeFilled(e.target.checked)}
                      className="form-checkbox text-blue-500 rounded"
                    />
                    <span className="text-sm text-blue-700">Fill Shape</span>
                  </label>
                </div>
                
                <button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
                  onClick={() => handleAddShape(selectedShape)}
                >
                  Add to Canvas
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {shapes.map((shape, index) => (
                  <button
                    key={index}
                    className="aspect-square p-2 flex flex-col items-center bg-blue-50 hover:bg-blue-100 rounded transition-colors"
                    onClick={() => setSelectedShape(shape)}
                  >
                    <div className="w-16 h-16 flex items-center justify-center text-blue-500">
                      {renderShapePreviewThumb(shape)}
                    </div>
                    <span className="text-xs text-blue-700 mt-1">{shape.name}</span>
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "stickers" && (
          <div className="grid grid-cols-3 gap-3">
            {stickers.map((sticker, index) => (
              <button
                key={index}
                className="aspect-square flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 rounded transition-colors"
                onClick={() => handleAddSticker(sticker)}
              >
                <span className="text-3xl mb-1">{sticker.emoji}</span>
                <span className="text-xs text-blue-700">{sticker.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar; 