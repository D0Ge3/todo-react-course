import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { returnStatement } from '@babel/types';
import { template } from '@babel/core';

export default class App extends Component {
  maxId = 100;
  constructor() {
    super();
    this.state = {
      todoData : [
        this.createTodoItem('Drink Coffee'),
        this.createTodoItem('Make Awesome App'),
        this.createTodoItem('Have a lunch')
      ],
      term: '',
      filter: 'all' //active, all, done
    };
  }


  createTodoItem(label) {
    return{
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [
        ...todoData.slice(0, idx), 
        ...todoData.slice(idx+1)];
      return {
        todoData: newArray
      };
    })
  };

  onChangeSearchPanel = (term) => {
    this.setState({term});
  }

  onFilterChange = (filter) => {
    this.setState({filter});
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    
    this.setState(({todoData}) => {
      const newArr = [
        ...todoData,newItem
      ];
      return {
        todoData: newArr
      }
    });
  };
  toggleProperty(arr, id, propName) {
      const idx = arr.findIndex((el) => el.id === id);
      const oldItem = arr[idx];
      const newItem = {...oldItem, 
        [propName]: !oldItem[propName]};
      return [
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx + 1)
      ];
  }
  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return{
        todoData: this.toggleProperty(todoData,id,'important')
      }
    })
    
  };

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return{
        todoData: this.toggleProperty(todoData,id,'done')
      }
    })
  };
  //---------------------------------------------------------
  // let fruits = ["Banana", "Orange", "Apple", "Mango"];
  
  // let n = {...fruits};
  // for(let i=0;i<4;i++) {
  //   console.log(n[i].includes("M"))
  // }
  // //n.for
  // console.log(n);
  //-----------------------------------------------------------

  search(items,term) {
    if(term.length === 0) {
        return items;
    }
    return items.filter((item) => {
      return item.label
      .toLowerCase().includes(term.toLowerCase())
    });
   
  }
//Включить в search
  filter(items,filter) {
    if(filter=='done'){
    return items.filter((item) => item.done)
  }else if(filter=='active') {
      return items.filter((item) => !item.done)
    } else if(filter=='all') {
      return items;
    } else {
      return items;
    }
  }
  
  render() {
    const { todoData,term, filter } = this.state;
    const doneCount = todoData
                      .filter((el) => el.done ).length;
    const todoCount = todoData.length - doneCount;
    const visibleItems = this.filter( this.search(todoData, term), filter);
    //const visibleItems = this.filter(todoData, 'active');
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onChangeSearchPanel}/>
          {/* <ItemStatusFilter onStatusFilterChange={this.onStatusFilterChange}/> */}
          <ItemStatusFilter 
          filter={filter}
          onFilterChange={this.onFilterChange}/>
        </div>
  
        <TodoList 
        todos={visibleItems} 
        onDeleted={ this.deleteItem } 
        onToggleImportant={this.onToggleImportant} 
        onToggleDone={this.onToggleDone} />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }

};

