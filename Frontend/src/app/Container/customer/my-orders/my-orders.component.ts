import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OrderService } from '../../../Services/Customer/order.service';
import { Order } from '../../../Models/Order.model';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }
// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})

export class MyOrdersComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['pName', 'quantity', 'total', 'oDate'];
  orders: Order[] = [];
  dataSource: MatTableDataSource<Order>;

  constructor(private _liveAnnouncer: LiveAnnouncer, private orderService: OrderService) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getMyOrders();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getMyOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (response) => {
        this.orders = response.data as Order[];
        console.log(this.orders);
        
        this.dataSource = new MatTableDataSource(this.orders);
        this.dataSource.sort = this.sort;
      }, error: (error) => {
        console.log(error);
      }
    })
  }


  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
