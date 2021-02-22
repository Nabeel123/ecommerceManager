import React, { Fragment, useState } from 'react';
import { AddClientForm } from './components/AddClientForm';
import { ClientList } from './components/ClientList';
import Header from './components/Headers';
import useLocalStorage from './useLocalStorage.js';
// import { AddTodoForm } from './components/AddTodoForm';
// import { TodoList } from './components/TodoList';

// const intialState: Todo[] = [
//   {text:"Cooking", complete:false},
//   {text:"Swimming", complete:false}
// ];

// const initialState: Todo[] = [
//   {text: "Buying Laptop", completed: false},
// ];


// const initialClientList: ClientInformation[] = [
//   { name: "Nabeel", experience: "4", attending: false },
//   { name: "Lyra", experience: "2", attending: true }
// ];

function App() {
  // const [clients, setClients] = useState(initialClientList);
  // const [todos, setTodos] = useState(initialState);

  // const toggleTodo = (selectedTodo: Todo) => {
  //   const newTodos = todos.map(todo=> {
  //     if(todo === selectedTodo) {
  //         return {
  //           ...todo,
  //           completed: !todo.completed
  //         }
  //     }
  //     return todo;
  //   });
  //   setTodos(newTodos);
  // } 

  // const addTodo: AddTodo = (text: string) => {
  //   const newTodo = {text, completed:false };
  //   setTodos([...todos, newTodo ]);
  // }


  // const addClient : AddClient = (name: string, experience: string) => {
  //   const newClient = {name, experience, attending:false};
  //   setClients([...clients, newClient]);
  // }

const [name, setName] = useLocalStorage('name', '');

  return (
    <Fragment>
    <>
    <Header/>

    <input type="text" value={name} onChange={e => setName(e.target.value) } />
    {/* <ClientList clients={ clients } />
    <AddClientForm addClient={addClient} /> */}
    {/* <TodoList todos={todos} toggleTodo={toggleTodo} />
    <AddTodoForm  addTodo={addTodo} /> */}
    </>
    </Fragment>
  );
}

export default App;