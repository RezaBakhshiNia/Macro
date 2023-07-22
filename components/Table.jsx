import { useState, useEffect, Fragment } from "react";
import "./Table.css";
import EditModal from "./EditModal";
import Modal from "./Modal";

const Table = ({ somthigAdded }) => {
  const [mockData, setMockData] = useState(null);
  // const [selectedItems, setSelectedItems] = useState([]);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [itemIdForEdit, setitemIdForEdit] = useState(null);
  const [somthigEdited, setSomthigEdited] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://646e674b9c677e23218b9fdb.mockapi.io/api/v1/macros"
      );
      const data = await response.json();
      setMockData(data);
    };

    fetchData();
    setSomthigEdited(false);
  }, [somthigAdded, somthigEdited]);

  const handleDelete = async (id) => {
    // Remove the item from the mock API
    await fetch(
      `https://646e674b9c677e23218b9fdb.mockapi.io/api/v1/macros/${id}`,
      {
        method: "DELETE",
      }
    );

    // Remove the item from the table
    setMockData(mockData.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    setitemIdForEdit(id);
    console.log(id);
    console.log(mockData);

    setEditModalIsOpen(true);
  };

  return (
    <Fragment>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Macro type</th>
            <th>Subject</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {mockData &&
            mockData.map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    <input
                      type="checkbox"
                      id={item.id}
                      onChange={(e) => {
                        console.log(e.target.checked);
                      }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.macroType}</td>
                  <td>{item.subject}</td>
                  <td>
                    {new Date(item.createdAt).toLocaleDateString("en-US")}
                  </td>
                  <td>
                    {new Date(item.updatedAt).toLocaleDateString("en-US")}
                  </td>
                  <td>
                    <span
                      className="material-symbols-outlined edit"
                      onClick={() => handleEdit(item.id)}
                    >
                      edit
                    </span>
                    <span
                      className="material-symbols-outlined delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      delete
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {editModalIsOpen && (
        <Modal
          itemId={itemIdForEdit}
          data={mockData}
          setEditModalIsOpen={setEditModalIsOpen}
          setSomthigEdited={setSomthigEdited}
        />
      )}
    </Fragment>
  );
};

export default Table;
