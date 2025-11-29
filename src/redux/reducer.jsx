import { FETCHFAILED, FETCHLOADING, FETCHSUCCESS } from "./action";


export let initialState = {
    data:[],
    loading:false,
    error :"",

}


export function Reducer(state=initialState, action){

    switch(action.type){
        case FETCHLOADING:
            return {...state,loading:true , error:""}
        case FETCHSUCCESS:
            return {...state,data:action.payload, loading:false}
        case FETCHFAILED:
            return {...state,loading:false, error:action.payload}
        default:
            return state
    }


    

}