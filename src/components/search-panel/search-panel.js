import React,{ Component } from 'react';

import './search-panel.css';
import { thisTypeAnnotation } from '@babel/types';

export default class SearchPanel extends Component {
  constructor() {
    super();
    this.state = {
      term: ''
    };
  }

  onSearchChange = (e) => {
    const term = e.target.value;
    this.setState({term});
    this.props.onSearchChange(term);
  }
  render() {
    return(
      <input type="text"
                className="form-control search-input"
                placeholder="type to search" 
                value={this.state.term}
                onChange={this.onSearchChange}
                //onChange={() => onSearchItems()}
                //onChange={this.onSearchChange}}
                />
    )
  };
};
