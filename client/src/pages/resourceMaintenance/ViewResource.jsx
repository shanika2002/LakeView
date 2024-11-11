import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import { useNavigate } from "react-router-dom";

const ResourcesTable = () => {
  const [resources, setResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const fetchResources = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/resource/resources"
      );
      setResources(response.data);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/resource/resources/${id}`);
      fetchResources();
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  };

  const filteredResources = resources.filter((resource) =>
    resource.resourceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <NavBar />
      <div
        style={{ backgroundColor: "#1b1f38", padding: "20px", minHeight: "80vh" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Search resources by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={searchBarStyle}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <table
            style={{
              width: "80%",
              borderCollapse: "collapse",
              backgroundColor: "#1b1f38",
              color: "#fff",
              textAlign: "left",
            }}
          >
            <thead>
              <tr>
                <th style={headerStyle}>Resource ID</th>
                <th style={headerStyle}>Resource Name</th>
                <th style={headerStyle}>Resource Type</th>
                <th style={headerStyle}>Available Quantity</th>
                <th style={headerStyle}>Created At</th>
                <th style={headerStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResources.length > 0 ? (
                filteredResources.map((resource) => (
                  <tr key={resource._id}>
                    <td style={cellStyle}>{resource.resourceId}</td>
                    <td style={cellStyle}>{resource.resourceName}</td>
                    <td style={cellStyle}>{resource.resourceType}</td>
                    <td style={cellStyle}>{resource.availableQuantity}</td>
                    <td style={cellStyle}>
                      {new Date(resource.createAt).toLocaleDateString()}
                    </td>
                    <td style={cellStyle}>
                      <button
                        style={buttonStyle}
                        onClick={() => navigate(`/resource/${resource._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        style={buttonStyle}
                        onClick={() => handleDelete(resource._id)}
                      >
                        Delete
                      </button>
                      <button
                        style={buttonStyle}
                        onClick={() => navigate(`/resource/${resource._id}`)}
                      >
                        Generate Report
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={cellStyle} colSpan="6">
                    No resources found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const headerStyle = {
  borderBottom: "1px solid #ddd",
  padding: "12px",
  backgroundColor: "#282c45",
  color: "#fff",
};

const cellStyle = {
  borderBottom: "1px solid #ddd",
  padding: "12px",
};

const buttonStyle = {
  backgroundColor: "#FF4C4C",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  marginRight: "5px",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const searchBarStyle = {
  padding: "10px",
  width: "80%",
  borderRadius: "5px",
  border: "1px solid #ccc",
  color: "#000",
};

export default ResourcesTable;
