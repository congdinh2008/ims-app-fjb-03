import { faEdit, faTrash, faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const TablePagination = ({ dataSource, pageInfo, columns, handleEdit, handleDelete, handleSearch }: { dataSource: any[], pageInfo: any, columns: any[], handleEdit: any, handleDelete: any, handleSearch: any }) => {
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [pageList] = useState<number[]>([5, 10, 20, 50, 100]);
    const [pageLimit] = useState<number>(3);

    const calculatePageList = () => {
        const start: number = Math.max(0, page - pageLimit);
        const end: number = Math.min(pageInfo.totalPages - 1, page + pageLimit);

        let listPage: number[] = [];
        for (let i = start; i <= end; i++) {
            listPage.push(i);
        }
        return listPage;
    }

    useEffect(() => {
        handleSearch(page, size);
    }, [page, size]);

    return (
        <div className="card border border-slate-300 rounded-md my-4">
            <div className="card-body border-b border-slate-300 p-3">
                <table className="w-full">
                    <thead>
                        <tr className="*:p-3 *:border *:border-slate-300">
                            <th>No</th>
                            {columns && columns.map((item: any, index: number) => (
                                <th key={index}>{item.title}</th>
                            ))}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataSource && dataSource.length > 0 && dataSource.map((item: any, index: number) => (
                            <tr className="*:p-3 *:border *:border-slate-300" key={item.id}>
                                <td>
                                    {page * size + index + 1}
                                </td>
                                {columns && columns.map((column: any, index: number) => (
                                    column.field === "active" ? (<td key={index}>{item[column.field] ? "Yes" : "No"}</td>) : (<td key={index}>{item[column.field]}</td>)
                                ))}
                                <td>
                                    <div className="flex justify-center">
                                        <button type="button" title="Edit" onClick={() => handleEdit(item)}>
                                            <FontAwesomeIcon icon={faEdit} className="mr-2 text-blue-500 hover:text-blue-700" />
                                        </button>
                                        <button type="button" title="Delete" onClick={() => handleDelete(item)}>
                                            <FontAwesomeIcon icon={faTrash} className="mr-2 text-red-500 hover:text-red-700" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {dataSource && dataSource.length <= 0 && (
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
    )
};

export default TablePagination;