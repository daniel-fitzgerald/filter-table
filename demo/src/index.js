import React, { Component } from 'react'
import { render } from 'react-dom'

import { FilterTable } from '../../src'

const columns = [
  { name: 'col 1', filter: true, flex: 3, data: 'col1' },
  { name: 'col 2', filter: true, flex: 3, data: 'col2' },
]

const data = [
  { "col1": "value 1", "col2": "value 2" },
  { "col1": "value 3", "col2": "value 4" },
  { "col1": "value 5", "col2": "value 6" },
  { "col1": "value 7", "col2": "value 8" },
  { "col1": "value 9", "col2": "value 10" },
  { "col1": "value 11", "col2": "value 12" },
  { "col1": "value 13", "col2": "value 14" },
  { "col1": "value 15", "col2": "value 16" },
  { "col1": "value 17", "col2": "value 18" },
]

class Demo extends Component {
  render() {
    return <div>
      <h1>internal-components Demo</h1>
      <FilterTable columns={columns} data={data} />
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))
