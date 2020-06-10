import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }
  toggleSideBar() {
    this.toggleSideBarForMe.emit();
  }
  logout(){
    this.authService.logout();
  }

}
