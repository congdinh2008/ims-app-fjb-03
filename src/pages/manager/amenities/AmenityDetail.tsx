import { faEraser, faRotate, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";

function AmenityDetail({ item }: { item: any }) {
    const [name, setName] = useState<string>(item ? item.name : '');
    const [price, setPrice] = useState<number>(item ? item.price : 0);
    const [nameError, setNameError] = useState<string>('');
    const [priceError, setPriceError] = useState<string>('');

    const validateForm = (data: any) => {
        let isValid = true;
        if (data.name === '') {
            setNameError('Name is required');
            isValid = false;
        }

        if (data.name.length < 2 || data.name.length > 50) {
            setNameError('Name must be between 2 and 50 characters');
            isValid = false;
        }

        if (data.price < 0) {
            setPriceError('Price is required');
            isValid = false;
        }

        return isValid;
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const apiUrl = 'http://localhost:8080/api/v1/hotel-services';
        const data = { name, price };
        if (!validateForm(data)) {
            return;
        }

        if (item) {
            Object.assign(data, { id: item.id });
            const response = await axios.put(`${apiUrl}/${item.id}`, data);
            if (response.data) {
                alert("Amenity updated successfully");
            } else {
                alert("Failed to update amenity");
            }
        } else {
            const response = await axios.post(apiUrl, data);
            if (response.data) {
                alert("Amenity created successfully");
            } else {
                alert("Failed to create amenity");
            }
        }
    };
    return (
        <section>
            {/* Search */}
            <div className="card border border-slate-300 rounded-md">
                <div className="card-header p-3">
                    <h1 className="text-2xl font-bold">Create Amenity</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="card-body border-y border-slate-300 p-3 flex flex-wrap">
                        <div className="form-group mb-3 w-1/2 p-2">
                            <label htmlFor="name" className="block mb-2">Name</label>
                            <input type="text" name="name" id="name" value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 border border-slate-300 rounded-md" />
                            {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
                        </div>
                        <div className="form-group mb-3 w-1/2 p-2">
                            <label htmlFor="price" className="block mb-2">Price</label>
                            <input type="number" name="price" id="price" value={price}
                                onChange={(e) => setPrice(parseFloat(e.target.value))}
                                className="w-full p-2 border border-slate-300 rounded-md" />
                            {priceError && <p className="text-red-500 text-sm">{priceError}</p>}
                        </div>
                    </div>
                    <div className="card-footer p-3 flex justify-between text-white">
                        <button type="button" className="p-2 px-4 bg-green-500 hover:bg-green-600 rounded-full">
                            <FontAwesomeIcon icon={faRotate} className="mr-2" />
                            Cancel
                        </button>
                        <div className="search-actions space-x-3">
                            <button type="button" className="p-2 px-4 bg-slate-100 hover:bg-slate-200 rounded-full text-black">
                                <FontAwesomeIcon icon={faEraser} className="mr-2" />
                                Clear
                            </button>
                            <button type="submit" className="p-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-full">
                                <FontAwesomeIcon icon={faSave} className="mr-2" />
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default AmenityDetail
