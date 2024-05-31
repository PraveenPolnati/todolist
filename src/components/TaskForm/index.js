import { Component } from 'react'
import {v4 as uuidv4} from 'uuid'
import TaskCard from '../TaskCard'
import './index.css'

class TaskForm extends Component{

    state = {todoItemList:[],isTodo:false,todoItem:'',warningText:''}

    componentDidMount(){
        const savedTasks = localStorage.getItem('todoItemList')
        if(savedTasks){
            this.setState({todoItemList:JSON.parse(savedTasks)})
        }
    }
    
    componentDidUpdate(prevProps,prevState){
        if(prevState.todoItemList!==this.state.todoItemList){
            localStorage.setItem('todoItemList',JSON.stringify(this.state.todoItemList))
        }
    }

    

    onDelete = (id)=>{
        const {todoItemList} = this.state
        const NewList = todoItemList.filter(each=>each.id!==id)
        console.log(NewList)
        this.setState({todoItemList:NewList})
    }

    onEdit = (item)=>{
        const {id,text} = item
        console.log(item)
        const {todoItemList} = this.state
        const NewList = todoItemList.map(each=> 
        {if(each.id===id){
            return  {todoItem:text,id}
        }return each
    })
    this.setState({todoItemList:NewList})
    }

    onEnterTodoItem = (event)=>{
        this.setState({todoItem:event.target.value})
    }
    
    onSubmit = (event)=>{
        event.preventDefault()
        const{todoItemList,todoItem} = this.state
        if(todoItem === ''){
            this.setState({warningText:'Please Enter Text'})
        }else{
            this.setState(preState=>({todoItemList:[...todoItemList,{todoItem,id:uuidv4()}],todoItem:'',warningText:'',isEmpty:false}))
        }
    }

    render(){
        const {todoItemList,todoItem,warningText} = this.state
        return(
            <>
                <form onSubmit={this.onSubmit} className='form'>
                    <input value={todoItem} onChange={this.onEnterTodoItem} className='inputEle' type='text' placeholder='enter task here'/>
                    <br/>
                    <br/>
                    <button type='submit'>save</button>
                    <p>{warningText}</p>
                </form>
                <ul>
                {
                    todoItemList.map(each=><TaskCard onEdit={this.onEdit} onDelete={this.onDelete} each={each} key={each.id}/>)
                }
                </ul>
            </>

        )
    }
}

export default TaskForm