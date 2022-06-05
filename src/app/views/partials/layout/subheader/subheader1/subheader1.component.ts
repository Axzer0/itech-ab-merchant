// Angular
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
// RxJS
import { Subscription } from 'rxjs';
// Layout
import { SubheaderService } from '../../../../../core/_base/layout';
import { Breadcrumb } from '../../../../../core/_base/layout/services/subheader.service';

@Component({
	selector: 'kt-subheader1',
	templateUrl: './subheader1.component.html',
	styleUrls: ['./subheader1.component.scss']
})
export class Subheader1Component implements OnInit, OnDestroy, AfterViewInit {
	// Public properties
	@Input() fluid: boolean;
	@Input() clear: boolean;

	today: number = Date.now();
	title = '';
	desc = '';
	breadcrumbs: Breadcrumb[] = [];



	// Public properties

	// Set icon class name
	@Input() icon = 'flaticon2-search-1'; 

	// Set true to icon as SVG or false as icon class
	@Input() useSVG: boolean;

	@ViewChild('searchInput', {static: true}) searchInput: ElementRef;

	data: any[];
	result: any[];
	loading: boolean;






	// Private properties
	private subscriptions: Subscription[] = [];

	/**
	 * Component constructor
	 *
	 * @param subheaderService: SubheaderService
	 */
	constructor(
		public subheaderService: SubheaderService,
		private cdr: ChangeDetectorRef
		) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	
	ngOnInit() {

		// below method was added for search option
		this.searchFieldMethods();

	}

	// search methods begins

	searchFieldMethods() {
		// simulate result from API
		// type 0|1 as separator or item
		this.result = [
			{
				text: 'Documents',
				type: 0
			}, {
				icon: '<i class="flaticon-interface-3 kt-font-warning">',
				text: 'Annual finance report',
				type: 1
			}, {
				icon: '<i class="flaticon-share kt-font-success"></i>',
				text: 'Company meeting schedule',
				type: 1
			}, {
				icon: '<i class="flaticon-paper-plane kt-font-info"></i>',
				text: 'Project quotations',
				type: 1
			}, {
				text: 'Customers',
				type: 0
			}, {
				img: '<img src="assets/media/users/user1.jpg" alt="">',
				text: 'Amanda Anderson',
				type: 1
			}, {
				img: '<img src="assets/media/users/user2.jpg" alt="">',
				text: 'Kennedy Lloyd',
				type: 1
			}, {
				img: '<img src="assets/media/users/user3.jpg" alt="">',
				text: 'Megan Weldon',
				type: 1
			}, {
				img: '<img src="assets/media/users/user4.jpg" alt="">',
				text: 'Marc-André ter Stegen',
				type: 1
			}, {
				text: 'Files',
				type: 0
			}, {
				icon: '<i class="flaticon-lifebuoy kt-font-warning"></i>',
				text: 'Revenue report',
				type: 1
			}, {
				icon: '<i class="flaticon-coins kt-font-primary"></i>',
				text: 'Anual finance report',
				type: 1
			}, {
				icon: '<i class="flaticon-calendar kt-font-danger"></i>',
				text: 'Tax calculations',
				type: 1
			}
		];
	}


	/**
	 * Search
	 * @param e: Event
	 */
	search(e) {
		this.data = null;
		if (e.target.value.length > 2) {
			this.loading = true;
			// simulate getting search result
			setTimeout(() => {
				this.data = this.result;
				this.loading = false;
				this.cdr.markForCheck();
			}, 500);
		}
	}

	/**
	 * Clear search
	 *
	 * @param e: Event
	 */
	clearSearch(e) {
		this.data = null;
		this.searchInput.nativeElement.value = '';
	}

	openChange() {
		setTimeout(() => this.searchInput.nativeElement.focus());
	}

	//search field methos ends

	/**
	 * After view init
	 */
	

	 setDynamicSubMenuTitle() {
		this.subscriptions.push(this.subheaderService.title$.subscribe(bt => {
			// breadcrumbs title sometimes can be undefined
			if (bt) {
				Promise.resolve(null).then(() => {
					this.title = bt.title;
					console.log('title::: ', this.title);
					this.desc = bt.desc;
				});
			}
		}));

		this.subscriptions.push(this.subheaderService.breadcrumbs$.subscribe(bc => {
			Promise.resolve(null).then(() => {
				this.breadcrumbs = bc;
			});
		}));
	 }
	 // this methiod is implemented from ngOnInit hook

	ngAfterViewInit(): void {
		//for dynamic sub menu title
		this.setDynamicSubMenuTitle();
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}
}
