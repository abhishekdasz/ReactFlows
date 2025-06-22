import React, { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from './CustomNode';

const nodeTypes = { customNode: CustomNode };

const initialNodes = [
  {
    id: '1',
    type: 'customNode',
    position: { x: 100, y: 100 },
    data: {
      label: 'Custom Node',
      onClick: () => alert('Button inside node clicked!')
    }
  },
  {
    id: '2',
    position: { x: 300, y: 250 },
    data: { label: 'Simple Node' }
  }
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true }
];

let nodeIdCounter = 3;

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const handleAddNode = () => {
    const newNode = {
      id: `${nodeIdCounter}`,
      type: 'customNode',
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 400 + 100
      },
      data: {
        label: `Node ${nodeIdCounter}`,
        onClick: () => alert(`Button clicked in Node ${nodeIdCounter}`)
      }
    };
    setNodes((nds) => [...nds, newNode]);
    nodeIdCounter++;
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <button
        onClick={handleAddNode}
        style={{
          position: 'absolute',
          zIndex: 10,
          top: 10,
          left: 10,
          padding: '8px 16px',
          background: '#4a90e2',
          color: 'white',
          border: 'none',
          borderRadius: 4
        }}
      >
        Add Node
      </button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Flow;
