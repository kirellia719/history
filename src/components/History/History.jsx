import { useEffect, useState } from "react";
import "./History.scss";
import { convertTimestampToDate, secondsToHMS, showPrice, toastError } from "../../common/common";
import Modal from "../Modal/Modal";
import MatchInfo from "../MatchInfo/MatchInfo";
import Loading from "../Loading/Loading"
import { LoadHistoriesAction } from "../../redux/Reducer";
import { useDispatch, useSelector } from "react-redux";

const History = () => {
    const [modal, setModal] = useState(false);

    const info = useSelector(state => state.Reducer.info);
    const histories = useSelector(state => state.Reducer.histories);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchHistories = async () => {
            try {
                if (info) {
                    dispatch(LoadHistoriesAction(info.puuid));
                }
            } catch (error) {
                toastError(error);
            }
        }
        fetchHistories();
    }, [info])

    return (
        <div className="History">
            <div className="Title">
                <h2>Lịch sử đấu</h2>
            </div>
            {
                !histories
                    ?
                    <Loading size={50}/>
                    :
                    <>
                        {
                            histories.map((h, i) => <div key={i} className={`History-Card ${h.win ? 'win' : 'lose'}`} onClick={() => setModal(h.matchId)}>
                                <div className="Champion">
                                    <div className="Image">
                                        <img src={h.champImg} alt="" />
                                        <div className="Level">
                                            <span>{h.champLevel}</span>
                                        </div>
                                    </div>

                                </div>
                                <div className="Match-Info">
                                    <div className="Status">
                                        <small>{h.gameMode} {h.gameType ? `- ${h.gameType}` : ''}</small>
                                        <div className="Duration">
                                            ({secondsToHMS(h.gameDuration)})
                                        </div>
                                    </div>

                                    <div className="Spells">
                                        <div className="Spell">
                                            <img src={h.spell1} alt="" />
                                        </div>
                                        <div className="Spell">
                                            <img src={h.spell2} alt="" />
                                        </div>
                                    </div>
                                </div>

                                <div className="Items-Info">
                                    <div className="Items">
                                        {h.items.map((item, i) => <div key={i} className="Item">
                                            {item ? <img src={item} alt="" /> : <></>}
                                        </div>)}
                                    </div>
                                    <div className="Numbers">
                                        <div className="KDA">
                                            <code>KDA: {h.kills}/{h.deaths}/{h.assists}</code>
                                        </div>
                                        <div className="CS">
                                            <code>{h.totalMinionsKilled}</code>
                                            <img src="https://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/champion.png" alt="" />
                                        </div>
                                        <div className="BUDGET">
                                            <code>{showPrice(h.goldEarned)}</code>
                                            <img src="/public/gold.png" alt="" />
                                        </div>
                                    </div>
                                </div>

                                <div className="Match-Date">
                                    <div className="Type">
                                        <strong>{h.win ? 'CHIẾN THẮNG' : 'THẤT BẠI'}</strong>
                                    </div>
                                    <div className="Start">
                                        <small>(Lúc: {convertTimestampToDate(h.gameCreation)})</small>
                                    </div>
                                </div>
                            </div>)
                        }

                        {modal &&
                            <Modal onClose={() => setModal(null)}>
                                <MatchInfo id={modal} />
                            </Modal>}
                    </>
            }
        </div>
    );
}

export default History;
