import { useState } from "react";
import "./Search.scss";
import { toastError } from "../../common/common";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FindAction } from "../../redux/Reducer";
import Loading from "../Loading/Loading";

const Search = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            setLoading(true);
            await dispatch(FindAction(name));
            setName("")
            navigate(`/profile/${encodeURIComponent(name)}`);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toastError({message: "Không tìm thấy"});
        }
    }
    return (
        <div className="Search">
            <form onSubmit={handleSubmit}>
                <div className="Search-Input">
                    <div className="Search-Icon">
                    <i className='bx bx-search'></i>
                    </div>
                    <input
                        type="text"
                        value={name}
                        placeholder="Nhập tên #tag"
                        onChange={e => setName(e.target.value)}
                    />
                    <div className="Submit">
                        {loading ? <Loading size={22} /> : <button>Tìm</button>}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Search;
