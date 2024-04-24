import { Component, OnChanges, OnInit } from '@angular/core';
import { Inventory } from '../../../Models/Inventory.model';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../../../Services/Manager/inventory.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  inventory: Inventory;
  productId: number;

  constructor(
    private inventoryService: InventoryService, private route: ActivatedRoute, private router: Router
  ) {}

  ngOnInit(): void {    
    this.getInventory();
  }

  getInventory(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id']; // Convert id to number
      this.inventoryService.getInventoryDetails(this.productId).subscribe({
        next:(res) => {          
          this.inventory = res.data as Inventory;  // Assign the data to the inventory variable     
          console.log(this.inventory);
        },
        error: (error) => {
          console.error('Error fetching inventory details:', error);
        }
      } );
    });
  }

  buyNow(id:any): void {
    this.router.navigate(['customer/checkout', id], { state: { inventory: this.inventory } });
  }
}
