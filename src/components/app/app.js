import { Component } from 'react';

import './app.css';
import AppInfo from '../app-info/app-info.js';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'David', salary: 5000, increase: true, rise: true, id: 1},
                {name: 'Sergey', salary: 5000, increase: false, rise: false, id: 2},
                {name: 'Kirill', salary: 5000, increase: false, rise: false, id: 3},
                {name: 'Ivan', salary: 5000, increase: false, rise: false, id: 4}
            ]
        }
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            // const index = data.findIndex(elem => elem.id === id);
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = ({name, salary}) => {
        this.setState(({data}) => {
            const dataCopy = [...data];
            const newId = Date.now();
            dataCopy.push({
                name,
                salary,
                increase: false,
                rise: false,
                id: newId
            });
            return {
                data: dataCopy
            }
       })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    render() {
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased}/>
    
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>
    
                <EmployersList 
                    data={this.state.data} 
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployersAddForm addItem={this.addItem}/>
            </div>
        );
    }
}

export default App;