import { addEdge, applyEdgeChanges, applyNodeChanges, Background, Controls, ReactFlow } from '@xyflow/react';
import React, { useCallback, useState } from 'react'
import '@xyflow/react/dist/style.css';

const initialNodes = [
    {
        id: '1',
        type: 'input',
        data: {label:"node1"},
        position: {x:250, y:25},
    },
    {
        id: '2',
        position: {x:100, y:125},
        data: {label:"node2"}
    },
        {
        id: '3',
        position: {x:500, y:125},
        data: {label:"node3"}
    },
        {
        id: '4',
        type: 'output',
        position: {x:200, y:325},
        data: {label:"node4"}
    },
]
const initialEdges = [
    {id:'e1', source: '1', target: '2'},
    {id:'e2', source: '2', target: '3'},
    {id:'e3', source: '3', target: '4'},
]
const Flow = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );
  return (
    <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        fitView
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
    >
        <Background/>
        <Controls />
    </ReactFlow>
  )
}

export default Flow