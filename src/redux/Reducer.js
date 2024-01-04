import api from "../var";

const Reset = "Reset";
const FindUser = "FindUser";
const LoadMastery = "LoadMastery";
const LoadRank = "LoadRank";
const LoadHistories = "LoadHistories";

const initialState = {
    info: null,
    mastery: [{}, {}, {}],
    rank: null,
    histories: []
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case FindUser:
            return {...state, info: action.payload};
        case LoadMastery:
            return { ...state, mastery: action.payload };
        case LoadRank:
            return { ...state, rank: action.payload };
        case LoadHistories:
            return { ...state, histories: [...state.histories, ...action.payload] };
        case Reset:
            return initialState;
        default:
            return state;
    }
}


// ACTION
export const FindAction = (riotID) => async (dispatch) => {
    const { data } = await api.get(`/profile/info/${encodeURIComponent(riotID)}`);
    data && dispatch({ type: Reset });
    data && dispatch({ type: FindUser, payload: data })
}

export const LoadMasteryAction = (puuid) => async (dispatch) => {
    const {data} = await api.get(`/profile/mastery/${puuid}`);
    data && dispatch({type: LoadMastery, payload: data})
}

export const LoadRankAction = (summonerId) => async (dispatch) => {
    const {data} = await api.get(`/profile/rank/${summonerId}`);
    data && dispatch({type: LoadRank, payload: data})
}
export const LoadHistoriesAction = (puuid, start = 0, count = 5) => async (dispatch) => {
    const {data} = await api.get(`/profile/histories/${puuid}?start=${start}`);
    data && dispatch({type: LoadHistories, payload: data})
}



export default Reducer;