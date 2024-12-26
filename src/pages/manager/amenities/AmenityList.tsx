import { faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight, faEdit, faEraser, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import AmenityDetail from "./AmenityDetail";

function AmenityList() {
    const [title] = useState<string>("Amenity Management");
    const [data, setData] = useState<any[]>([]);
    const [keyword, setKeyword] = useState<string>("");
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [pageList] = useState<number[]>([5, 10, 20, 50, 100]);
    const [pageInfo, setPageInfo] = useState<any>({});
    const [pageLimit] = useState<number>(3);
    const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<any>({});

    // Fetch data from API
    const searchData = async () => {
        const filter: any = {
            keyword: keyword,
            page: page,
            size: size,
            sortBy: "name",
            order: "asc",
        }
        const apiUrl = 'http://localhost:8080/api/v1/hotel-services/search';
        // http://localhost:8080/api/v1/hotel-services/search?keyword=&page=0&size=10&sortBy=name&order=asc
        const response = await axios.get(apiUrl, { params: filter });
        setData(response.data.data);
        setPageInfo(response.data.page);
    };

    useEffect(() => {
        searchData();
    }, [size, page]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setPage(0);
        searchData();
    };

    const calculatePageList = () => {
        const start: number = Math.max(0, page - pageLimit);
        const end: number = Math.min(pageInfo.totalPages - 1, page + pageLimit);

        let listPage: number[] = [];
        for (let i = start; i <= end; i++) {
            listPage.push(i);
        }
        return listPage;
    }

    const onCreate = () => {
        setIsShowDetail(true);
        setSelectedItem(null);
    }

    const onEdit = async (item: any) => {
        setIsShowDetail(true);
        setSelectedItem(item);
    };

    const onDelete = async (item: any) => {
        console.log("Delete item: ", item);
        const apiUrl = 'http://localhost:8080/api/v1/hotel-services';
        const response = await axios.delete(`${apiUrl}/${item.id}`);
        if (response.data) {
            searchData();
        } else {
            console.log("Delete failed");
        }

    }

    return (
        <section>
            {/* Search */}
            <div className="card border border-slate-300 rounded-md">
                <div className="card-header p-3">
                    <h1 className="text-2xl font-bold">{title}</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="card-body border-y border-slate-300 p-3">
                        <div className="form-group mb-3">
                            <label htmlFor="keyword" className="block mb-2">Keyword</label>
                            <input type="text" name="keyword" id="keyword" value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="w-full p-2 border border-slate-300 rounded-md" />
                        </div>
                    </div>
                    <div className="card-footer p-3 flex justify-between text-white">
                        <button type="button" onClick={onCreate}
                            className="p-2 px-4 bg-green-500 hover:bg-green-600 rounded-full">
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Create
                        </button>
                        <div className="search-actions space-x-3">
                            <button type="button" className="p-2 px-4 bg-slate-100 hover:bg-slate-200 rounded-full text-black">
                                <FontAwesomeIcon icon={faEraser} className="mr-2" />
                                Clear
                            </button>
                            <button type="submit" className="p-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-full">
                                <FontAwesomeIcon icon={faSearch} className="mr-2" />
                                Search
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* List with paging */}
            <div className="card border border-slate-300 rounded-md my-4">
                <div className="card-body border-b border-slate-300 p-3">
                    <table className="w-full">
                        <thead>
                            <tr className="*:p-3 *:border *:border-slate-300">
                                <th>No</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Active</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.length > 0 && data.map((item: any, index: number) => (
                                <tr className="*:p-3 *:border *:border-slate-300" key={item.id}>
                                    <td>
                                        {page * size + index + 1}
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.active ? "Yes" : "No"}</td>
                                    <td>
                                        <div className="flex justify-center">
                                            <button type="button" title="Edit" onClick={() => onEdit(item)}>
                                                <FontAwesomeIcon icon={faEdit} className="mr-2 text-blue-500 hover:text-blue-700" />
                                            </button>
                                            <button type="button" title="Delete" onClick={() => onDelete(item)}>
                                                <FontAwesomeIcon icon={faTrash} className="mr-2 text-red-500 hover:text-red-700" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {data && data.length <= 0 && (
                                <tr className="*:p-3 *:border *:border-slate-300">
                                    <td colSpan={5} className="text-center text-2xl font-semibold">No data found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer p-3 flex justify-between">
                    {/* Change Page Size */}
                    <div className="page-size">
                        <label htmlFor="page-size" className="mr-2">Items per page:</label>
                        <select name="size" id="page-size" onChange={(e) => setSize(parseInt(e.target.value))} value={size}
                            className="p-2 border border-slate-300 rounded-md">
                            {pageList.map((item: number) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    {/* Show Page List */}
                    <div className="page-links space-x-2 *:w-10 *:h-10 *:border *:border-blue-500 *:rounded-full hover:*:bg-blue-500 hover:*:text-white">
                        <button type="button" title="Page Item" onClick={() => setPage(0)}
                            className={` ${page === 0 ? "text-slate-300 !border-slate-300 pointer-events-none" : ""}`}>
                            <FontAwesomeIcon icon={faAngleDoubleLeft} />
                        </button>
                        <button type="button" title="Page Item" onClick={() => setPage(page - 1)}
                            className={` ${page === 0 ? "text-slate-300 !border-slate-300 pointer-events-none" : ""}`}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                        {calculatePageList().map((item: number) => (
                            <button type="button" title="Page Item" onClick={() => setPage(item)} key={item}
                                className={` ${page === item ? "bg-blue-600 text-white pointer-events-none" : ""}`}>
                                {item + 1}
                            </button>
                        ))}
                        <button type="button" title="Page Item" onClick={() => setPage(page + 1)}
                            className={` ${page === pageInfo.totalPages - 1 ? "text-slate-300 !border-slate-300 pointer-events-none" : ""}`}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                        <button type="button" title="Page Item" onClick={() => setPage(pageInfo.totalPages - 1)}
                            className={` ${page === pageInfo.totalPages - 1 ? "text-slate-300 !border-slate-300 pointer-events-none" : ""}`}>
                            <FontAwesomeIcon icon={faAngleDoubleRight} />
                        </button>
                    </div>
                    {/* Show Page Info */}
                    <div className="page-info">
                        <span>
                            {pageInfo.size * page + 1} - {Math.min(pageInfo.size * (page + 1), pageInfo.totalElements)} of {pageInfo.totalElements}
                        </span>
                    </div>
                </div>
            </div>

            {/* Detail Component */}
            {isShowDetail && <AmenityDetail item={selectedItem} />}
        </section>
    )
}

export default AmenityList
