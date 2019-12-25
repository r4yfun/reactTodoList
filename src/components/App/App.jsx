import React from 'react';

import TodoList from '../TodoList';
import SearchPanel from '../SearchPanel';
import AppHeader from '../AppHeader';
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAddForm from '../ItemAddForm';

import './App.css';

export default class App extends React.Component {

    maxId = 100

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ],
        term: '',
        filter: 'all' //active, all, done
    }

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id)

            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ]
            return {
                todoData: newArray
            }
        })
    }

    addItem = (text) => {
        const newItem = {
            label: text,
            important: false,
            done: false,
            id: this.maxId++
        }
        this.setState(({todoData}) => {
            const newArray = [
                ...todoData,
                newItem
            ]
            return {
                todoData: newArray
            }
        })
    }

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id)

            const oldItem = arr[idx]
            const newItem = {
                ...oldItem, 
                [propName]: !oldItem[propName]
            }
            return [
                ...arr.slice(0, idx),
                newItem,
                ...arr.slice(idx + 1)
            ]
    }

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
           return {
               todoData: this.toggleProperty(todoData, id, 'important')
           }
        })
       
    }

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    }

    search(items, term) {
        if (term === '') {
            return items
        }

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
        })
    }

    onSearchChange = (term) => {
        this.setState({term})
    }

    onFilterChange = (filter) => {
        this.setState({filter})
    }

    filter(items, filter) {
        switch(filter) {
            case 'active' :
                return items.filter((item) => !item.done)
            case 'done' :
                return items.filter((item) => item.done)
            case 'all' :
                return items
            default : 
                return items
        }
    }

    render() {
        const {todoData, term, filter} = this.state
        const visibleItems = this.filter(this.search(todoData, term), filter)
        const doneCount = todoData.filter((el) => el.done).length
        const todoCount = todoData.length - doneCount

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange} />
                    <ItemStatusFilter filter={filter} 
                                    onFilterChange={this.onFilterChange} 
                    />
                </div>
    
                <TodoList todos={visibleItems} 
                        onDeleted={this.deleteItem}
                        onToggleImportant={this.onToggleImportant}
                        onToggleDone={this.onToggleDone}
                />
                <ItemAddForm addItem={this.addItem} />
            </div>
        )
    }
}