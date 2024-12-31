import { faEraser, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import TablePagination from "../../../core/components/TablePagination";
import RoomDetail from "./RoomDetail";
import { RoomService } from "../../../services/room.service";

function RoomList() {
    const [title] = useState<string>("Room Management");
    const [data, setData] = useState<any[]>([]);
    const [keyword, setKeyword] = useState<string>("");
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [pageInfo, setPageInfo] = useState<any>({});
    const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<any>({});
    const [columns] = useState<any[]>([
        { title: "Number", field: "number" },
        { title: "Type", field: "type" },
        { title: "Capacity", field: "capacity" },
        { title: "Price", field: "price" },
        { title: "Active", field: "active" },
    ]);

    const detailComponent = useRef<any>(null);

    // Fetch data from API
    const searchData = async () => {
        const filter: any = {
            keyword: keyword,
            page: page,
            size: size,
            sortBy: "number",
            order: "asc",
        }
        const response = await RoomService.search(filter);
        setData(response.data);
        setPageInfo(response.page);
    };

    useEffect(() => {
        searchData();
    }, [size, page]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setPage(0);
        searchData();
    };

    const onCreate = () => {
        setIsShowDetail(false);
        setSelectedItem(null);
        setTimeout(() => {
            setIsShowDetail(true);
            detailComponent.current.scrollIntoView({ behavior: "smooth" });
        });
    }

    const onEdit = async (item: any) => {
        setIsShowDetail(false);
        setSelectedItem(item);
        setTimeout(() => {
            setIsShowDetail(true);
            detailComponent.current.scrollIntoView({ behavior: "smooth" });
        });
    };

    const onDelete = async (item: any) => {
        const response = await RoomService.remove(item.id);
        if (response) {
            searchData();
        } else {
            console.log("Delete failed");
        }

    }

    const onCancelDetail = () => {
        setIsShowDetail(false);
        searchData();
    };

    const onSearch = (page: number, size: number) => {
        setPage(page);
        setSize(size);
        searchData();
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

            <TablePagination dataSource={data} pageInfo={pageInfo} columns={columns}
                handleEdit={(item: any) => onEdit(item)} handleDelete={(item: any) => onDelete(item)}
                handleSearch={onSearch} />

            {/* Detail Component */}
            <div className="detail-form mb-80" ref={detailComponent}>
                {isShowDetail && <RoomDetail item={selectedItem} cancel={onCancelDetail} />}
            </div>
        </section>
    )
}

export default RoomList
