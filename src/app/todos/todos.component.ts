import { Component, OnInit } from '@angular/core';

import { ITodo } from './../shared/todo.model';
import { TodoService } from './../shared/todo.service';


@Component({
	selector : 'my-todos',
	templateUrl : './todos.component.html'
})

export class TodosComponent implements OnInit {
	todos: ITodo[];
	todoService: TodoService;
	oldId: any;
	updateTodo: ITodo;

	constructor(todoService: TodoService) {
		this.todos = [];
		this.todoService = todoService;
		this.oldId = false;
	}

	changeData(todo: ITodo) {
	    this.updateTodo = todo;
	}

	ngOnInit() {
		this.getTodos();
	}

	onTodoCreated(todo: ITodo): void {
		if (this.oldId !== false) {
			this.todos.splice(this.oldId, 1, todo);
			this.oldId = false;
		} else {
			this.todos.push(todo);
		}
		this.todoService.saveTodos(this.todos);
		this.getTodos();
	}

	onTodoToggled(todo: ITodo): void {
		let id = this.todos.indexOf(todo);
		todo.done = !todo.done;
		this.todos.splice(id, 1, todo);
		this.todoService.saveTodos(this.todos);
		this.getTodos();
	}

	onTodoDeleted(todo: ITodo): void {
		if (this.oldId !== false) {
			alert('First save change todos');
		} else {
			let id = this.todos.indexOf(todo);
			this.todos.splice(id, 1);
			this.todoService.saveTodos(this.todos);
			this.getTodos();
		}
	}

	onTodoUpdated(todo: ITodo): void {
		let id = this.todos.indexOf(todo);
		this.oldId = id;
		this.changeData(todo);
	}

	private getTodos(): void {
		this.todos = this.todoService.getTodos();
	}
}
