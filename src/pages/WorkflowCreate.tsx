
import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Plus, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SensorInputNode from '@/components/workflow/SensorInputNode';
import ConditionNode from '@/components/workflow/ConditionNode';
import AlertNode from '@/components/workflow/AlertNode';
import FunctionNode from '@/components/workflow/FunctionNode';
import NodeConfigPanel from '@/components/workflow/NodeConfigPanel';

const nodeTypes = {
  sensorInput: SensorInputNode,
  condition: ConditionNode,
  alert: AlertNode,
  function: FunctionNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const WorkflowCreate = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [nodeId, setNodeId] = useState(1);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const onUpdateNode = useCallback((nodeId: string, data: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data } : node
      )
    );
  }, [setNodes]);

  const addNode = (type: string) => {
    const newNode: Node = {
      id: `${type}-${nodeId}`,
      type,
      position: { x: Math.random() * 300, y: Math.random() * 300 },
      data: { label: `${type} ${nodeId}` },
    };
    setNodes((nds) => nds.concat(newNode));
    setNodeId((id) => id + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex h-screen">
        {/* Node Palette */}
        <div className="w-64 bg-white border-r border-slate-200 p-4">
          <h2 className="text-lg font-semibold mb-4">Node Palette</h2>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => addNode('sensorInput')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Sensor Input
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => addNode('condition')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Condition
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => addNode('function')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Function
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => addNode('alert')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Alert
            </Button>
          </div>
          
          <div className="mt-8">
            <Button className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Workflow
            </Button>
          </div>
        </div>

        {/* Flow Canvas */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>

        {/* Configuration Panel */}
        <div className="w-80 bg-white border-l border-slate-200 p-4">
          <NodeConfigPanel 
            selectedNode={selectedNode} 
            onUpdateNode={onUpdateNode}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkflowCreate;
