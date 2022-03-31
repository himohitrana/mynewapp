import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Amount } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-custom-value',
  templateUrl: './custom-value.component.html',
  styleUrls: ['./custom-value.component.css'],
})
export class CustomValueComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CustomValueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Amount
  ) {}

  ngOnInit(): void {}
}
