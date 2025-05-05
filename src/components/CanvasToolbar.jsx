import React from 'react';
import { Type, Image } from 'lucide-react';

const CanvasToolbar = ({ 
  textColor, 
  setTextColor, 
  setShowTextInput, 
  showTextInput, 
  fileInputRef 
}) => {
  const colors = ['#3B82F6', '#4CAF50', '#FFC107', '#F44336', '#9C27B0', '#000000'];
  
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10">
      <div className="bg-white/90 backdrop-blur-md rounded-full px-4 py-3 shadow-lg flex items-center gap-8 border border-blue-100">
        <button 
          className={`p-2 transition-colors cursor-pointer focus:outline-none rounded-full ${showTextInput ? 'bg-blue-500 text-white' : 'text-blue-500 hover:text-blue-600 hover:bg-blue-50'}`}
          onClick={() => setShowTextInput(!showTextInput)}
          aria-label="Add text"
        >
          <Type size={22} strokeWidth={1.5} />
        </button>
        
        <button 
          className="text-blue-500 hover:text-blue-600 p-2 transition-colors cursor-pointer focus:outline-none rounded-full hover:bg-blue-50"
          onClick={() => fileInputRef.current.click()}
          aria-label="Upload image"
        >
          <Image size={22} strokeWidth={1.5} />
        </button>
        
        <div className="h-6 w-px bg-blue-100"></div>
        
        <div className="flex items-center gap-3">
          {colors.map((color, index) => (
            <button 
              key={index}
              className={`w-7 h-7 rounded-full transition-all cursor-pointer ${textColor === color ? 'ring-2 ring-offset-2 ring-offset-white ring-blue-300 scale-110' : 'hover:scale-105'}`}
              style={{ backgroundColor: color }}
              onClick={() => setTextColor(color)}
              aria-label={`Select color ${color}`}
            />
          ))}
          
          <button 
            className={`w-7 h-7 rounded-full overflow-hidden border border-blue-100 relative cursor-pointer hover:scale-105 transition-transform ${textColor.startsWith('#') && !colors.includes(textColor) ? 'ring-2 ring-offset-2 ring-offset-white ring-blue-300' : ''}`}
            aria-label="Custom color picker"
          >
            <div className="absolute inset-0" style={{ background: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)' }}></div>
            <input 
              type="color" 
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              aria-label="Pick custom color"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CanvasToolbar; 