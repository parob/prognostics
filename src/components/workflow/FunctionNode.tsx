
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Code } from 'lucide-react';

const FunctionNode: React.FC<NodeProps> = ({ data, selected }) => {
  return (
    <div className={`px-4 py-2 shadow-md rounded-md bg-purple-50 border-2 ${selected ? 'border-purple-500' : 'border-purple-200'}`}>
      <div className="flex items-center space-x-2">
        <Code className="h-4 w-4 text-purple-600" />
        <div className="text-sm font-medium text-purple-800">{data.label}</div>
      </div>
      {data.functionName && (
        <div className="text-xs text-purple-600 mt-1">{data.functionName}</div>
      )}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-purple-400 border-2 border-purple-600"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-purple-400 border-2 border-purple-600"
      />
    </div>
  );
};

export default FunctionNode;
