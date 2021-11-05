import './app.css';
import AppInfo from '../app-info/app-info.js';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

function App() {

    const data = [
        {name: 'David', salary: 1000, increase: true, id: 1},
        {name: 'Sergey', salary: 600, increase: false, id: 2},
        {name: 'Kirill', salary: 1200, increase: false, id: 3},
        {name: 'Ivan', salary: 5000, increase: false, id: 4}
    ];

    return (
        <div className="app">
            <AppInfo/>

            <div className="search-panel">
                <SearchPanel/>
                <AppFilter/>
            </div>

            <EmployersList data={data}/>
            <EmployersAddForm/>
        </div>
    );
}

export default App;