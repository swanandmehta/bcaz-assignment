import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private authService: KeycloakService) { }

  ngOnInit(): void {

  }

  logout(): void {
    this.authService.logout(environment.loginUrl);
  }

}
