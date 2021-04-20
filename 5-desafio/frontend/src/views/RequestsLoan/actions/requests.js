import { message } from 'antd';

const ENDPOINT = 'http://0.0.0.0:8000/api/requests-loan/';


export const list = (params) => {
    return dispatch => {
        return fetch(`${ENDPOINT}${params}`, {method: "GET" })
            .then(resp => resp.json())
            .then(resp => {
                return dispatch({
                    type: 'LIST',
                    resp:resp
                })
            })
    }
};

export const visibleForm = (visible) => {
    return dispatch => {
         return dispatch({
             type: 'VISIBLE_FORM',
             visible
         });
    };
};


export const update = object => {
    return dispatch => {
        let body = JSON.stringify(object);

        return fetch(`${ENDPOINT}${object.id}/`, {method: "PUT", body})
            .then(res => res.json())
            .then(resp => {
                message.success(`La solicitud ${object.id} fue actualizada correctamente.`);
                return dispatch({
                    type: 'UPDATE',
                    data:resp,
                    object
                })
            })
    }
};

export const destroy = object => {
    return dispatch => {

        return fetch(`${ENDPOINT}${object.id}/`, {method: "DELETE"})
            .then(res => {
                message.warning(`La solicitud ${object.id} fue eliminada.`);
                if (res.ok) {
                    return dispatch({
                        type: 'DESTROY',
                        object
                    })
                }
            })
    }
};
