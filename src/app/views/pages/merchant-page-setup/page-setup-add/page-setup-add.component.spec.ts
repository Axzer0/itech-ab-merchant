import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PageSetupAddComponent} from './page-setup-add.component';

describe('PageSetupAddComponent', () => {
	let component: PageSetupAddComponent;
	let fixture: ComponentFixture<PageSetupAddComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PageSetupAddComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PageSetupAddComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
