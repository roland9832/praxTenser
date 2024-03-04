import React, { useState, useEffect } from "react";
import ReactFlow, {
    MiniMap,
    Controls,
    useNodesState,
    useEdgesState,
    getOutgoers,
    Background,
    getConnectedEdges,
} from "reactflow";

import jsonData from './graphD3.json';
import DownloadButton from "./DownloadButton";
import dagre from "dagre";
import "reactflow/dist/style.css";
import Node from "./Node";

export const CareerPathTreeChart = () => {
    const jsonDataD = jsonData;
    let initialNodes;
    let initialEdges;
    initialNodes = jsonDataD.nodes;
    initialEdges = jsonDataD.links;
    const [selectedNodes, setSelectedNodes] = useState([]);
    const nodeTypes = {
        objectNode: (node) => <Node key={node.id} node={node} onDetailClick={onButtonClick} onHideClick={nodeClick} />
    };

    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    const nodeWidth = 600;
    const nodeHeight = 200;

    const getLayoutedElements = (nodes, edges, direction = "LR") => {
        const isHorizontal = direction === "LR";
        dagreGraph.setGraph({ rankdir: direction });

        nodes.forEach((node) => {
            dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
        });

        edges.forEach((edge) => {
            dagreGraph.setEdge(edge.source, edge.target);
        });

        dagre.layout(dagreGraph);

        nodes.forEach((node) => {
            const nodeWithPosition = dagreGraph.node(node.id);
            node.targetPosition = isHorizontal ? "left" : "top";
            node.sourcePosition = isHorizontal ? "right" : "bottom";
            node.position = {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            };

            return node;
        });

        return { nodes, edges };
    };
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        initialNodes,
        initialEdges
    );

    const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
    const [hidden, setHidden] = useState(true);
    const hide = (hidden, childEdgeID, childNodeID) => (nodeOrEdge) => {
        if (
            childEdgeID.includes(nodeOrEdge.id) ||
            childNodeID.includes(nodeOrEdge.id)
        )
            nodeOrEdge.hidden = hidden;
        return nodeOrEdge;
    };

    const checkTarget = (edge, id) => {
        let edges = edge.filter((ed) => {
            return ed.target !== id;
        });
        return edges;
    };

    let outgoers = [];
    let connectedEdges = [];
    let stack = [];

    const nodeClick = (some, node) => {
        let currentNodeID = node.id;
        stack.push(node);
        while (stack.length > 0) {
            let lastNOde = stack.pop();
            let childnode = getOutgoers(lastNOde, nodes, edges);
            let childedge = checkTarget(
                getConnectedEdges([lastNOde], edges),
                currentNodeID
            );
            childnode.map((goer, key) => {
                stack.push(goer);
                outgoers.push(goer);
            });
            childedge.map((edge, key) => {
                connectedEdges.push(edge);
            });
        }

        let childNodeID = outgoers.map((node) => {
            return node.id;
        });
        let childEdgeID = connectedEdges.map((edge) => {
            return edge.id;
        });

        setNodes((node) => node.map(hide(hidden, childEdgeID, childNodeID)));
        setEdges((edge) => edge.map(hide(hidden, childEdgeID, childNodeID)));
        setHidden(!hidden);
    };

    const onButtonClick = (label) => {
        console.log("Button clicked for node:", label)
    };

    const miniMapOverlayStyle = {
        backgroundColor: '#000000',
        borderRadius: '8px',
    };


    return (
        <div className="layoutflow" style={{ height: "100%" }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
                draggable={false}
                nodesConnectable={false}
                nodesDraggable={true}
                zoomOnScroll={true}
                zoomOnPinch={true}
                zoomOnDoubleClick={true}
                nodeTypes={nodeTypes}
                preventScrolling={false}
                panOnDrag={true}
                panOnScroll={true}
                attributionPosition="bottom-right"
            >
                <Controls />
                <MiniMap zoomable pannable
                    nodeColor={(node) => 'black'} 
                    nodeStrokeWidth={1}
                    nodeBorderRadius={2} 
                />
                <Background variant="dots" gap={12} size={1} />
                <DownloadButton />
            </ReactFlow>
        </div>
    );
};
