import React from 'react'
import Flow from './components/Flow'
import { ReactFlowProvider } from '@xyflow/react';
import ShapeFlow from './components/ShapeFlow';
import FlowChartMaker from './components/FlowChartMaker';

const App = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlowProvider>
        {/* <Flow /> */}
        {/* <ShapeFlow/> */}
        <FlowChartMaker/>
      </ReactFlowProvider>
    </div>
  )
}

export default App