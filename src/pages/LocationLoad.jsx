import { useState, useEffect } from "react";
import axios from "../api/axios";

const LocationLoad = ({ onSelect, selectedId, error }) => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const response = await axios.get("/location/getAll");
        setLocations(Array.isArray(response.data?.location) ? response.data.location : []);
      } catch (err) {
        setFetchError("Failed to load locations");
        console.error("Error fetching locations:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleChange = (e) => {
    const locationId = e.target.value;
    onSelect && onSelect(locationId);
  };

  return (
    <div className="form-group">
      <label>Select Location:</label>
      <select
        className={`form-control ${error ? "is-invalid" : ""}`}
        value={selectedId}
        onChange={handleChange}
        disabled={isLoading}
      >
        <option value="">--- Select Location ---</option>
        {locations.map((location) => (
          <option key={location._id} value={location._id}>
            {location.city}
          </option>
        ))}
      </select>
      {isLoading && <div className="loading">Loading locations...</div>}
      {fetchError && <div className="text-danger">{fetchError}</div>}
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default LocationLoad;
