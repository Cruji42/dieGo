import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ForgetComponent>,) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
