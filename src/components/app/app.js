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
                {name: 'Peter', salary: 1800, increase: true, rise: true, id: 1},
                {name: 'James', salary: 1500, increase: false, rise: false, id: 2},
                {name: 'Ann', salary: 2000, increase: false, rise: false, id: 3},
                {name: 'Alexsandra', salary: 1200, increase: false, rise: false, id: 4}
            ],
            term: '',
            filter: 'all'
        }
    }

    // удаление ел списка сотрудников
    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }
    
    // добавление ел списка сотрудников
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

    /** функция для передачи в data (состояниене этого компонента) 
    * параметров increase и rise, которые нужны
    * для подсчета сотрудников в компоненте AppInfo
    */
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

    /** фильтрация данных в data (состояниене этого компонента) по term 
     * (заданному поисковому запросу юзера) компонента search-panel  */
    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    /** Функция добавления значения поискового запроса юзера в 
     * data (состояниене этого компонента)*/
    onUpdateSearch = (term) => {
        this.setState({term: term});
    }

    /** Функция фильтрации данных пользователем */
    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise' :
                return items.filter(item => item.rise);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter: filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployersList 
                    data={visibleData} 
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployersAddForm addItem={this.addItem}/>
            </div>
        );
    }
}

export default App;