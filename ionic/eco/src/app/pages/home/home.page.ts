import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from '../../services/storage.service';
import { AuthConstants } from '../../config/auth-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
userData = null;

  constructor(private route: ActivatedRoute, private authService: AuthService,
              private storageService: StorageService) { }

  ngOnInit() {
     this.userData = this.route.snapshot.data.userData;
  }
  ionViewWillEnter() {
     this.userData = this.route.snapshot.data.userData;
    // console.log(this.authService.userData$.getValue());

  }

  unread() {
    console.log('item');
  }

}
