import React, { useState, useEffect  } from "react";
import ReactFlow, {
    useNodesState,
    useEdgesState,
    getOutgoers,
    Background,
    getConnectedEdges,
} from "reactflow";
//npm i dagre
//npm install dagre

import fs from 'fs';

import dagre from "dagre";
import "reactflow/dist/style.css";
// import "./index.css";

import Node from "./Node";

export const CareerPathTreeChart = () => {
    const [initialNodesN, setInitialNodes] = useState([]);
    const [initialEdgesN, setInitialEdges] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://github.com/roland9832/praxTenser/blob/main/graph/src/test.json'); 
                if (!response.ok) {
                    throw new Error(`Error fetching data: ${response.status}`);
                }
                const jsonData = await response.json();
                setInitialNodes(jsonData.initialNodes);
                setInitialEdges(jsonData.initialEdges);

                console.log(initialNodesN);
                console.log(initialEdgesN);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const position = { x: 0, y: 0 };
    const initialNodes = [
        { id: "1", data: { label: "one" }, position, type: "objectNode", },
        { id: "2", data: { label: "two" }, position, type: "objectNode", },
        { id: "5", data: { label: "five" }, position, type: "objectNode", },
        { id: "3", data: { label: "three" }, position, type: "objectNode", },
        { id: "4", data: { label: "four" }, position, type: "objectNode", },]

    const initialEdges = [
        { id: "1->2", source: "1", target: "2" },
        { id: "4->5", source: "4", target: "5" },
        { id: "5->3", source: "5", target: "3" },
        /*{ id: "5->2", source: "5", target: "2" },*/
        { id: "2->4", source: "2", target: "4" },
    ];

    const nodeTypes = {
        objectNode: (node) => <Node key={node.id} node={node} onDetailClick={onButtonClick} onHideClick={nodeClick} />
    };

    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    const nodeWidth = 172;
    const nodeHeight = 76;

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

            // We are shifting the dagre node position (anchor=center center) to the top left
            // so it matches the React Flow node anchor point (top left).
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
        // Handle button click for the specific node (label)
        // You can update state or perform other actions here
        console.log(`Button clicked for node: ${label}`);
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
                zoomOnScroll={false}
                zoomOnPinch={true}
                zoomOnDoubleClick={false}
                nodeTypes={nodeTypes}
                preventScrolling={false}
                panOnDrag={false}
                panOnScroll={false}
                /*onNodeClick={nodeClick}*/
                attributionPosition="bottom-right"
            >

                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
        </div>
    );
};
