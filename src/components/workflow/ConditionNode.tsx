
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { GitBranch } from 'lucide-react';

const ConditionNode: React.FC<NodeProps> = ({ data, selected }) => {
  return (
    <div className={`px-4 py-2 shadow-md rounded-md bg-green-50 border-2 ${selected ? 'border-green-500' : 'border-green-200'}`}>
      <div className="flex items-center space-x-2">
        <GitBranch className="h-4 w-4 text-green-600" />
        <div className="text-sm font-medium text-green-800">{data.label}</div>
      </div>
      {data.condition && (
        <div className="text-xs text-green-600 mt-1">{data.condition}</div>
      )}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-green-400 border-2 border-green-600"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-green-400 border-2 border-green-600"
      />
    </div>
  );
};

export default ConditionNode;
