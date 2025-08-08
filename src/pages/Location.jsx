import { useState, useEffect } from "react";
import axios from "../api/axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


const createLocation = ({form, setForm, createLocation}) => {
    const [errors, setErrors] = useState({});

    const handleInputCange = (e) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
}

const handleSubmit = (e) => {
    e.preventDefault();
    createLocation();
};

return (
    <div className="card-mb-4">
        <div className="card-heard">
            <h2>Create Location</h2>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="row">
            <div className="col-md-12">
              <div className="mb-4">
                    <input type="text"
                        name="city"
                        className="form-control"
                        placeholder="Enter the city"
                        value={form.city}
                        onChange={handleInputCange}
                    />
                </div>  

                <div className="mb-4">
                    <input type="text"
                        name="address"
                        className="form-control"
                        placeholder="Enter the address"
                        value={form.address}
                        onChange={handleInputCange}
                    />
                </div>
                <div className="mb-4">
                    <button type="submit" className="btn btn-primary">
                            Add the Location
                    </button>
                </div>
            </div>
        </div>
        </form>
    </div>
)
}

