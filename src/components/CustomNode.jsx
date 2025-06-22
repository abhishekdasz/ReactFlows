import React from 'react';
import { Handle, Position } from '@xyflow/react';

const CustomNode = ({ data }) => {
  return (
    <div style={{
      padding: 10,
      border: '2px solid #4a90e2',
      borderRadius: 10,
      background: '#f0f4ff',
      minWidth: 150,
      textAlign: 'center'
    }}>
      <Handle type="target" position={Position.Top} />
      <div style={{ fontWeight: 'bold' }}>{data.label}</div>
      <button style={{ marginTop: 10 }} onClick={data.onClick}>Click Me</button>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CustomNode;
