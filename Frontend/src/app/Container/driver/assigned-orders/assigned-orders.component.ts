import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from '../../../Services/Driver/orders.service';
import { ResourceAllocation } from '../../../Models/ResourceAllocation.model';
import { AuthService } from '../../../Services/Common/auth.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assigned-orders',
  templateUrl: './assigned-orders.component.html',
  styleUrl: './assigned-orders.component.scss',
})
export class AssignedOrdersComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'id',
    'cname',
    'cphone',
    'caddress',
    'vehicle',
    'action',
  ];
  resources: ResourceAllocation[] = [];
  dataSource: MatTableDataSource<ResourceAllocation>;
  selectedOrder: ResourceAllocation = null;

  constructor(
    private orderService: OrdersService,
    private _liveAnnouncer: LiveAnnouncer,
    private authService: AuthService
  ) {}

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.getAssignedOrder();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAssignedOrder(): void {
    this.orderService
      .getAssignedOrders(this.authService.getUserId())
      .subscribe({
        next: (response) => {
          console.log(response);
          this.resources = response.data as ResourceAllocation[];
          this.dataSource = new MatTableDataSource(this.resources);
          this.dataSource.sort = this.sort;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
