import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Todo, ITodo } from './../../shared/todo.model';



@Component({
	selector: 'my-todo-form',
	templateUrl: './todo-form.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodoFormComponent implements OnChanges {
	@Input() todo: ITodo;
	@Output() created: EventEmitter<Todo>;
	title: string;
	textButton: string;

	constructor() {
		this.created = new EventEmitter<Todo>();
		this.textButton = 'Add';
	}

	create(title: string): void {
		if (title) {
			let todo = new Todo(title);
			todo.done = this.todo ? this.todo.done : false;
			this.created.emit(todo);
			this.textButton = 'Add';
			this.title = undefined;
		} else {
			alert('Enter something');
		}
	}

	ngOnChanges(): void {
		if (this.todo) {
			this.title = this.todo.title;
			this.textButton = 'Save';
		}
	}
};
