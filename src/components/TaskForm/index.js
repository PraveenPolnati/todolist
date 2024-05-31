import { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'
import TaskCard from '../TaskCard'
import './index.css'

class TaskForm extends Component {
    state = { todoItemList: [], isTodo: false, todoItem: '', warningText: '' }

    componentDidMount() {
        const savedTasks = localStorage.getItem('todoItemList')
        if (savedTasks) {
            this.setState({ todoItemList: JSON.parse(savedTasks) })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.todoItemList !== this.state.todoItemList) {
            localStorage.setItem('todoItemList', JSON.stringify(this.state.todoItemList))
        }
    }

    onCheck = (id) => {
        const { todoItemList } = this.state
        const newList = todoItemList.map(each => {
            if (each.id === id) {
                return {
                    ...each,
                    isChecked: !each.isChecked
                }
            }
            return each
        })
        this.setState({ todoItemList: newList })
    }

    onDelete = (id) => {
        const { todoItemList } = this.state
        const newList = todoItemList.filter(each => each.id !== id)
        this.setState({ todoItemList: newList })
    }

    onEdit = (item) => {
        const { id, text } = item
        const { todoItemList } = this.state
        const newList = todoItemList.map(each =>
            each.id === id ? { ...each, todoItem: text } : each
        )
        this.setState({ todoItemList: newList })
    }

    onEnterTodoItem = (event) => {
        this.setState({ todoItem: event.target.value })
    }

    onSubmit = (event) => {
        event.preventDefault()
        const { todoItemList, todoItem } = this.state
        if (todoItem === '') {
            this.setState({ warningText: 'Please Enter Text' })
        } else {
            const newItem = {
                todoItem,
                id: uuidv4(),
                isChecked: false
            }
            this.setState({
                todoItemList: [...todoItemList, newItem],
                todoItem: '',
                warningText: '',
                isEmpty: false
            })
        }
    }

    render() {
        const { todoItemList, todoItem, warningText } = this.state
        return (
            <>
                <form onSubmit={this.onSubmit} className='form'>
                    <input
                        value={todoItem}
                        onChange={this.onEnterTodoItem}
                        className='inputEle'
                        type='text'
                        placeholder='enter task here'
                    />
                    <br />
                    <br />
                    <button type='submit'>save</button>
                    <p>{warningText}</p>
                </form>
                <ul>
                    {
                        todoItemList.map(each => (
                            <TaskCard
                                onCheck={this.onCheck}
                                onEdit={this.onEdit}
                                onDelete={this.onDelete}
                                each={each}
                                key={each.id}
                            />
                        ))
                    }
                </ul>
            </>
        )
    }
}

export default TaskForm
