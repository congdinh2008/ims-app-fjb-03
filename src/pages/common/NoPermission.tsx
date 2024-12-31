import { Link } from "react-router-dom";

const NoPermission = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">403</h1>
                <p className="text-gray-500">You don't have permission to access this page</p>
                <Link to="/" className="p-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-full text-white mt-4">
                    Back to Home
                </Link>
            </div>
        </div>
    )
}

export default NoPermission;