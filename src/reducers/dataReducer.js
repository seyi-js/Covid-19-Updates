import {GET_DATA, GET_TOTALS, GET_COUNTRIES} from '../actions/types'

const initialState = {
    dataList: [],
    dataTotals: [],
    countries:[]
}


export default ( state = initialState, action ) => {
    switch ( action.type ) {
        case GET_DATA:
            return {
                ...state,
                dataList:action.payload
            };
        case GET_TOTALS:
            return {
                ...state,
                dataTotals: action.payload
            };
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            }
        default:
            return state;
    }
}