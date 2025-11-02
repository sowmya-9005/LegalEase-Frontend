import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RightsPage.css";

// ✅ Import Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPenToSquare,
  faTrash,
  faMagnifyingGlass,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

const RightsPage = () => {
  const [rights, setRights] = useState([]);
  const [filteredRights, setFilteredRights] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [editRight, setEditRight] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const token = localStorage.getItem("token");

  // Predefined static rights
  const predefinedRights = [
    {
      title: "Right to Education (6–14 years)",
      description:
        "Every child aged 6 to 14 has the right to free and compulsory education under the RTE Act.",
      category: "Education",
    },
    {
      title: "Midday Meal Scheme",
      description:
        "Government schools must provide free nutritious meals to improve child health and attendance.",
      category: "Education",
    },
    {
      title: "Protection from Domestic Violence",
      description:
        "Women are protected from physical, emotional, or economic abuse under the Domestic Violence Act, 2005.",
      category: "Women",
    },
    {
      title: "Right to Vote (18+)",
      description:
        "Every citizen above 18 years has the right to vote in elections, ensuring democratic participation.",
      category: "Fundamental Rights",
    },
    {
      title: "Right to Information (RTI)",
      description:
        "Citizens can request public information from government authorities to promote transparency.",
      category: "Government",
    },
    {
      title: "Consumer Protection Act",
      description:
        "Every consumer has the right to be protected from unfair trade and defective goods.",
      category: "Consumer",
    },
    {
      title: "Protection from Caste Discrimination",
      description:
        "Discrimination based on caste or religion is prohibited under Article 15 of the Constitution.",
      category: "Fundamental Rights",
    },
    {
      title: "Right to Property",
      description:
        "Citizens can acquire, hold, and dispose of property legally under Article 300A.",
      category: "Property",
    },
  ];

  // Fetch rights
  const fetchRights = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/rights");
      setRights([...predefinedRights, ...res.data]);
    } catch (err) {
      console.error(err.response?.data || err);
      setRights(predefinedRights);
    }
  };

  useEffect(() => {
    fetchRights();
    if (token) setIsLoggedIn(true);
  }, [token]);

  // Filter + Search
  useEffect(() => {
    const filtered = rights.filter((r) => {
      const matchCategory = category === "All" || r.category === category;
      const matchSearch =
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
    setFilteredRights(filtered);
  }, [rights, category, search]);

  // Add / Edit right
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.category)
      return alert("Please fill all fields");

    try {
      if (editRight) {
        await axios.put(
          `http://localhost:5000/api/rights/${editRight._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Right updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/rights", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Right added successfully!");
      }
      setFormVisible(false);
      setEditRight(null);
      setFormData({ title: "", description: "", category: "" });
      fetchRights();
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Failed to save right");
    }
  };

  // Delete right
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this right?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/rights/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Right deleted successfully!");
      fetchRights();
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Failed to delete right");
    }
  };

  const categories = [
    "All",
    "Education",
    "Women",
    "Consumer",
    "Fundamental Rights",
    "Government",
    "Property",
  ];

  return (
    <div className="rights-page">

      {/* ✅ INFO SECTION FIRST */}
<div className="rights-info">
  <h2>
    <i className="fas fa-balance-scale-right"></i> Explore Your Rights
  </h2>
  <p>
    <i className="fas fa-book-open"></i> Use the tools below to find important
    legal, educational, and fundamental rights that every citizen should know.
    You can browse by category or type keywords to quickly discover your rights
    and entitlements.
  </p>
</div>


      {/* ✅ TOOLBAR BELOW INFO */}
      <div className="toolbar below-info">
        <div className="search-bar">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          <input
            type="text"
            placeholder="Search rights..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        {isLoggedIn && (
          <button className="add-btn" onClick={() => setFormVisible(true)}>
            <FontAwesomeIcon icon={faPlus} /> Add Right
          </button>
        )}
      </div>

      {/* RIGHTS LIST */}
      <div className="rights-grid">
        {filteredRights.length > 0 ? (
          filteredRights.map((r, index) => (
            <div key={index} className="right-card">
              <h3>{r.title}</h3>
              <p className="category">
                <FontAwesomeIcon icon={faTag} /> {r.category}
              </p>
              <p>{r.description}</p>
              {isLoggedIn && r._id && (
                <div className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditRight(r);
                      setFormData(r);
                      setFormVisible(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} /> Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(r._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-rights">No rights found.</p>
        )}
      </div>

      {/* ADD/EDIT FORM */}
      {formVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editRight ? "Edit Right" : "Add New Right"}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
              <div className="modal-actions">
                <button type="submit" className="save-btn">
                  {editRight ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setFormVisible(false);
                    setEditRight(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightsPage;
