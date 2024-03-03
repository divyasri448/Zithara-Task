import React from "react";
import CustomerTable from "./CustomerTable";

const App = () => {
  return (
    <div className="container">
      <div className="card">
        <h1>Customer List</h1>
        <CustomerTable />
      </div>
    </div>
  );
};

export default App;
