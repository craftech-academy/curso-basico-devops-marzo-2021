import React from "react";
import {connect} from "react-redux";
import * as objects from "./actions/requests";
import ObjectsTable from './components/Table';
import ObjectForm from './components/Form';
import { Drawer } from 'antd';
import {
    addUrlProps,
    UrlQueryParamTypes,
    replaceInUrlQuery,
    multiReplaceInUrlQuery
} from "react-url-query";


const urlPropsQueryConfig = {
    page: { type: UrlQueryParamTypes.number },
    categories_slug: { type: UrlQueryParamTypes.string, queryParam: 'category__slug' },
};


class TablePage extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        current_obj: null
    }

    componentDidMount() {
        this.props.list(this.props.location.search);
    }

    onChangeParams = (params) => {
        //replaceInUrlQuery(...params);
        multiReplaceInUrlQuery({page: 1, ...params});
        this.props.list(this.props.location.search);
    };
    onChangePage = (page) => {
        replaceInUrlQuery('page', page);
        this.props.list(this.props.history.location.search);
    };

    onDelete = (object) =>{
        this.props.destroy(object);
    };

    onUpdate = (object) =>{
        this.setState({current_obj: object})
        this.props.visibleForm();
    };

    onCloseForm = () =>{
        this.props.hiddenForm();
    }

    render() {
        const { objects, page } = this.props;
        const pagination = {
            total: this.props.objects.count, current: this.props.page, pageSize: 5
        };
        return (
            <React.Fragment>
                <Drawer
                  title="Editar solicitud"
                  width={720}
                  visible={objects.visible_form}
                  onClose={this.onCloseForm}
                  style={{
                    overflow: 'auto',
                    height: 'calc(100% - 108px)',
                    paddingBottom: '108px',
                  }}
                >
                    <ObjectForm current_obj={this.state.current_obj}/>
                </Drawer>
                <ObjectsTable results={objects.results}
                              pagination={pagination}
                              loading={false}
                              onChangeParams={this.onChangeParams}
                              onChangePage={this.onChangePage}
                              onDelete={this.onDelete}
                              onUpdate={this.onUpdate}
                />
            </React.Fragment>
        );
    }
}


const mapStateToProps = state => {
    return {
        objects: state.requestsLoan
    }
};

const mapDispatchToProps = dispatch => {
    return {
        list: (params) => {
            dispatch(objects.list(params));
        },
        destroy: (object) => {
            dispatch(objects.destroy(object));
        },
        visibleForm: () => {
            return dispatch(objects.visibleForm(true));
        },
        hiddenForm: () => {
            return dispatch(objects.visibleForm(false));
        }
    }
};

export default addUrlProps({ urlPropsQueryConfig })(connect(mapStateToProps, mapDispatchToProps)(TablePage));