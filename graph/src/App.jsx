import React, { useCallback } from 'react';
import { CareerPathTreeChart } from "./Example";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import data from './graphD3.json';

let initialNodes;
let initialEdges;

initialNodes = data.nodes;
initialEdges = data.links;

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
 
  return (
    
    <div style={{ width: '100vw', height: '100vh' }}>
      <CareerPathTreeChart /> 
      {}
    </div>
  );
}