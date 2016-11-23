import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';

import { CreateService } from './create.service';

import { ConfirmationService, Message } from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'create-comp',
  styleUrls: ['./create.comp.css'],
  templateUrl: './create.comp.html'
})

export class CreateComp {

  public requestForm: FormGroup;
  public requestLawForm: FormGroup;

  private files: Array<any>;
  private notifications: Message[];

  constructor(private _service: CreateService, private fb: FormBuilder, private confService: ConfirmationService) {
    // Form for usual persons
    this.requestForm = fb.group({
      'organizer': fb.group({
        'name': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'surname': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'person_code': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
        'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        'phone': ['', Validators.compose([Validators.minLength(8), Validators.pattern('^[0-9]+$')])]
      }),
      'guard': fb.group({
        'name': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'surname': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'person_code': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
        'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        'phone': ['', Validators.compose([Validators.minLength(8), Validators.pattern('^[0-9]+$')])]
      }),
      'social_guard': fb.group({
        'name': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'surname': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'person_code': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
        'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        'phone': ['', Validators.compose([Validators.minLength(8), Validators.pattern('^[0-9]+$')])]
      }),
      'support': fb.group({
        'name': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'surname': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'person_code': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
        'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        'phone': ['', Validators.compose([Validators.minLength(8), Validators.pattern('^[0-9]+$')])]
      }),
      'description': ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
      'start_date': ['', Validators.required],
      'end_date': ['', Validators.required],
      'start_time': ['', Validators.required],
      'end_time': ['', Validators.required],
      'visitors': ['', Validators.compose([Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]+$')])],
      'participiants': ['', Validators.compose([Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]+$')])],
      'dangerous': ['', Validators.maxLength(250)],
      'gov_callback': ['', Validators.maxLength(250)]
    });
    // Form for law persons
    this.requestLawForm = fb.group({
      'organizer': fb.group({
        'law_name': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'register_code': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
        'law_address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        'phone': ['', Validators.compose([Validators.minLength(8), Validators.pattern('^\d+$')])]
      }),
      'guard': fb.group({
        'name': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'surname': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'person_code': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
        'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        'phone': ['', Validators.compose([Validators.minLength(8), Validators.pattern('^\d+$')])]
      }),
      'social_guard': fb.group({
        'name': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'surname': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'person_code': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
        'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        'phone': ['', Validators.compose([Validators.minLength(8), Validators.pattern('^\d+$')])]
      }),
      'support': fb.group({
        'name': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'surname': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'person_code': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
        'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        'phone': ['', Validators.compose([Validators.minLength(8), Validators.pattern('^\d+$')])]
      }),
      'description': ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
      'start_date': ['', Validators.required],
      'end_date': ['', Validators.required],
      'start_time': ['', Validators.required],
      'end_time': ['', Validators.required],
      'visitors': ['', Validators.compose([Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]+$')])],
      'participiants': ['', Validators.compose([Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]+$')])],
      'dangerous': ['', Validators.maxLength(250)],
      'gov_callback': ['', Validators.maxLength(250)]
    });
    this.notifications = [];
  }

  public ngOnInit(): void { }

  public ngOnDestroy(): void { }

  private getBinaries(event): void {
    console.log(event);
  }

  private test() {
    let test_object = {
      address: "Imantas kultūras centrs",
      dangerous: "tekts",
      description: "Party   \"RedHeads\"↵Ballīte↵Pārveidot ballīte↵",
      end_date: null,
      end_time: null,
      gov_callback: "tekts",
      guard: {
        address: "Lāčplēša iela 91",
        name: "Sofija",
        person_code: "011291-12993",
        phone: "27991003",
        surname: "Zvaigzne",
      },
      organizer: {
        address: "Slokas iela 108",
        name: "Aleksandrs",
        person_code: "210395-17440",
        phone: "20220491",
        surname: "Baluhins"
      },
      participiants: "30",
      social_guard: {
        address: "Sadovaja ulica 1",
        name: "Viktors",
        person_code: "290180-12099",
        phone: "20000011",
        surname: "Burdžanadze"
      },
      start_date: null,
      start_time: null,
      support: {
        address: "Piedrujas iela 90",
        name: "Anna",
        person_code: "010191-23310",
        phone: "20175342",
        surname: "Mammadzada"
      },
      visitors: "201"
    };
    this.requestForm.setValue(test_object);
  }

  private formSubmit(values: any) {
    this.confService.confirm({
      message: 'Jūs tieši gribāt turpināt?',
      accept: () => {
        this._service.sendData(values)
          .subscribe(res => {
            if (res.hasOwnProperty('success')) {
              this.notifications.push({ severity: 'success', detail: res['success'] });
            } else {
              this.notifications.push({ severity: 'error', detail: res['error'] });              
            }
          });
      }
    });
  }
}