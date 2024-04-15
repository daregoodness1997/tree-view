import { TreeView } from "./components";

import "./App.css";
import { treeData } from "./constants";

function App() {
  return (
    <>
      <h1>Custom TreeView</h1>
      <TreeView treeData={treeData} />
    </>
  );
}

export default App;
