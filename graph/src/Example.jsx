import React, { useState, useEffect  } from "react";
import ReactFlow, {
    MiniMap,
    Controls,
    useNodesState,
    useEdgesState,
    getOutgoers,
    Background,
    getConnectedEdges,
} from "reactflow";
//npm i dagre
//npm install dagre

import jsonData from './graphD3_valid.json';

import dagre from "dagre";
import "reactflow/dist/style.css";
// import "./index.css";

import Node from "./Node";

export const CareerPathTreeChart = () => {
    //const [initialNodes, setInitialNodes] = useState([]);
    //const [initialEdges, setInitialEdges] = useState([]);

    // let initialNodes;
    // let initialEdges;
    /*
    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const response = await fetch('./graphD3_valid.json'); 
                if (!response.ok) {
                    throw new Error("Error fetching data:", response.status);
                }
                //const jsonDataD = await response.json();
                const jsonDataD = jsonData;
                console.log("IMP:", jsonDataD);
                console.log(response)
                //setInitialNodes(jsonDataM.initialNodes);
                //setInitialEdges(jsonDataM.initialEdges);
                //---------------------
                //setInitialNodes(jsonDataD.nodes);
                //setInitialEdges(jsonDataD.links);

                initialNodes = jsonDataD.nodes;
                initialEdges = jsonDataD.links;

                console.log("D:", initialNodes);
                console.log("D", initialEdges);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, 
    []);
    */
    /*
    useEffect(() => {
       // console.log("UE:", initialNodesN);
        //console.log("UE", initialEdgesN);
    
        //////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////
        
    
    }, [initialNodes, initialEdges]);
    */

    //console.log("X: ", initialNodesN);
    //console.log("X: ", initialEdgesN);
    const jsonDataD = jsonData;
    console.log("IMP:", jsonDataD);

    let initialNodes;
    let initialEdges;

    initialNodes = jsonDataD.nodes;
    initialEdges = jsonDataD.links;

    

    initialNodes = jsonDataD.nodes;
    initialEdges = jsonDataD.links;

    console.log("D:", initialNodes);
    console.log("D", initialEdges);

    const position = { x: 0, y: 0 };
    /*
    const initialNodes= [
        { id: "1", data: { label: "one" }, position: { x: 0, y: 0 }, type: "objectNode", },
        { id: "2", data: { label: "two" }, position: { x: 0, y: 0 }, type: "objectNode", },
        { id: "5", data: { label: "five" }, position: { x: 0, y: 0 }, type: "objectNode", },
        { id: "3", data: { label: "three" }, position: { x: 0, y: 0 }, type: "objectNode", },
        { id: "4", data: { label: "four" }, position: { x: 0, y: 0 }, type: "objectNode", },]

    const initialEdges= [
        { id: "1->2", source: "1", target: "2" },
        { id: "4->5", source: "4", target: "5" },
        { id: "5->3", source: "5", target: "3" },
        /*{ id: "5->2", source: "5", target: "2" },*//*
        { id: "2->4", source: "2", target: "4" },
    ];*/

    /*
    const initialNodes = [
      {id: "0", data: { kind: "Endpoints", name: "argocd-redis-ha-haproxy", labels: [ ' app.kubernetes.io/name : argocd-redis-ha-haproxy '], detail: ' {"metadata":{"uid":"5d9a1041-d2db-407a-84e9-00cd0f1551e6","managedFields":[{"apiVersion":"v1","fieldsV1":{"f:metadata":{"f:annotations":{"f:endpoints.kubernetes.io/last-change-trigger-time":{},".":{}},"f:labels":{"f:app.kubernetes.io/name":{},"f:app.kubernetes.io/component":{},"f:app.kubernetes.io/part-of":{},".":{}}},"f:subsets":{}},"manager":"kube-controller-manager","time":"2023-11-15T21:48:28Z","operation":"Update","fieldsType":"FieldsV1"}],"resourceVersion":"950243891","creationTimestamp":"2023-02-06T16:31:39Z","annotations":{"endpoints.kubernetes.io/last-change-trigger-time":"2023-11-15T21:48:27Z"}},"apiVersion":"v1","subsets":[{"addresses":[{"nodeName":"10.134.76.38","targetRef":{"uid":"4f308dd9-3241-42bd-b47c-051e4ebef4ad","kind":"Pod","name":"argocd-redis-ha-haproxy-559d8d9d98-b729m","namespace":"argocd"},"ip":"172.30.137.39"},{"nodeName":"10.134.76.39","targetRef":{"uid":"cc4f6323-24bb-4b60-9a66-e02997e6b012","kind":"Pod","name":"argocd-redis-ha-haproxy-559d8d9d98-q99bg","namespace":"argocd"},"ip":"172.30.191.227"},{"nodeName":"10.134.76.36","targetRef":{"uid":"4651466c-d12a-4eb4-8946-fa4d348810be","kind":"Pod","name":"argocd-redis-ha-haproxy-559d8d9d98-hck87","namespace":"argocd"},"ip":"172.30.218.126"}],"ports":[{"protocol":"TCP","port":6379,"name":"tcp-haproxy"},{"protocol":"TCP","port":9101,"name":"http-exporter-port"}]}]} } '}, position, type: "objectNode"}
    , {id: "1", data: { kind: "ConfigMap", name: "config-trusted-cabundle", labels: [" config.openshift.io/inject-trusted-cabundle : true ", " app.kubernetes.io/part-of : tekton-pipelines " ], detail: '{"metadata":{"uid":"c2afb5ec-ccf8-462d-8c95-bd1109d216e9","managedFields":[{"apiVersion":"v1","fieldsV1":{"f:data":{"f:ca-bundle.crt":{}}},"manager":"cluster-network-operator/configmap_ca","time":"2023-11-16T22:25:15Z","operation":"Apply","fieldsType":"FieldsV1"},{"apiVersion":"v1","fieldsV1":{"f:data":{}},"manager":"cluster-network-operator","time":"2022-05-26T09:30:39Z","operation":"Update","fieldsType":"FieldsV1"},{"apiVersion":"v1","fieldsV1":{"f:metadata":{"f:labels":{"f:app.kubernetes.io/part-of":{},"f:config.openshift.io/inject-trusted-cabundle":{},".":{}},"f:ownerReferences":{"k:{\"uid\":\"1b4b11f4-fb8c-4c84-b871-7024b20ae7ae\"}":{},".":{}}}},"manager":"openshift-pipelines-operator","time":"2022-07-26T21:08:48Z","operation":"Update","fieldsType":"FieldsV1"}],"resourceVersion":"951622675","creationTimestamp":"2022-05-26T09:30:39Z","ownerReferences":[{"uid":"1b4b11f4-fb8c-4c84-b871-7024b20ae7ae","controller":true,"apiVersion":"operator.tekton.dev/v1alpha1","kind":"TektonInstallerSet","name":"rhosp-rbac-pnjlq","blockOwnerDeletion":true}]},"apiVersion":"v1","data":{"ca-bundle.crt":"# ACCVRAIZ1\n-----BEGIN CERTIFICATE-----\n..."}} '}, position, type: "objectNode"}
    , {id: "2", data: { kind: "container", name: "split-brain-fix", labels: [], detail: '"args":["/readonly-config/fix-split-brain.sh"],"image":"redis:7.0.11-alpine","imagePullPolicy":"IfNotPresent","terminationMessagePolicy":"File","terminationMessagePath":"/dev/termination-log","resources":{},"securityContext":{"capabilities":{"drop":["ALL"]},"seccompProfile":{"type":"RuntimeDefault"},"allowPrivilegeEscalation":false,"readOnlyRootFilesystem":true},"env":[{"name":"SENTINEL_ID_0","value":"3c0d9c0320bb34888c2df5757c718ce6ca992ce6"},{"name":"SENTINEL_ID_1","value":"40000915ab58c3fa8fd888fb8b24711944e6cbb4"},{"name":"SENTINEL_ID_2","value":"2bbec7894d954a8af3bb54d13eaec53cb024e2ca"}],"command":["sh"],"volumeMounts":[{"mountPath":"/readonly-config","name":"config","readOnly":true},{"mountPath":"/data","name":"data"}]} '}, position, type: "objectNode"}
    ]

    const initialEdges= [{id: "0->1", source: "0", target: "1"}
    , {id: "1->2", source: "1", target: "2"}
    , {id: "0->2", source: "0", target: "2"}]
    */

    /*
    ODZIALTO
    */


    
        


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

    //console.log("INI OLD: ", initialNodes);
    //console.log("INI OLD: ", initialEdges);

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        initialNodes,
        initialEdges
    );

    const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

    //console.log("OLD: ", nodes);
    //console.log("OLD: ", edges);



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
        console.log("Button clicked for node:", label)
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
                /*onNodeClick={nodeClick}*/
                attributionPosition="bottom-right"
            >
                <Controls />
                <MiniMap zoomable pannable/>
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
        </div>
    );
};
