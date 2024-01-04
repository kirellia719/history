import { useEffect } from "react";
import "./ProfilePage.scss";
import { useParams } from "react-router-dom";
import { toastError } from "../../common/common";
import RankInfo from "../../components/RankInfo/RankInfo";
import Mastery from "../../components/Mastery/Mastery";
import History from "../../components/History/History";
import Waiting from "../../components/Waiting";
import {  useDispatch, useSelector } from "react-redux";
import { FindAction } from "../../redux/Reducer";

const ProfilePage = () => {
    const { riotID } = useParams();
    document.title = riotID;
    const dispatch = useDispatch();
    const info = useSelector(state => state.Reducer.info);
    
    useEffect(() => {
        if (!info || info.name !== riotID) {
            const fetchInfo = async () => {
                try {
                    await dispatch(FindAction(riotID));
                } catch (error) {
                    toastError({message: "Không tìm thấy"});
                }
            }
            fetchInfo();
        }
    }, [riotID]);

    return (
        <div className="ProfilePage">
            <div className="Row">
                <div className="Left">
                    <div className="Info">
                        <div className="Avatar-Icon">
                            <img src={info?.profileImg} alt={info?.profileIconId} />
                        </div>
                        <div className="Name">
                            <div className="Riot-Name">
                                {info ? info.name: <Waiting/>}
                            </div>
                            <div className="Riot-Level">
                                {info ? `Level: ${info.summonerLevel}`: <Waiting style={{width: "100px"}}/>}
                            </div>
                        </div>
                    </div>
                    <RankInfo/>
                </div>
                <Mastery />
            </div>
            <History />
        </div>
    );
}

export default ProfilePage;
