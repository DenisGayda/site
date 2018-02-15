
import { TodosComponent } from './todos.component';


import { TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { TodoService } from './../shared/todo.service';

describe('Component: TodoApp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosComponent ],
      providers: [TodoService ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    });
  });

  it('TodosComponent OnInit', inject([TodoService], (todoService: TodoService) => {
    let component = new TodosComponent(todoService);
    let todos = [];
    let todos_str = localStorage.getItem('todo');
    if (todos_str !== null) {
      todos = JSON.parse(todos_str);
    }
    component.ngOnInit();

    expect(component.todos).toEqual(todos);
  }));

  it('TodosComponent todo Create', inject([TodoService], (todoService: TodoService) => {
    let component = new TodosComponent(todoService);
    localStorage.clear();
    let todo = {'title': 'test', 'done': false};
    component.onTodoCreated(todo);

    expect(component.todos).toEqual([todo]);

  }));

  it('TodosComponent todo Delete', inject([TodoService], (todoService: TodoService) => {
    let component = new TodosComponent(todoService);
    let todo1 = {'title': 'test1', 'done': false};
    component.onTodoCreated(todo1);
    component.onTodoDeleted(todo1);
    let test1  = component.todos.indexOf(todo1);

    expect(test1).toBe(-1);
  }));

  it('TodosComponent todo Toggled', inject([TodoService], (todoService: TodoService) => {
    let component = new TodosComponent(todoService);
    localStorage.clear();
    let todo = {'title': 'testToggled', 'done': false};
    component.onTodoCreated(todo);
    let doneBefore  = component.todos[0].done;
    component.onTodoToggled(todo);
    let doneAfter  = component.todos[0].done;

    expect(doneBefore).toBe(!doneAfter);
  }));

   it('TodosComponent todo Update', inject([TodoService], (todoService: TodoService) => {
    let component = new TodosComponent(todoService);
    localStorage.clear();
    let todo = {'title': 'testToggled', 'done': false};
    let newTodo = {'title': 'UpdateTodo', 'done': false};
    component.onTodoCreated(todo);
    component.oldId = 0
    component.onTodoCreated(newTodo);
    let title  = component.todos[0].title;

    expect(title).toBe('UpdateTodo');
  }));
});
