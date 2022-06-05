import {SelectionModel} from '@angular/cdk/collections';
import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
	name: string;
	sn: number;
	weight: number;
	symbol: string;
}



@Component({
  selector: 'kt-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit {

	@Input('columns') 	columns: string[]
	@Input('data') data: any;
	@Input('select') select: boolean;
	@Input('view') view: boolean;

	dataSource = new MatTableDataSource<any>();
	selection = new SelectionModel<any>(true, []);
	displayedColumns = []
  constructor() { }

  ngOnInit() {
		this.manageColumns();
		this.dataSource.data = this.data;
		console.log(this.data)
  }

	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		if (this.isAllSelected()) {
			this.selection.clear();
			return;
		}

		this.selection.select(...this.dataSource.data);
	}

	/** The label for the checkbox on the passed row */
	checkboxLabel(row?: any): string {
		if (!row) {
			return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.sn + 1}`;
	}

	manageColumns(){
		this.displayedColumns = [];
		if (!this.select && !this.view){
			this.displayedColumns = this.columns
			return;
		}
		if (this.select){
			this.displayedColumns = ['select'];
			this.displayedColumns = [...this.displayedColumns,...this.columns]
			if (this.view){
				this.displayedColumns.push('action')
			}
		} else {
			this.displayedColumns = this.columns;
			this.displayedColumns.push('action')
		}
		console.log(this.displayedColumns)
	}

	test(val){

	}

}
