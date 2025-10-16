import React from "react";
import ChatBox from "./ChatBox";

export default function App() {
  return (
    <div style={{fontFamily: 'Inter, sans-serif', padding: 24, display: 'flex', justifyContent: 'center'}}>
      <div style={{width: 720}}>
        <h1 style={{textAlign: 'center'}}>Nour-AI — UAE Cultural Companion</h1>
        <ChatBox />
      </div>
    </div>
  );
}
