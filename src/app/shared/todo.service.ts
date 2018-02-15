import { Injectable } from '@angular/core';
import { ITodo } from './todo.model';


@Injectable()
export class TodoService {

	getTodos() {
		let todos = new Array;
	    let todos_str = localStorage.getItem('todo');
	    if (todos_str !== null) {
	        todos = JSON.parse(todos_str);
	    }

	    return todos;
	}

	saveTodos(todos: ITodo[]) {
		localStorage.setItem('todo', JSON.stringify(todos));

		return false;
	}
}
