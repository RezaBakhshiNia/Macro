import { useState, useRef } from "react";
import "./Modal.css";

const Modal = ({
  setShowModal,
  setSomthingAdded,
  itemId,
  data,
  setEditModalIsOpen,
  setSomthigEdited,
}) => {
  const [newMacro, setNewMacro] = useState({
    name: "",
    macroType: "",
    subject: "",
  });
  console.log(itemId, data);

  const nameRef = useRef(data ? data.name : null); // #3854
  const macroTypeRef = useRef(data ? data.macroType : null);
  const subjectRef = useRef(data ? data.subject : null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMacro({ ...newMacro, [name]: value });
  };

  const handleSaveClick = () => {
    const timestamp = Date.now();
    if (itemId) {
      nameRef.current.value = data.find((obj) => obj.id === itemId).name;
      macroTypeRef.current.value = data.find(
        (obj) => obj.id === itemId
      ).macroType;
      subjectRef.current.value = data.find((obj) => obj.id === itemId).subject;

      console.log(
        nameRef.current.value,
        macroTypeRef.current.value,
        subjectRef.current.value
      );

      const newMacroData = {
        ...newMacro,
        createdAt: data.createdAt,
        updatedAt: timestamp,
      };

      fetch(
        `https://646e674b9c677e23218b9fdb.mockapi.io/api/v1/macros/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMacroData),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("New macro data saved:", data);
          setNewMacro({ name: "", macroType: "", subject: "" }); // Clear the input fields
          setSomthigEdited(true);
          nameRef.current.value = "";
          macroTypeRef.current.value = "";
          subjectRef.current.value = "";

          (() => setEditModalIsOpen(false))(); // IIFE function
        })
        .catch((error) => {
          console.error("Error saving new macro data:", error);
          setSomthingAdded(false);
        });
    } else {
      setSomthingAdded(true);

      const newMacroData = {
        ...newMacro,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      fetch("https://646e674b9c677e23218b9fdb.mockapi.io/api/v1/macros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMacroData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("New macro data saved:", data);
          setNewMacro({ name: "", macroType: "", subject: "" }); // Clear the input fields
          setSomthingAdded(false);
          (() => setShowModal(false))();
        })
        .catch((error) => {
          console.error("Error saving new macro data:", error);
          setSomthingAdded(false);
        });
    }
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>
          {itemId
            ? `Edit macro: ${data.find((obj) => obj.id === itemId).name}`
            : "Add New Macro"}
        </h2>

        <form>
          <div className="nameInput">
            <label htmlFor="name">Name:</label>
            <input
              className="inputs"
              type="text"
              id="name"
              name="name"
              value={newMacro.name}
              onChange={handleInputChange}
              ref={itemId && nameRef}
            />
          </div>
          <div className="macroTypeInput">
            <label htmlFor="macroType">Macro Type:</label>
            <input
              className="inputs"
              type="text"
              id="macroType"
              name="macroType"
              value={newMacro.macroType}
              onChange={handleInputChange}
              ref={itemId && macroTypeRef}
            />
          </div>
          <div className="subjectInput">
            <label htmlFor="subject">Subject:</label>
            <input
              className="inputs"
              type="text"
              id="subject"
              name="subject"
              value={newMacro.subject}
              onChange={handleInputChange}
              ref={itemId && subjectRef}
            />
          </div>

          <div className="modalButtons">
            <button
              className="saveModal"
              type="button"
              onClick={handleSaveClick}
            >
              Save
            </button>
            <button
              className="cancelModal"
              type="button"
              onClick={
                itemId
                  ? () => setEditModalIsOpen(false)
                  : () => setShowModal(false)
              }
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
