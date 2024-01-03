import { useState } from "react";
import "./HistoryPage.scss";
import api from "../../var";
import { toastError } from "../../common/common";

const HistoryPage = () => {
    const [matchId, setMatchId] = useState("");
    const [data, setData] = useState([]);
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const {data} = await api.get(`match/${matchId}`);
            setData(data);
        } catch (error) {
            toastError(error);
        }
    }
    return (
        <div className="HistoryPage">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={matchId}
                    onChange={e => setMatchId(e.target.value)}
                />
            </form>

            {data.map((d, i) => <div key={i}>
                <img src={d.img} alt={d.championName} />
                {d.riotIdGameName}
            </div>)}
        </div>
    );
}

export default HistoryPage;
