import React, { Component } from 'react';
import './index.css';

class TaskCard extends Component {
    state = {
        isChecked: false,
        isEdit: false,
        editText: ''
    }

    onEditingText = (event) => {
        this.setState({ editText: event.target.value });
    }

    onChecked = () => {
        this.setState(prevState => ({ isChecked: !prevState.isChecked }));
    }

    delete = () => {
        const { onDelete, each } = this.props;
        const { id } = each;
        onDelete(id);
    }

    toggleEdit = () => {
        this.setState(prevState => ({
            isEdit: !prevState.isEdit,
            editText: this.props.each.todoItem
        }));
    }

    saveEdit = () => {
        const { onEdit, each } = this.props;
        const { id } = each;
        const { editText } = this.state;
        const item = { id, text: editText };
        onEdit(item);
        this.setState({ isEdit: false });
    }

    render() {
        const { isChecked, isEdit, editText } = this.state;
        const { each } = this.props;
        const { todoItem, id } = each;

        return (
            <div className='todoTable'>
                <div className='card1'>
                    <input onClick={this.onChecked} className='' id={id} type='checkbox' />
                    {isEdit ?
                        <input className='editTextCard' value={editText} onChange={this.onEditingText} type="text" /> :
                        <label onClick={this.onChecked} className={`taskLabel ${isChecked && 'checkedStyle'}`} htmlFor={id}>{todoItem}</label>
                    }
                </div>
                <div className='btnCard'>
                    {isEdit ?
                        <button onClick={this.saveEdit} type='button'>Save</button> :
                        <button onClick={this.toggleEdit} type='button'>Edit</button>
                    }
                    <button onClick={this.delete} type='button'>Delete</button>
                </div>
            </div>
        );
    }
}

export default TaskCard;
