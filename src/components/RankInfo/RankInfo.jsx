import { useEffect, useState } from "react";
import "./RankInfo.scss";
import { toastError } from "../../common/common";
import Waiting from "../Waiting";
import { useDispatch, useSelector } from "react-redux";
import { LoadRankAction } from "../../redux/Reducer";

const RankInfo = () => {
    const [index, setIndex] = useState(0);
    const info = useSelector(state => state.Reducer.info);
    const rank = useSelector(state => state.Reducer.rank);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchRank = async () => {
            try {
                if (info) {
                    dispatch(LoadRankAction(info.id));
                }
            } catch (error) {
                toastError(error)
            }
        }
        fetchRank();
    }, [info])

    return (
        <div className="Rank">
            {
                rank ?
                rank.length == 0
                    ? <div className="No-Rank">Chưa có hạng</div>
                    : <>
                        <div className="Rank-Info">
                            <div className="Rank-Select">
                                <div className="Value">
                                    <span>{rank[index]?.type}</span>
                                    <i className='bx bx-chevron-down'></i>
                                </div>
                                <div className="Select">
                                    {rank.map((r, i) =>
                                        <div
                                            key={i}
                                            className={`Option ${i == index ? 'active' : ''}`}
                                            onClick={() => setIndex(i)}
                                        >
                                            {r?.type}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="Rank-Title">
                                <div className="Rank-Name">{rank[index]?.title}</div>
                                <div className="Rank-Score">{rank[index]?.score} ĐNG</div>
                            </div>
                        </div>
                        <div className="Rank-Icon">
                            <img
                                className="rank-icon"
                                src={`/rank-icon/Rank=${rank[index]?.img}.png`} alt=""
                            />
                        </div>
                    </>
                : <Waiting style={{height: "60px"}}/>
            }
        </div>
    );
}

export default RankInfo;
