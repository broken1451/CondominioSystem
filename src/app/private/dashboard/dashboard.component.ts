import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User, UserLogin } from '../interfaces/userInterface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public users!: User[];
  public userLogged!: UserLogin;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userLogged = JSON.parse(localStorage.getItem('usuario')!);
    console.log(this.userLogged)
    this.getUsers();
  }

  getUsers(){
    this.userService.getUser().subscribe(users=>{
      this.users = users.users.map((users:User) => {
        console.log('jeje',{users})
        users.created.toString()
        return users
      });
      console.log({users})
    })
  }

  deleteUser(userDeleted: User): boolean{
    console.log('delete ', userDeleted)
    console.log('   this.userLogged  ', {logge: this.userLogged} )
    if (userDeleted._id === this.userLogged.userLogin._id ) {
      Swal.fire('error', `El usuario ${userDeleted.name} esta logueado, no puede eliminarse a si mismo`, 'warning');
      console.log('no puedes eliminarte a ti mismo')
      return false
    } else{
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
            // const userDeleted =  await this.userservice.deleteUser(user).toPromise();
            console.log({userDeleted});
            if (userDeleted) {
              // Swal.fire({
              //   title: '',
              //   text: 'El usuario fue borrado exitosamente',
              //   confirmButtonColor: '#3085d6',
              //   cancelButtonColor: '#d33',
              //   icon: 'success',
              //   confirmButtonText: 'ok!',
              // });
              // this.getAllUsers();
            } else {
              return false;
            }
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelado', 'El Usuario ' + userDeleted.name + ' esta a salvo :)', 'info');
          }
          return true
      });
      return true
    }
  }
}
