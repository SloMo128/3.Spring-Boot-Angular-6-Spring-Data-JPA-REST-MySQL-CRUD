import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  collapsed: boolean = true;
  ngOnInit() {}
}