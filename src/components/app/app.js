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
                {name: 'David', salary: 1000, increase: true, id: 1},
                {name: 'Sergey', salary: 600, increase: false, id: 2},
                {name: 'Kirill', salary: 1200, increase: false, id: 3},
                {name: 'Ivan', salary: 5000, increase: false, id: 4}
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
            const newId = dataCopy.length + 1;
            dataCopy.push({
                name,
                salary,
                increase: false,
                id: newId
            });
            return {
                data: dataCopy
            }
       })
    }

    render() {
        return (
            <div className="app">
                <AppInfo/>
    
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>
    
                <EmployersList data={this.state.data} onDelete={this.deleteItem}/>
                <EmployersAddForm addItem={this.addItem}/>
            </div>
        );
    }
}

export default App;