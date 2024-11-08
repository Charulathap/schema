import React, { useState } from "react";
import "./App.css";

function App() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [schemaList, setSchemaList] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState("");

  // Schema options for dropdown (Group Traits and User Traits categories)
  const schemaOptions = [
    { label: "First Name", value: "first_name", type: "user" },
    { label: "Last Name", value: "last_name", type: "user" },
    { label: "Gender", value: "gender", type: "user" },
    { label: "Age", value: "age", type: "user" },
    { label: "Account Name", value: "account_name", type: "group" },
    { label: "City", value: "city", type: "group" },
    { label: "State", value: "state", type: "group" },
  ];

  const availableOptions = schemaOptions.filter(
    (option) => !schemaList.some((schema) => schema.value === option.value)
  );

  const handleAddSchema = () => {
    if (selectedSchema) {
      const schema = schemaOptions.find(
        (option) => option.value === selectedSchema
      );
      setSchemaList([...schemaList, schema]);
      setSelectedSchema("");
    }
  };

  const handleSubmit = () => {
    const data = {
      segment_name: segmentName,
      schema: schemaList.map((option) => ({ [option.value]: option.label })),
    };

    fetch("http://localhost:3001/save-segment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Segment saved:", data);
        setSegmentName("");
        setSchemaList([]);
        setPopupVisible(false);
      })
      .catch((error) => console.error("Error saving segment:", error));
  };

  return (
    <div className="App">
      <div className="button-container">
        <button
          onClick={() => setPopupVisible(true)}
          className="save-segment-button"
        >
          Save segment
        </button>
      </div>

      {isPopupVisible && (
        <div className="popup">
          <h2 className="savingHeading">Saving Segment</h2>
          <div className="popup-content">
            <label>
              Enter the Name of the Segment
              <input
                type="text"
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
                placeholder="Name of the segment"
              />
            </label>
            <div>
              <p>
                To save your segment, you need to add the schemas to build the
                query
              </p>
              <br />
            </div>

            <div className="traits-section">
              <div className="user-traits-section">
                <div className="bullet green-bullet"></div>
                <span className="trait-text">-User Traits</span>
              </div>
              <div className="group-traits-section">
                <div className="bullet red-bullet"></div>
                <span className="trait-text">-Group Traits</span>
              </div>
            </div>
            {/* Blue box for selected schemas */}
            <div className="blue-box">
              {schemaList.map((schema, index) => (
                <div key={index} className="schema-item">
                  <div
                    className={`bullet ${
                      schema.type === "group" ? "red-bullet" : "green-bullet"
                    }`}
                  ></div>
                  <select
                    value={schema.value}
                    onChange={(e) => {
                      const newSchemaList = [...schemaList];
                      newSchemaList[index] = schemaOptions.find(
                        (option) => option.value === e.target.value
                      );
                      setSchemaList(newSchemaList);
                    }}
                  >
                    {schemaOptions
                      .filter(
                        (option) =>
                          !schemaList.some(
                            (s) =>
                              s.value === option.value &&
                              s.value !== schema.value
                          )
                      )
                      .map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                  </select>

                  <button
                    className="remove-schema-button"
                    onClick={() => {
                      const newSchemaList = schemaList.filter(
                        (_, idx) => idx !== index
                      );
                      setSchemaList(newSchemaList);
                    }}
                  >
                    <span className="remove-icon">–</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="schema-dropdown">
              <div className="bullet white-bullet"></div>{" "}
              <label>
                <select
                  value={selectedSchema}
                  onChange={(e) => setSelectedSchema(e.target.value)}
                >
                  <option value="">Add schema to segment</option>
                  {availableOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <button className="link-style" onClick={handleAddSchema}>
              + Add new schema
            </button>

            <div className="button-group">
              <button className="save-button" onClick={handleSubmit}>
                Save Segment
              </button>
              <button
                className="cancel-button"
                onClick={() => setPopupVisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
