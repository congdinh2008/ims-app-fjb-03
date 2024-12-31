import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AuthService } from "../../services/auth.service";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const location = useLocation();
    const redirectUrl = location.state?.from?.pathname || '/';

    const initialValues = {
        username: '',
        password: ''
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required')
            .min(2, 'Username must be at least 2 characters')
            .max(50, 'Username must be at most 50 characters'),
        password: Yup.string().required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .max(20, 'Password must be at most 20 characters')
    });

    const onSubmit = async (values: any) => {
        try {
            const response: any = await AuthService.login(values);
            if (response.status === 200) {
                login(response.data);
                navigate(redirectUrl, { replace: true });
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <section>
            <h1 className="text-2xl font-bold text-center">Login</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
                <Form>
                    <div className="form-group mb-3 p-2">
                        <label htmlFor="username" className="block mb-2">Username</label>
                        <Field name="username" className="w-full p-2 border border-slate-300 rounded-md" />
                        <ErrorMessage name="username" component="div" className="text-red-500" />
                    </div>
                    <div className="form-group mb-3 p-2">
                        <label htmlFor="password" className="block mb-2">Password</label>
                        <Field type="password" name="password" className="w-full p-2 border border-slate-300 rounded-md" />
                        <ErrorMessage name="password" component="div" className="text-red-500" />
                    </div>
                    <button type="submit" className="p-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-full text-white w-full">
                        Login
                    </button>
                </Form>
            </Formik>
        </section >
    )
}

export default Login
