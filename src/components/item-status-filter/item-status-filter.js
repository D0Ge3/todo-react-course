import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
 
  
  // onStatusChange = (e) => {
  //   const filter = e.target.textContent;
  //   e.target.className ="btn btn-info";
  //   this.setState({filter});
  //   this.props.onStatusFilterChange(filter);
  //   console.log(e.target.textContent);
    

  // }
  
  buttons = [
    {name: 'all', label: 'All'},
    {name: 'active', label: 'Active'},
    {name: 'done', label: 'Done'}
  ];
  render() {
    const { filter, onFilterChange} = this.props;
    const buttons = this.buttons.map(({name, label}) => {
      const isActive = filter === name;
      const clazz = isActive ? 'btn btn-info' : 'btn btn-outline-secondary';
      return(
        <button type="button"
                className={clazz}
                key={name}
                onClick={() => onFilterChange(name)}
                >{label}</button>
      )
    })
    return (
      <div className="btn-group">
       {buttons}
      </div>
    );
  }
};