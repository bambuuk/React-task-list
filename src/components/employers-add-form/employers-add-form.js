import { Component } from 'react';
import './employers-add-form.scss';
// import './employers-add-form.css';


class EmployersAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit = (e) => {
        e.preventDefault();
        if (this.state.name.length > 3 && this.state.salary !== '') {
            this.props.addItem(this.state);
            this.setState({
                name: '',
                salary: ''
            });
        } else if (this.state.name.length > 3 && this.state.salary === '') {
            alert('Введите, пожалуйста, зароботную плату сотрудника');
        } else if (this.state.name.length < 3 && this.state.salary !== '') {
            alert('Введите, пожалуйста, имя сотрудника (больше 3 символов)');
        } else {
            alert('Введите, пожалуйста, имя сотрудника (больше 3 символов) и его з/п');
        }
    }

    render() {
        const { name, salary } = this.state;

        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex"
                    onSubmit={this.submit}>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Как его зовут?"
                        name='name'
                        value={name}
                        onChange={this.onValueChange} />
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?"
                        name='salary'
                        value={salary}
                        onChange={this.onValueChange} />

                    <button type="submit"
                        className="btn btn-outline-light">Добавить</button>
                </form>
            </div>
        );
    }
}

export default EmployersAddForm;