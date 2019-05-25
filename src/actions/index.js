import streams from  '../apis/streams';
import history from '../history';

import {    SIGN_IN, 
            SIGN_OUT, 
            CREATE_STREAM,
            FETCH_STREAMS,
            FETCH_STREAM,
            DELETE_STREAM,
            EDIT_STREAM
       } from './types'; 

export const signIn = (userId) => {
    return {
        type : SIGN_IN,
        payload: userId
    };
}


export const signOut = () => {
    return {
        type : SIGN_OUT
    };
}


export const createStream = (formValues) => {
    return async (dispatch, getState) => {
       
        const { userId} = getState().auth;
        const resp = await streams.post('/streams', { ...formValues, userId });

       dispatch({ type:CREATE_STREAM, payload: resp.data});

       // do some  programmatic navigation to
       // get the user back to the root route
       history.push('/');

    };
};

export const fetchStreams = () => {
    return async (dispatch) => {
       const resp = await streams.get('/streams');

       dispatch({ type:FETCH_STREAMS, payload: resp.data});

    };
};



export const fetchStream = (id) => {
    return async (dispatch) => {
       const resp = await streams.get(`/streams/${id}`);

       dispatch({ type:FETCH_STREAM, payload: resp.data});

    };
};

//updStream
export const editStream = (id, formValues) => {
    return async (dispatch) => {
       
       // const resp = await streams.put(`/streams/${id}`, formValues);
       const resp = await streams.patch(`/streams/${id}`, formValues);

       dispatch({ type:EDIT_STREAM, payload: resp.data});

       history.push('/');
       
    };
};


export const deleteStream = (id) => {
    return async (dispatch) => {
       
        //const resp = 
        await streams.delete(`/streams/${id}`);

       dispatch({ type:DELETE_STREAM, payload: id});

       history.push('/');
       
    };
};
