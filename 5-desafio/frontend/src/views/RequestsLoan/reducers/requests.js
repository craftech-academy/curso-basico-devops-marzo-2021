const initialState = {
    count: 0,
    results: [],
    errors: null,
    visible_form: false
};


export default function requestsLoan(state=initialState, action) {
    let data = state;

    switch (action.type) {

        case 'LIST':
            return {...action.resp, visible_form:false};

        case 'UPDATE':
            data.results.splice(data.results.indexOf(action.object), 1, action.data);
            return {...data, visible_form: false};

        case 'DESTROY':
            data.results.splice(data.results.indexOf(action.object), 1);
            return {...data, count: data.count - 1};

        case 'VISIBLE_FORM':
            console.log("VISIBLE FORM ", action.visible);
            return {...data, visible_form: action.visible};

        default:
            return state;
    }
}
