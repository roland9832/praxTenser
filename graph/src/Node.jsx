
import './Node.css';
import React, { memo, useState } from "react";
import { Handle, Position } from 'reactflow';



export default memo(({ data, isConnectable, isDraggable, onDetailClick, onHideClick, node }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="top-node">
      <Handle
        type="target"
        position="left"
        style={{ background: "yellow" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div className={`custom-node ${showDetails ? 'details-visible' : ''}`}>
        <div>{node.data.label}</div>
        <button onClick={() => { toggleDetails(); onDetailClick(node.data.label) }}>I</button>
        {showDetails && <div className="details-box">Additional information for {node.data.label} here...</div>}
      </div>
      <div className="hide-node">
        <button onClick={() => { onHideClick(node, node) }}>H</button>
      </div>
      <Handle
        type="source"
        position="right"
        id="a"
        style={{ background: "red" }}
        isConnectable={isConnectable}
      />
      
    </div>
  );
});
