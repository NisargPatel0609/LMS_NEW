import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inventory } from '../../../Models/Inventory.model';
import { Order } from '../../../Models/Order.model';
import { AddOrderService } from '../../../Services/Customer/add-order.service';
import { UserService } from '../../../Services/Common/user.service';
import { AddressService } from '../../../Services/Customer/address.service';
import { User } from '../../../Models/User.model';
import { Address } from '../../../Models/Address.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  orderDetails: Inventory;
  user: User;
  addressId: number;
  userAddress: Address;
  order: Order;

  constructor(private route: ActivatedRoute, private addOrderService: AddOrderService, private userService: UserService, private addressService: AddressService, private router: Router) {}

  ngOnInit(): void {
    this.orderDetails = history.state.inventory;
    console.log(this.orderDetails); // Output the received orderDetails data
    this.getUser();
  }
  
  // Get User By id
  getUser() {
    this.userService.getUserById(6).subscribe(
      response => {
        console.log(response);
        this.user = response.data as User;
        this.addressId = +this.user.addressId;
        
        // fetching the address of the user
        this.getAddress(this.addressId);
      },
      error => {
        console.log(error);
      }
    )
  }

  // Get Address of a User 
  getAddress(addressId) {
    this.addressService.getAddressById(addressId).subscribe(
      response => {
        console.log(response);
        this.userAddress = response.data as Address;
      },
       error => {
        console.log(error);
       }
    )
  }


  // Place Order
  placeOrder(orderId: number) : void {
      // this.addOrderService.addOrder(this.order).subscribe(
      //   response => {
      //     console.log('Order placed successfully:', response);
      //   },
      //   error => {
      //     console.error('Error placing order:', error);
      //   }
      // )
      this.router.navigate(['customer/my-orders']);
  }
}
