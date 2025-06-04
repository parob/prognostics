
import React, { useState, useCallback, useRef } from 'react';
import { Plus, Save, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ReactFlow,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Connection,
  Node,
  NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import SensorInputNode from '@/components/workflow/SensorInputNode';
import ConditionNode from '@/components/workflow/ConditionNode';
import AlertNode from '@/components/workflow/AlertNode';
import FunctionNode from '@/components/workflow/FunctionNode';
import NodeConfigPanel from '@/components/workflow/NodeConfigPanel';

const nodeTypes: NodeTypes = {
  sensorInput: SensorInputNode,
  condition: ConditionNode,
  alert: AlertNode,
  function: FunctionNode,
};

const initialNodes: Node[] = [];
const initialEdges = [];

const WorkflowCreate = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [nodeIdCounter, setNodeIdCounter] = useState(1);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }

      if (!reactFlowInstance || !reactFlowWrapper.current) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node = {
        id: `${type}_${nodeIdCounter}`,
        type,
        position,
        data: {
          label: getDefaultLabel(type),
        },
      };

      setNodes((nds) => nds.concat(newNode));
      setNodeIdCounter((prev) => prev + 1);
    },
    [reactFlowInstance, nodeIdCounter, setNodes]
  );

  const getDefaultLabel = (type: string) => {
    switch (type) {
      case 'sensorInput':
        return 'Sensor Input';
      case 'condition':
        return 'Condition Check';
      case 'alert':
        return 'Send Alert';
      case 'function':
        return 'Execute Function';
      default:
        return 'Node';
    }
  };

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const updateNodeData = (nodeId: string, newData: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
      )
    );
  };

  return (
    <div className="h-screen bg-slate-50">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-2">
                <Plus className="h-8 w-8" />
                <span>Create Workflow</span>
              </h1>
              <p className="text-slate-600">Build drag-and-drop workflows to automate sensor monitoring and alerting</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Test Workflow
              </Button>
              <Button size="sm">
                <Save className="h-4 w-4 mr-1" />
                Save Workflow
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* Node Palette */}
            <ResizablePanel defaultSize={20} minSize={15}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Node Palette</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div
                      className="bg-blue-100 border border-blue-300 rounded p-3 cursor-pointer hover:bg-blue-200 transition-colors"
                      draggable
                      onDragStart={(event) => onDragStart(event, 'sensorInput')}
                    >
                      <div className="text-sm font-medium">Sensor Input</div>
                      <div className="text-xs text-slate-600">Read sensor data</div>
                    </div>
                    <div
                      className="bg-green-100 border border-green-300 rounded p-3 cursor-pointer hover:bg-green-200 transition-colors"
                      draggable
                      onDragStart={(event) => onDragStart(event, 'condition')}
                    >
                      <div className="text-sm font-medium">Condition</div>
                      <div className="text-xs text-slate-600">Check conditions</div>
                    </div>
                    <div
                      className="bg-orange-100 border border-orange-300 rounded p-3 cursor-pointer hover:bg-orange-200 transition-colors"
                      draggable
                      onDragStart={(event) => onDragStart(event, 'alert')}
                    >
                      <div className="text-sm font-medium">Alert</div>
                      <div className="text-xs text-slate-600">Send notifications</div>
                    </div>
                    <div
                      className="bg-purple-100 border border-purple-300 rounded p-3 cursor-pointer hover:bg-purple-200 transition-colors"
                      draggable
                      onDragStart={(event) => onDragStart(event, 'function')}
                    >
                      <div className="text-sm font-medium">Function</div>
                      <div className="text-xs text-slate-600">Execute function</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Canvas */}
            <ResizablePanel defaultSize={60}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Workflow Canvas</CardTitle>
                </CardHeader>
                <CardContent className="p-0 h-[calc(100%-80px)]">
                  <div className="h-full" ref={reactFlowWrapper}>
                    <ReactFlow
                      nodes={nodes}
                      edges={edges}
                      onNodesChange={onNodesChange}
                      onEdgesChange={onEdgesChange}
                      onConnect={onConnect}
                      onInit={setReactFlowInstance}
                      onDrop={onDrop}
                      onDragOver={onDragOver}
                      onNodeClick={onNodeClick}
                      nodeTypes={nodeTypes}
                      fitView
                    >
                      <Controls />
                      <MiniMap />
                      <Background variant="dots" gap={12} size={1} />
                    </ReactFlow>
                  </div>
                </CardContent>
              </Card>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Configuration Panel */}
            <ResizablePanel defaultSize={20} minSize={15}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Configuration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedNode ? (
                    <NodeConfigPanel
                      node={selectedNode}
                      onUpdateNode={updateNodeData}
                    />
                  ) : (
                    <div className="text-center text-slate-500 mt-8">
                      <Settings className="h-12 w-12 mx-auto mb-3 opacity-30" />
                      <p>Select a node to configure its properties</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
};

export default WorkflowCreate;
