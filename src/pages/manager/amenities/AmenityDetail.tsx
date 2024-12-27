import { faEraser, faRotate, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

function AmenityDetail({ item }: { item: any }) {

    const formik = useFormik({
        initialValues: {
            name: item && item.name ? item.name : '',
            price: item && item.price ? item.price : 0
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required')
                .min(2, 'Name must be at least 2 characters')
                .max(50, 'Name must be at most 50 characters'),
            price: Yup.number().required('Price is required').min(0, 'Price must be at least 0')
        }),
        onSubmit: async (values) => {
            const apiUrl = 'http://localhost:8080/api/v1/hotel-services';
            if (item) {
                const response = await axios.put(`${apiUrl}/${item.id}`, values);
                if (response.status === 200) {
                    alert('Updated successfully');
                } else {
                    alert('Failed to update');
                }
            } else {
                const response = await axios.post(apiUrl, values);
                if (response.status === 200) {
                    alert('Create successfully');
                } else {
                    alert('Failed to create');
                }
            }
        },
    });

    return (
        <section>
            {/* Search */}
            <div className="card border border-slate-300 rounded-md">
                <div className="card-header p-3">
                    <h1 className="text-2xl font-bold">Create Amenity</h1>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="card-body border-y border-slate-300 p-3 flex flex-wrap">
                        <div className="form-group mb-3 w-1/2 p-2">
                            <label htmlFor="name" className="block mb-2">Name</label>
                            <input type="text" id="name" name="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                className="p-2 border border-slate-300 rounded-sm w-full" />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="text-red-500">{typeof formik.errors.name === 'string' ? formik.errors.name : ''}</div>
                            ) : null}
                        </div>
                        <div className="form-group mb-3 w-1/2 p-2">
                            <label htmlFor="price" className="block mb-2">Price</label>
                            <input type="price" id="price" name="price"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.price}
                                className="p-2 border border-slate-300 rounded-sm w-full" />
                            {formik.touched.price && formik.errors.price ? (
                                <div className="text-red-500">{typeof formik.errors.price === 'string' ? formik.errors.price : ''}</div>
                            ) : null}
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
