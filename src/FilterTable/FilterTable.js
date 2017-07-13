import React from 'react'

import { Input } from '@ag-components-react/internal-components'

import { Table, Column, Cell, ColumnGroup } from 'fixed-data-table-2'
import Dimensions from 'react-dimensions'

import 'fixed-data-table-2/dist/fixed-data-table.css'

const TextCell = ({ rowIndex, data, col, ...props }) => <Cell {...props}>{data[rowIndex][col]}</Cell>

class FilterTable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            filters: null
        }
    }

    componentWillMount() {
        this.setState({ filters: Array(this.props.columns.length).fill('') })
    }

    check = (data, filter) => {
        if (filter === null || filter === undefined || filter === "") {
            return true
        }
        if (data === null || data === undefined) {
            return false
        }
        return data.toLowerCase().includes(filter.toLowerCase())
    }

    filter = (index) => (value) => {
        let filters = this.state.filters.slice()
        filters[index] = value

        this.setState({
            filters: filters
        })
    }

    render() {
        const { containerHeight, containerWidth, columns, data } = this.props
        const { filters } = this.state

        let filteredData = data.filter((row) => {
            const results = columns.map((column, index) => column.filter ? this.check(row[column.data], filters[index]) : true)
            return results.find(result => result === false) == null
        })

        let tableColumns = columns.map((column, index) =>
            <ColumnGroup
                key={index}
                header={<Cell>{column.name}</Cell>} >
                <Column
                    header={column.filter ? <Cell><Input id={`filter-${index}`} type="text" onChange={this.filter(index)} value={this.state.filters[index]} /></Cell> : ''}
                    cell={<TextCell data={filteredData} col={column.data} />}
                    width={100}
                    flexGrow={column.flex}
                />
            </ColumnGroup >)

        return <Table
            rowHeight={50}
            groupHeaderHeight={50}
            rowsCount={filteredData.length}
            width={containerWidth}
            height={containerHeight}
            headerHeight={50}>
            {tableColumns}
        </Table>
    }
}

const dimensionsConfig = {
    getHeight: function (element) {
        let result = window.innerHeight - 430
        return result < 450 ? 450 : result
    },
    getWidth: function (element) {
        let result = window.innerWidth - 96
        return result > 1360 ? 1360 : result
    }
}

export default Dimensions(dimensionsConfig)(FilterTable)