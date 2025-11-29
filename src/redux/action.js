export let FETCHSUCCESS="FETCHSUCCESS";
export let FETCHLOADING="FETCHLOADING";
export let FETCHFAILED="FETCHFAILED";


export let fetchSuccess = (data) =>({
    type:FETCHSUCCESS,
    payload:data
});

export let fetchLoading = () =>({
    type:FETCHLOADING,
});

export let fetchFailed = (error) =>({
    type:FETCHFAILED,
    payload:error
})