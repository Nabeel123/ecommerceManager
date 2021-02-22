interface Todo {
    text: string;
    completed: boolean;
}

interface ClientInformation {
    name: string;
    experience: string;
    attending: boolean;
}

type AddClient = (name: string, experience: string, attending: false) => void;

type ToggleTodo = (selectedTodo: Todo) => void;
type AddTodo = (text: string) => void;