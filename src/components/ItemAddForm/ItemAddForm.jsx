import React from 'react'
import './ItemAddForm.css'

export default class ItemAddForm extends React.Component {

    state = {
        label: ''
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.addItem(this.state.label)
        this.setState({
            label: ''
        })
    }

    render() {
        return (
            <form className="bottom-panel input-group mb-3"
                    onSubmit={this.onSubmit}
            >
                <input type="text" className="form-control" 
                    placeholder="Enter new Todo" 
                    aria-label="Example text with button addon" 
                    aria-describedby="button-addon1" 
                    onChange={this.onLabelChange}
                    value={this.state.label}
                />
                <button className="btn btn-outline-secondary" >
                    Add Todo
                </button>
            </form>
        )
    }
}