import React from "react";
import { Table, Tag, Popconfirm } from 'antd';
import PropTypes from "prop-types";
import moment from 'moment';


const format_date = 'YYYY-MM-DD';



class ObjectsTable extends React.Component {
    state = {
        data: [],
        pagination: {},
        loading: false,
    };

    constructor(props) {
        super(props);

        this.columns = [
            {
                title: 'Nombre Completo',
                dataIndex: 'full_name',
                sorter: true,
            },
            {
                title: 'DNI',
                dataIndex: 'document_number',
                sorter: true,
            },
            {
                title: 'Monto',
                dataIndex: 'amount',
                render: amount =>  <span className="price">$ {amount}</span>,
                sorter: true,
            },
            {
                title: 'Creation',
                dataIndex: 'created_at',
                sorter: true,
                render: created => ( moment(created).format(format_date) )
            },
            {
                title: 'Estado',
                dataIndex: 'status',
                sorter: true,
                render: status => (
                    <span>
                        {status === 0 && <Tag color='yellow' key={status}>Pendiente</Tag>}
                        {status === 1 && <Tag color='blue' key={status}>Aprovada</Tag>}
                        {status === 2 && <Tag color='red' key={status}>Rechazada</Tag>}
                    </span>
                ),
            },
            {
                title: 'Acciones',
                key: 'operation',
                render: (record) => (
                    <span>
                        <Popconfirm title="Desea eliminar esta solicitud?" onConfirm={() => props.onDelete(record)}>
                            <a href="javascript:;">Eliminar</a>
                        </Popconfirm>
                        <a href="javascript:;" onClick={() => props.onUpdate(record)} style={{ marginLeft: '10px' }}>Editar</a>
                    </span>
                ),
            }
        ];
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        if(this.props.pagination.current !== pagination.current){
            this.props.onChangePage(pagination.current)
        }else{
            if(sorter && sorter.field){
                this.props.onChangeParams({ordering: sorter === "descend" ? sorter.field : '-' + sorter.field});
            }else{
                this.props.onChangeParams({ordering: null});
            }
        }
    };

    render() {
        return (
            <Table
                columns={this.columns}
                rowKey={record => record.id}
                dataSource={this.props.results}
                pagination={this.props.pagination}
                loading={this.props.loading}
                onChange={this.handleTableChange}
                bordered={true}
            />
        );
    }
}

ObjectsTable.propTypes = {
    results: PropTypes.array,
    loading: PropTypes.bool,
    pagination: PropTypes.object,
    onChangeParams: PropTypes.func,
    onChangePage: PropTypes.func,
    onDelete: PropTypes.func,
    onUpdate: PropTypes.func,
};

export default ObjectsTable;