import { faEraser, faRotateLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { RoomService } from "../../../services/room.service";

function RoomDetail({ item, cancel }: { item: any, cancel: any }) {

    const initialValues = {
        number: item && item.number ? item.number : '',
        type: item && item.type ? item.type : '',
        capacity: item && item.capacity ? item.capacity : 0,
        price: item && item.price ? item.price : 0
    };

    const validationSchema = Yup.object({
        number: Yup.string().required('Number is required')
            .min(2, 'Number must be at least 2 characters')
            .max(50, 'Number must be at most 50 characters'),
        type: Yup.string().required('Type is required'),
        capacity: Yup.number().required('Capacity is required').min(0, 'Capacity must be at least 0'),
        price: Yup.number().required('Price is required').min(0, 'Price must be at least 0')
    });

    const onSubmit = async (values: any) => {
        if (item) {
            const response = await RoomService.update(item.id, values);
            if (response) {
                cancel();
            } else {
                alert('Failed to update');
            }
        } else {
            const response = await RoomService.create(values);
            if (response) {
                cancel();
            } else {
                alert('Failed to create');
            }
        }
    };

    return (
        <section>
            {/* Search */}
            <div className="card border border-slate-300 rounded-md">
                <div className="card-header p-3">
                    <h1 className="text-2xl font-bold">{item ? "Edit" : "Create"} Room</h1>
                </div>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
                    <Form>
                        <div className="card-body border-y border-slate-300 p-3 flex flex-wrap">
                            <div className="form-group mb-3 w-1/2 p-2">
                                <label htmlFor="number" className="block mb-2">Number</label>
                                <Field name="number" className="w-full p-2 border border-slate-300 rounded-md" />
                                <ErrorMessage name="number" component="div" className="text-red-500" />
                            </div>
                            <div className="form-group mb-3 w-1/2 p-2">
                                <label htmlFor="type" className="block mb-2">Type</label>
                                <Field name="type" className="w-full p-2 border border-slate-300 rounded-md" />
                                <ErrorMessage name="type" component="div" className="text-red-500" />
                            </div>
                            <div className="form-group mb-3 w-1/2 p-2">
                                <label htmlFor="capacity" className="block mb-2">Capcity</label>
                                <Field name="capacity" className="w-full p-2 border border-slate-300 rounded-md" />
                                <ErrorMessage name="capacity" component="div" className="text-red-500" />
                            </div>
                            <div className="form-group mb-3 w-1/2 p-2">
                                <label htmlFor="price" className="block mb-2">Price</label>
                                <Field name="price" className="w-full p-2 border border-slate-300 rounded-md" />
                                <ErrorMessage name="price" component="div" className="text-red-500" />
                            </div>
                        </div>
                        <div className="card-footer p-3 flex justify-between text-white">
                            <button type="button" onClick={cancel}
                                className="p-2 px-4 bg-slate-100 hover:bg-slate-300 text-black rounded-full">
                                <FontAwesomeIcon icon={faRotateLeft} className="mr-2" />
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
                    </Form>
                </Formik>
            </div>
        </section >
    )
}

export default RoomDetail
