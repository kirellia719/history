import { useEffect} from "react";
import "./Mastery.scss";
import { showPrice, toastError } from "../../common/common";
import Waiting from "../Waiting";
import { useDispatch, useSelector } from "react-redux";
import { LoadMasteryAction } from "../../redux/Reducer";

const Mastery = () => {
    const info = useSelector(state => state.Reducer.info);
    const mastery = useSelector(state => state.Reducer.mastery);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMastery = async () => {
            try {
                if (info) {
                    await dispatch(LoadMasteryAction(info.puuid));
                }
            } catch (error) {
                toastError(error);
            }
        }
        fetchMastery();
    }, [info])

    return (
        <div className="Mastery">
            <div className="M-Row">
                {mastery.map((m, index) =>
                    <div key={index} className={`Champion-Mastery ${index == 1 ? 'first' : 'second'}`}>
                        <div className="Frame">
                            {m.img ? <img src={m.img} alt="" /> : <Waiting style={{backgroundColor: "#252146"}}/>}
                        </div>
                        <div className="Mastery">
                            <img
                                className="m-color"
                                src={`${process.env.REACT_APP_BE_URL}/public/tt7.png`}
                                alt=""
                            />
                            <img
                                className="m-score"
                                src={`${process.env.REACT_APP_BE_URL}/public/mastery/${m.level}.png`}
                                alt=""
                            />
                        </div>
                    </div>
                )}
                <hr />
            </div>

            <div className="Score-List M-Row">
                {mastery.map((m, index) => <div key={index} className={`Score ${index == 1 ? 'first' : 'second'}`}>
                    <div className="Champion-Name">
                        {m.name ? m.name : <Waiting />}
                    </div>
                    <div className="Champion-Score">
                        {m.points ? showPrice(m.points) : <Waiting style={{width: "60%"}}/>}
                    </div>
                </div>
                )}
            </div>
        </div>
    );
}

export default Mastery;
