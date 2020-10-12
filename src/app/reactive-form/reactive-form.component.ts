import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';

function asyncValidators(ctrl: AbstractControl): Promise<any> {
  const val = ctrl.value;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(val === 'as' ? null : { validpass: true });
    }, 3000);
  });
}
function areTheyEqual(g: FormGroup): any {
  return g.get('pass').value === g.get('conPass').value ? null : { confirm: true };
}
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {

  loginGroup: FormGroup = this.fb.group({
    pass: ['',
      {
        validators: Validators.compose([Validators.required, Validators.maxLength(3), Validators.pattern('[a-z]*')]),
        asyncValidators: Validators.composeAsync([asyncValidators]),
        updateOn: 'blur'
      }
    ],
    conPass: ['', Validators.required]
  }, {
    validators: Validators.compose([areTheyEqual])
  });

  get pass(): AbstractControl {
    return this.loginGroup.get('pass');
  }
  get conPass(): AbstractControl {
    return this.loginGroup.get('conPass');
  }
  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {

  }
  login(): void {
    console.log(this.loginGroup.value);
  }

}
