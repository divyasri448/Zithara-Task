import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/customers?page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}&search=${searchTerm}`
        );
        setCustomers(response.data.data);
        setTotalPages(Math.ceil(response.data.totalCount / 20));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [page, sortBy, sortOrder, searchTerm]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(field);
      setSortOrder("ASC");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={handleSearch}
        className="search-input"
      />
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort("customer_name")}>Customer Name</th>
            <th onClick={() => handleSort("age")}>Age</th>
            <th onClick={() => handleSort("phone")}>Phone</th>
            <th onClick={() => handleSort("location")}>Location</th>
            <th onClick={() => handleSort("created_at")}>Date</th>
            <th onClick={() => handleSort("created_at")}>Time</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6">Loading...</td>
            </tr>
          ) : (
            customers.map((customer) => (
              <tr key={customer.sno}>
                <td>{customer.customer_name}</td>
                <td>{customer.age}</td>
                <td>{customer.phone}</td>
                <td>{customer.location}</td>
                <td>{new Date(customer.created_at).toLocaleDateString()}</td>
                <td>{new Date(customer.created_at).toLocaleTimeString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          className="pagination-btn"
        >
          Previous
        </button>
        <button
          onClick={() =>
            setPage((prevPage) => Math.min(prevPage + 1, totalPages))
          }
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomerTable;
