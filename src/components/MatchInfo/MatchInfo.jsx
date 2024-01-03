import { useEffect, useState } from "react";
import "./MatchInfo.scss";
import api from "../../var";
import { calculateKDA, convertTimestampToDate, secondsToHMS, showPrice, toastError } from "../../common/common";
import Waiting from "../Waiting";
import { useNavigate } from "react-router-dom";

const Player = ({ right, data = {}, onClose }) => {
    const navigate = useNavigate();

    const find = (riotID) => {
        onClose && onClose();
        navigate(riotID);

    }
    return (<div className={`Player ${right ? `Right` : ''}`}>
        <div className={`Spells ${right ? `Right` : ''}`}>
            <div className={`Group`}>
                <div className="Rune" >
                    {/* <img src="https://lmssplus.com/static_image/img/perks/8010.png" alt="" /> */}
                </div>
            </div>
            <div className="Group">
                <div className="Spell">
                    <img src={data.spell1} alt="" />
                </div>
                <div className="Spell">
                    <img src={data.spell2} alt="" />
                </div>
            </div>

        </div>
        <div className="Champ">
            <img src={data.champImg} alt="" />
        </div>
        <div className="Group-Info">
            <div className="Game-Name" onClick={() => find(`/profile/${encodeURIComponent(data.riotIdGameName + '#' + data.riotIdTagline)}`)}>
                {data.riotIdGameName}
            </div>
            <div className={`List-Item ${right ? 'Right' : ''}`}>
                {data?.items.map((item, index) => <div key={index + item} className="Item">
                    <img src={item} alt="" />
                </div>
                )}
            </div>
        </div>

        <div className="Player-Number">
            <div className="KDA">
                {data.kills} / {data.deaths} / {data.assists}
            </div>
            <div className="Rate">
                {calculateKDA(data.kills, data.deaths, data.assists)}
            </div>
        </div>

        <div className="Player-CS">
            <div className="CS">
                {data.totalMinionsKilled} (cs)
            </div>
            <div className="Gold">
                {showPrice(data.goldEarned)} G
            </div>
        </div>
    </div>)
}

const MatchInfo = ({ id, onClose }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchMatch = async () => {
            try {
                if (id) {
                    const { data } = await api.get(`/match/${id}`);
                    setData(data);
                }
            } catch (error) {
                toastError(error)
            }
        }
        fetchMatch();
    }, [])

    return (
        <div className="MatchInfo">
            <div className="Header">
                <div className="Name">
                    
                    <div className="Game-Mode">
                        {data ? `${data.gameMode} ${data.gameType} (${secondsToHMS(data.gameDuration)})` : <Waiting style={{width: "150px"}}/>}
                    </div>
                    <div className="dot"></div>
                    <div className="GameID">
                        {data ? <code>ID: {data.gameId}</code> : <Waiting style={{width: "150px"}}/>}
                    </div>
                    
                </div>
                <div className="Time">
                    {data ? `Lúc: ${convertTimestampToDate(data.gameCreation)}` : <Waiting style={{width: "200px"}}/>}
                </div>
            </div>
            <div className="Match-Board">
                <div className="Sumary-Row">
                    <div className="Sumary Blue">
                        <div className="Team-Name">
                            ĐỘI 1
                        </div>
                        <div className="KDA">
                            <div className="kda-icon">
                                <i className="fa-solid fa-khanda"></i>
                            </div>
                            <div className="Number">
                                {data ? data.sumary[0].k : '?'}
                            </div>
                            <div className="separate">/</div>
                            <div className="Number">
                                {data ? data.sumary[0].d : '?'}
                            </div>
                            <div className="separate">/</div>
                            <div className="Number">
                                {data ? data.sumary[0].a : '?'}
                            </div>
                        </div>
                        {data?.win==0 && <div className="Winner">WIN</div>}
                    </div>
                    <div className="Sumary Right Red">
                        <div className="Team-Name">
                            ĐỘI 2
                        </div>
                        <div className="KDA">
                            <div className="kda-icon">
                                <i className="fa-solid fa-khanda"></i>
                            </div>
                            <div className="Number">
                                {data ? data.sumary[1].k : '?'}
                            </div>
                            <div className="separate">/</div>
                            <div className="Number">
                                {data ? data.sumary[1].d : '?'}
                            </div>
                            <div className="separate">/</div>
                            <div className="Number">
                                {data ? data.sumary[1].a : '?'}
                            </div>
                        </div>
                        {data?.win==1 && <div className="Winner">WIN</div>}
                    </div>
                </div>
                <div className="Table-Player">
                    {data?.players.map((row, index) => <div key={index} className="Row-Player">
                        <Player onClose={onClose} data={row[0]} />
                        <div className="Lane-Icon">
                            <img src={`/public/lane/${index + 1}.png`} alt="" />
                        </div>
                        <Player onClose={onClose} data={row[1]} right />
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MatchInfo;
