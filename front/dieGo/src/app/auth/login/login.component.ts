import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ForgetComponent } from '../forget/forget.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ForgetComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
