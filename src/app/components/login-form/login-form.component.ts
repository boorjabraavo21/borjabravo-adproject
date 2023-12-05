import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredentials } from 'src/app/interfaces/user-credentials';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent  implements OnInit {

  form:FormGroup | null = null
  @Input('username') set username (value:string) {
    this.form?.controls['username'].setValue(value)
  }

  @Output() onsubmit = new EventEmitter<UserCredentials>()

  constructor(
    private formBuilder:FormBuilder
  ) { 
    this.form = formBuilder.group( {
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    this.onsubmit.emit(this.form?.value)
    this.form?.controls['password'].setValue('')
  }

}
