import { useState } from "react";


export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);



  function transition(newMode, replace) {
    setMode(newMode);
    setHistory(prev =>
      replace
        ? [...prev.slice(0, prev.length - 1), newMode]
        :
        [...prev, newMode]
    );
  };

  function back() {
    const tempHistory = [...history];
    console.log("tempHistory",tempHistory);
    tempHistory.pop();
    setHistory(tempHistory);
    const newMode = tempHistory.length > 1
      ? tempHistory[tempHistory.length - 1] : initial;
    console.log("newMode",newMode);
    setMode(newMode);
  };
    
  return { mode, transition, back };
};
