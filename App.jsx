import React, { Fragment, useState } from "react";

import Table from "./components/Table";
import "./App.css";
import Modal from "./components/Modal";

function App() {
  const [showModal, setShowModal] = useState(false),
    [somthigAdded, setSomthingAdded] = useState(false);
  return (
    <Fragment>
      <header>
        <h1>Manage Macros</h1>
        <div className="handleActions">
          <button type="button" className="deleteMacros">
            <span class="material-symbols-outlined">add_circle</span>
            Delete
          </button>
          <button
            type="button"
            className="addMacros"
            onClick={() => setShowModal(true)}
          >
            <span class="material-symbols-outlined">do_not_disturb_on</span>
            Add New Macro
          </button>
        </div>
      </header>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          setSomthingAdded={setSomthingAdded}
        />
      )}
      <Table somthigAdded={somthigAdded}/>
    </Fragment>
  );
}

export default App;
