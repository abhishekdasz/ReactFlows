import React from 'react'
import './FlowChart.css'

const FlowChartMaker = () => {
const shapeStylePreview = [
  {
    name: 'rectangle',
    style: {
      width: 60,
      height: 30,
      backgroundColor: '#DFF0D8',
      borderRadius: 4,
    },
  },
  {
    name: 'circle',
    style: {
      width: 40,
      height: 40,
      backgroundColor: '#D9EDF7',
      borderRadius: '50%',
    },
  },
  {
    name: 'diamond',
    style: {
      width: 50,
      height: 50,
      backgroundColor: '#FCF8E3',
      transform: 'rotate(45deg)',
    },
  },
];
  return (
    <div className='homepage'>
      <div className="sidebar-section">
        <h4>Shapes</h4>
        <div className='sidebar-container'>
        {shapeStylePreview.map((shape)=>(
          <div key={shape.name}>
            <div style={shape.style}> {shape.name} </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default FlowChartMaker