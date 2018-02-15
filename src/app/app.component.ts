import { Component} from '@angular/core';


import '../style/app.scss';

@Component({
	selector: 'my-app',
	templateUrl: './app.component.html'
})


export class AppComponent {
	title: string;
	constructor () {
		this.title = 'Angular2 TODO List';
	}
};
