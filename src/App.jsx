import React from 'react'
import Canvas from './components/Canvas'
import './App.css'

const App = () => {
  return (
    <div className="w-full min-h-screen bg-[#e1f1fd] flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <Canvas />
      </div>
    </div>
  )
}

export default App
