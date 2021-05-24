import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-content-element',
  templateUrl: './content-element.component.html',
  styleUrls: ['./content-element.component.css']
})
export class ContentElementComponent implements OnInit {

  @Input() element: { title: string, icon: string, children: [] };

  constructor() { }

  ngOnInit(): void {
  }


}
