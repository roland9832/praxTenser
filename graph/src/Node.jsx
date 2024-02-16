
import './Node.css';
import React, { memo, useState, useRef } from "react";
import { Handle, Position } from 'reactflow';



export default memo(({ data, isConnectable, isDraggable, onDetailClick, onHideClick, node }) => {
  const [showDetails, setShowDetails] = useState(false);


  const contentRef = useRef(null);

  const handleCopy = () => {
    const textToCopy = contentRef.current.innerText;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert('Content copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy: ', error);
      });
  };


  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  /*
    (function () {
      var element = document.getElementById("json-text");
      var obj = JSON.parse(element.innerText);
      element.innerHTML = JSON.stringify(obj, undefined, 2);
    })();
  */


  return (
    <div className="top-node">
      <Handle
        type="target"
        position="left"
        style={{ background: "black" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />




      <div className={`custom-node ${showDetails ? 'details-visible' : ''}`}>
        <div>{node.id}</div>
        <div>{node.data.kind}</div>
        <div>{node.data.name}</div>

        <button className="info" onClick={() => { toggleDetails(); onDetailClick(node.data.kind) }}>i</button>
        {showDetails && 
        <div className="details-box"> 
          <button className="copyButton" onClick={handleCopy}>Copy</button>
            <div ref={contentRef}> LABELS: 
              <ul>{node.data.labels.map((item, index) => (
                <li key={index}>{item}</li>))}
              </ul>
             DETAILS: <div className="details">{node.data.detail} </div>
            </div>
        </div>
        }

      </div>



      <button className="hide" onClick={() => { onHideClick(node, node) }}>Hide</button>


      <Handle
        type="source"
        position="right"
        id="a"
        style={{ background: "black" }}
        isConnectable={isConnectable}
      />

    </div>
  );
});
