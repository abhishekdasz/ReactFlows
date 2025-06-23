import React, { useCallback } from 'react';
import { ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
  Panel,
  MarkerType,
  Handle,
  Position,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

let id = 0;
const getId = () => `node_${id++}`;

// 🧩 Custom shape-based node component
const ShapeNode = ({ data }) => {
  const shapeStyles = {
    rectangle: {
      width: 100,
      height: 50,
      backgroundColor: '#DFF0D8',
      borderRadius: 6,
    },
    circle: {
      width: 70,
      height: 70,
      backgroundColor: '#D9EDF7',
      borderRadius: '50%',
    },
    diamond: {
      width: 80,
      height: 80,
      backgroundColor: '#FCF8E3',
      transform: 'rotate(45deg)',
    },
  };

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div
        style={{
          ...shapeStyles[data.shape],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid #999',
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        {data.shape !== 'diamond' ? data.label : ''}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

const nodeTypes = {
  shapeNode: ShapeNode,
};

const ShapeFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds)
      ),
    []
  );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const shape = event.dataTransfer.getData('shape');
      const reactFlowBounds = event.target.getBoundingClientRect();

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode = {
        id: getId(),
        type: 'shapeNode',
        position,
        data: { label: shape, shape },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const shapeStylePreview = {
    rectangle: {
      width: 60,
      height: 30,
      backgroundColor: '#DFF0D8',
      borderRadius: 4,
    },
    circle: {
      width: 40,
      height: 40,
      backgroundColor: '#D9EDF7',
      borderRadius: '50%',
    },
    diamond: {
      width: 50,
      height: 50,
      backgroundColor: '#FCF8E3',
      transform: 'rotate(45deg)',
    },
  };

  return (
    <ReactFlowProvider>
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* 🧭 Left sidebar */}
        <div
          style={{
            width: 160,
            padding: 10,
            borderRight: '1px solid #ccc',
            background: '#f9f9f9',
          }}
        >
          <h4>Shapes</h4>
          {['rectangle', 'circle', 'diamond'].map((shape) => (
            <div
              key={shape}
              draggable
              onDragStart={(e) => e.dataTransfer.setData('shape', shape)}
              style={{
                margin: '16px auto',
                cursor: 'grab',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  ...shapeStylePreview[shape],
                  border: '1px solid #888',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
              <span style={{ fontSize: 12, marginTop: 4 }}>{shape}</span>
            </div>
          ))}
        </div>

        {/* 🎨 Canvas area */}
        <div style={{ flex: 1 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Background />
            <Controls />
            <MiniMap />
            <Panel position="top-right">Drag shapes to canvas</Panel>
          </ReactFlow>
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default ShapeFlow;
