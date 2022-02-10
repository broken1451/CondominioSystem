import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User, UserLogin, UserUpdate, UserResponse, UserUpdateResponse } from '../interfaces/userInterface';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/components/services/auth-service.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public users!: User[];
  public user!: UserUpdate;
  public userLogged!: UserLogin;
  public form!: FormGroup;
  public OldValue!: string;

  get formUpdate() {
    return this.form.controls;
  }

  constructor(private userService: UserService, private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['test@test.com',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      name: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.userLogged = JSON.parse(localStorage.getItem('usuario')!);
    console.log(this.userLogged)
    $('#myModal').modal({
      backdrop: false,
      show: false
    })
    this.getUsers();
    this.authService.cargarStorage();

    // this.formUpdate.name
    // .valueChanges
    // .subscribe(selectedValue => {
    //   console.log('New Value: ', selectedValue);       // New value
    //   console.log('Old Value: ', this.form.value['name']); // old value
    //   this.OldValue =  this.form.value['name'];
    //  });
  }

  getUsers() {
    try {
      this.userService.getUser().subscribe((users: UserResponse) => {
        this.users = users.users.map((users: User) => {
          // console.log({ users })
          return users
        });
      })
    } catch (error) {
      console.log({ error })
    }
  }

  deleteUser(userDeleted: User): boolean {
    try {
      if (userDeleted._id === this.userLogged.userLogin._id) {
        Swal.fire('error', `El usuario ${userDeleted.name} esta logueado, no puede eliminarse a si mismo`, 'warning');
        return false
      } else {
        Swal.fire({
          title: 'Esta seguro?',
          text: 'Borrara el usurio ' + userDeleted.name,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          icon: 'warning',
          confirmButtonText: 'Si!'
        }).then((result) => {
          if (result.value) {
            this.userService.deleteUser(userDeleted).subscribe(() => {
              Swal.fire({
                title: '',
                text: 'El usuario fue borrado exitosamente',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                icon: 'success',
                confirmButtonText: 'ok!',
              });
              this.getUsers();
              return true;
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelado', 'El Usuario ' + userDeleted.name + ' esta a salvo :)', 'info');
          }
          return true
        });
        return true
      }
    } catch (error) {
      console.log(error);
    }
    return true
  }


  updateUser() {
    try {
      this.user.name = this.formUpdate.name.value;
      this.user.email = this.formUpdate.email.value;
      $('#myModal').modal('hide');
      this.userService.updateUser(this.user)?.subscribe((updateUser: UserUpdateResponse) => {
        Swal.fire({
          title: 'Actualizado existosamente',
          text: `Usuario  ${updateUser.userSaved.name} existosamente actualizado `,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          icon: 'success',
          confirmButtonText: 'ok!',
          showCancelButton: false,
          allowOutsideClick: false,
        });
      })
    } catch (error) {
      console.log({ error })
    }
  }

  update(user: User) {
    try {
      console.log({ user });
      this.user = user;
      this.form.setValue({
        name: user.name,
        email: user.email || 'test@test.com',
      });
    } catch (error) {
      console.log(error);
    }
  }

  gotoProfile(user: User){
    // this.router.navigate([`/private/profile/${user._id}`],{skipLocationChange:true})
    this.router.navigate([`/private/profile/`, user._id],{skipLocationChange:false})
    // this.router.navigate(['/private/profile'],{queryParams:{
    //   id: user._id
    // },skipLocationChange:true});   
    // this.router.navigate(['/private/profile'],{state:{user}});
    // this.router.navigate(['/private/profile'],{state:{user}});// capturar info mediante otra forma al activate route
    // this.router.navigate(['/private/profile', user._id],{skipLocationChange:true,fragment:'top',preserveFragment: true})
  }

}
