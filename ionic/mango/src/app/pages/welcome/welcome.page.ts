import { Component, OnInit } from '@angular/core';
import { AuthConstants } from './../../config/auth-constants';
import { ToastService } from '../../services/toast.service';
import { StorageService } from './../../services/storage.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService: ToastService) { }
    public postData = {
      username: '',
      password: '',
    };
  ngOnInit() {
  }
  loginAction() {
    this.router.navigate(['login']);
    
  }

  
}
