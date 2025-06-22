import React from 'react'
import Flow from './components/Flow'
import { ReactFlowProvider } from '@xyflow/react';

const App = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  )
}

export default App