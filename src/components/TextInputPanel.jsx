import React, { useState } from "react";
import { Bold, Italic, Underline, Square } from "lucide-react";

const TextInputPanel = ({
  showTextInput,
  newText,
  setNewText,
  fontSize,
  setFontSize,
  handleAddText,
}) => {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [hasOutline, setHasOutline] = useState(false);
  const [outlineColor, setOutlineColor] = useState("#000000");

  if (!showTextInput) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const style = {
      fontSize: `${fontSize}px`,
      fontWeight: isBold ? "bold" : "normal",
      fontStyle: isItalic ? "italic" : "normal",
      textDecoration: isUnderline ? "underline" : "none",
      textShadow: hasOutline
        ? `
        -1px -1px 0 ${outlineColor},
        1px -1px 0 ${outlineColor},
        -1px 1px 0 ${outlineColor},
        1px 1px 0 ${outlineColor}
      `
        : "none",
    };
    handleAddText(e, style);
  };

  const handleOutlineColorChange = (e) => {
    const newColor = e.target.value;
    setOutlineColor(newColor);
  };

  return (
    <div className="absolute bottom-full right-6 mb-6 bg-white rounded-xl shadow-lg overflow-hidden w-[320px] border border-blue-100">
      <div className="p-4">
        <textarea
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Enter text"
          className="w-full h-20 bg-blue-50 border border-blue-100 text-blue-800 rounded-md px-3 py-2 outline-none text-sm focus:border-blue-300 transition-colors resize-none"
          autoFocus
        />

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <label className="text-blue-600 text-xs font-medium">Size:</label>
            <span className="text-blue-500 text-xs">{fontSize}px</span>
          </div>
          <input
            type="range"
            min="10"
            max="72"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            className="w-full h-1.5 mt-1.5 accent-blue-500 bg-blue-100 rounded-full appearance-none cursor-pointer"
          />
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsBold(!isBold)}
            className={`p-1.5 rounded ${
              isBold
                ? "bg-blue-500 text-white"
                : "text-blue-500 hover:bg-blue-50"
            }`}
            title="Bold"
          >
            <Bold size={16} />
          </button>
          <button
            type="button"
            onClick={() => setIsItalic(!isItalic)}
            className={`p-1.5 rounded ${
              isItalic
                ? "bg-blue-500 text-white"
                : "text-blue-500 hover:bg-blue-50"
            }`}
            title="Italic"
          >
            <Italic size={16} />
          </button>
          <button
            type="button"
            onClick={() => setIsUnderline(!isUnderline)}
            className={`p-1.5 rounded ${
              isUnderline
                ? "bg-blue-500 text-white"
                : "text-blue-500 hover:bg-blue-50"
            }`}
            title="Underline"
          >
            <Underline size={16} />
          </button>
          <button
            type="button"
            onClick={() => setHasOutline(!hasOutline)}
            className={`p-1.5 rounded ${
              hasOutline
                ? "bg-blue-500 text-white"
                : "text-blue-500 hover:bg-blue-50"
            }`}
            title="Outline"
          >
            <Square size={16} fill="none" />
          </button>
        </div>

        {hasOutline && (
          <div className="mt-3 flex items-center gap-2">
            <label className="text-blue-600 text-xs">Outline:</label>
            <div className="relative w-6 h-6 rounded overflow-hidden border border-blue-100">
              <input
                type="color"
                value={outlineColor}
                onChange={handleOutlineColorChange}
                className="absolute inset-0 w-full h-full cursor-pointer"
                aria-label="Outline color"
              />
            </div>
            <span className="text-blue-500 text-xs font-mono">
              {outlineColor}
            </span>
          </div>
        )}

        <div className="mt-4 border-t border-blue-100 pt-3 flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded text-xs font-medium transition-colors shadow-sm"
          >
            Add Text
          </button>
        </div>

        {newText && (
          <div className="mt-3 p-2 border border-blue-100 rounded-lg bg-blue-50 flex justify-center overflow-hidden max-h-36">
            <div className="overflow-auto w-full max-w-full text-center">
              <span
                className="text-blue-800 inline-block max-w-full"
                style={{
                  fontSize: `${fontSize}px`,
                  fontWeight: isBold ? "bold" : "normal",
                  fontStyle: isItalic ? "italic" : "normal",
                  textDecoration: isUnderline ? "underline" : "none",
                  textShadow: hasOutline
                    ? `
                    -1px -1px 0 ${outlineColor},
                    1px -1px 0 ${outlineColor},
                    -1px 1px 0 ${outlineColor},
                    1px 1px 0 ${outlineColor}
                  `
                    : "none",
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                {newText}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextInputPanel;
