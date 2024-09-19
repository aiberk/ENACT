import React, { useState, useEffect } from "react";
import useDebounce from "./hooks/useDebounce";

function CategorySelector({
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  hits,
  resetFilters
}) {
  const [inputValue, setInputValue] = useState(searchTerm);
  const debouncedSearchTerm = useDebounce(inputValue, 250); // Debounce the input by 250ms

  useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchTerm]);

  const categories = {
    Years: [
      2009, 1830, 2011, 2013, 2015, 2017, 2021, 2012, 2022, 2023, 2018, 2014,
      2016, 2010, 2024, 2019, 2020, 2004
    ],
    State: ["MA", "CA", "NY", "TX", "FL", "IL", "PA"],
    Topics: [
      "Health",
      "Education",
      "Environment",
      "Economy",
      "Social Justice",
      "Other"
    ],
    contentTypes: [
      "Next Steps",
      "Personal Reflection",
      "Online",
      "Flyer",
      "Course Planning",
      "ENACT Research",
      "Elevator Speech",
      "Op-Ed",
      "Assignment Guidelines",
      "Advocacy Video",
      "Student Advice",
      "Journal",
      "Letter to Legislator",
      "Research Report",
      "Portfolio",
      "empty",
      "News and Articles",
      "Syllabus",
      "Presentations",
      "Script"
    ],
    mediaTypes: ["video", "document", "photo", "PowerPoint", "empty"],
    institutions: [
      "Arts & Democracy Project",
      "The University of Maine",
      "Boise State University",
      "Randolph-macon",
      "The Pennsylvania State University",
      "University of New Hampshire",
      "Seattle University",
      "Brandeis University",
      "Delaware State University",
      "Bennington College",
      "Randolph Macon College",
      "Emory University",
      "FrameWorks Institute",
      "Penn State University",
      "Florida Agricultural and Mechanical University"
    ]
  };

  // Calculate the number of selected filters
  const selectedFilterCount = Object.values(selectedCategory).filter(
    (value) => value
  ).length;

  function renderInput(group, items) {
    switch (group) {
      case "State":
      case "Years":
      case "Topics":
      case "contentTypes":
      case "mediaTypes":
      case "institutions":
        // Using dropdowns for "State" and "Years"
        return (
          <select
            value={selectedCategory[group] || ""}
            onChange={(e) =>
              setSelectedCategory({
                ...selectedCategory,
                [group]: e.target.value
              })
            }
            style={{ marginBottom: "20px", padding: "5px", width: "100%" }}>
            <option value="">Select {group}</option>{" "}
            {/* Default 'not selected' state */}
            {items.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        );
      case "Topics":
      case "contentTypes":
      case "mediaTypes":
        // Using radio buttons for "Topics", "contentTypes", and "mediaTypes"
        return (
          <>
            <label
              style={{ display: "block", marginTop: "5px", listStyle: "none" }}>
              <input
                type="radio"
                name={group}
                value=""
                checked={!selectedCategory[group]}
                onChange={() =>
                  setSelectedCategory({
                    ...selectedCategory,
                    [group]: ""
                  })
                }
                style={{ marginRight: "5px" }}
              />
              None {/* Default 'not selected' radio option */}
            </label>
            {items.map((categoryName, index) => (
              <label
                key={index}
                style={{
                  display: "block",
                  marginTop: "5px",
                  listStyle: "none"
                }}>
                <input
                  type="radio"
                  name={group}
                  value={categoryName}
                  checked={selectedCategory[group] === categoryName}
                  onChange={() =>
                    setSelectedCategory({
                      ...selectedCategory,
                      [group]: categoryName
                    })
                  }
                  style={{ marginRight: "5px" }}
                />
                {categoryName}
              </label>
            ))}
          </>
        );
      default:
        return null; // Default case for unexpected categories
    }
  }

  return (
    <div
      style={{
        marginTop: "-20px",
        width: "200px",
        height: "100%",
        maxHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
        listStyle: "none",
        position: "sticky",
        top: 80,
        zIndex: 1,
        overflowY: "auto",
        border: "0.1px solid lightgrey"
      }}>
      {/* Conditionally render the reset button if any filters are selected */}
      {/* selectedFilterCount > 0 */}
      {selectedFilterCount > 0  && (
        <button
          onClick={resetFilters}
          style={{
            borderRadius: "10px",
            border: "0.5px solid whitesmoke",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
            color: "white",
            backgroundColor: "#0053A4",
  
          }}>
          <span
            style={{
              backgroundColor: "#3584d2",
              borderRadius: "12px",
              padding: "1px 5px",
              fontSize: "0.7rem"
            }}>
            {selectedFilterCount}
          </span>
          Clear Filters
          <span style={{ color: "white !important", fontWeight: "bold" }}>
            ✖
          </span>{" "}
          {/* Red 'x' */}
        </button>
      )}

      {Object.entries(categories).map(([group, items]) => (
        <div key={group}>{renderInput(group, items)}</div>
      ))}
    </div>
  );
}

export default CategorySelector;
