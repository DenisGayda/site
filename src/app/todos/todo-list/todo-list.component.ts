import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ITodo } from './../../shared/todo.model';



@Component({
	selector: 'my-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent {
	@Input() todos: ITodo[];
	@Output() toggled: EventEmitter<ITodo>;
	@Output() deleted: EventEmitter<ITodo>;
	@Output() updated: EventEmitter<ITodo>;

	constructor() {
		this.toggled = new EventEmitter<ITodo>();
		this.deleted = new EventEmitter<ITodo>();
		this.updated = new EventEmitter<ITodo>();
	}

	get sortedTodos(): ITodo[] {
		return this.todos.map((todo) => todo)
		.sort((a, b) => {
			if (a.title > b.title) {
				return 1;
			} else if (a.title < b.title) {
				return -1;
			} else {
				return 0;
			};
		})
		.sort((a, b) => {
			if (a.done && !b.done) {
				return 1;
			} else if (!a.done && b.done) {
				return -1;
			} else {
				return 0;
			}
		});
	}

	onTodoToggled(todo: ITodo): void {
		this.toggled.emit(todo);
	}

	onTodoDeleted(todo: ITodo): void {
		this.deleted.emit(todo);
	}

	onTodoUpdated(todo: ITodo): void {
		this.updated.emit(todo);
	}
};
