import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {

  }

  toggled: string = "";
  toggleMenu(e: Event) {
    e.preventDefault();
    if (this.toggled == "")
      this.toggled = "toggled";
    else this.toggled = "";
  }

}
