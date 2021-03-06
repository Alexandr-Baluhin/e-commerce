import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';

import { CreateService } from './create.service';
import { BackendService } from '../../../shared/services/backend.service';

import { AuthGuard } from '../../../shared/guards/auth.guard';

import { ConfirmationService, Message, SelectItem, MenuItem } from 'primeng/primeng';

const RESERVED_DATES = ['25.03', '08.05', '14.06', '04.07'];

const DATE_WARN = `
Atbilstoši publisku izklaides un svētku pasākumu drošības likumam, 4.pants:

(1) Valsts un pašvaldību iestādes publiskus pasākumus nerīko, un pašvaldība neizsniedz atļauju šādu pasākumu rīkošanai 
piemiņas dienās, kas noteiktas 25.martā, 8.maijā, 14.jūnijā un 4.jūlijā.

(2) Šā panta pirmās daļas nosacījums neattiecas uz publiskiem pasākumiem, kuru veids un mērķis 
atbilst šo piemiņas dienu raksturam.
`;

@Component({
  moduleId: module.id,
  selector: 'create-comp',
  styleUrls: ['./create.comp.css'],
  templateUrl: './create.comp.html'
})

export class CreateComp {

  private LINK_LIKUMI_TEXT: string = 'Lauki ir doti attiecīgi ar Publisku izklaides un svētku pasākumu drošības likumu';

  private isBegin: boolean;
  private formType: string;

  public requestForm: FormGroup;
  public requestLawForm: FormGroup;

  private physicalMinDate: Date;
  private physicalMaxDate: Date;

  private files: Array<File>;
  private lifeTime: number;
  private notifications: Message[];
  private steps: MenuItem[];
  private step: number;

  private locations: SelectItem[];

  private url: string = this.env['PROD']
    ? 'https://' + this.env['API'] + ':' + this.env['API_PORT'] + '/upload'
    : 'http://' + this.env['API'] + ':' + this.env['API_PORT'] + '/upload';

  constructor(private _service: CreateService,
    private fb: FormBuilder,
    private confService: ConfirmationService,
    private backend: BackendService,
    private guard: AuthGuard,
    @Inject('config') private env: Object) {
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
      'participants': ['', Validators.compose([Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]+$')])],
      'dangerous': ['', Validators.maxLength(250)],
      'gov_dangerous_response': ['', Validators.maxLength(250)],
      'email': ['', Validators.required],
      'location': ['', Validators.required],
      'persons_type': ['physical']
    });
    // Form for law persons
    this.requestLawForm = fb.group({
      'organizer': fb.group({
        'legal_name': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'register_code': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
        'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        'phone': ['', Validators.compose([Validators.minLength(8), Validators.pattern('^[0-9]+$')])]
      }),
      'guard': fb.group({
        'legal_name': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'register_code': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
        'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        'phone': ['', Validators.compose([Validators.minLength(8), Validators.pattern('^[0-9]+$')])]
      }),
      'social_guard': fb.group({
        'legal_name': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'register_code': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
        'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        'phone': ['', Validators.compose([Validators.minLength(8), Validators.pattern('^[0-9]+$')])]
      }),
      'support': fb.group({
        'legal_name': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'register_code': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
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
      'participants': ['', Validators.compose([Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]+$')])],
      'dangerous': ['', Validators.maxLength(250)],
      'gov_dangerous_response': ['', Validators.maxLength(250)],
      'email': ['', Validators.required],
      'location': ['', Validators.required],
      'persons_type': ['legal']
    });

    this.isBegin = true;
    this.files = [];
    this.lifeTime = 5000;
    this.notifications = [];
    this.steps = [];
    this.step = 0;
    this.locations = [];
  }

  public ngOnInit(): void {
    this.backend.getRequest('locations').subscribe(
      res => {
        res.forEach(el => this.locations.push({ label: el['name'], value: el['id'] }));

        this.requestForm.controls['location'].setValue(this.locations[0]['value']);
        this.requestLawForm.controls['location'].setValue(this.locations[0]['value']);
      },
      err => console.log(err));
    
    this.steps = [
      { label: 'Personas apraksts' },
      { label: 'Pasākuma informācija' },
      { label: 'Pasākuma papildinformācija' },
      { label: 'Kontaktinformācija ' }
    ];

    this.guard.secret$.subscribe(secret => {
      if (secret) {
        this.test2();
        this.test();
      }
    })
  }

  public ngOnDestroy(): void { }

  private begin(type): void {
    if (type == 'physical') {
      this.formType = type;
      this.isBegin = false;
    } else if (type == 'legal') {
      this.formType = type;
      this.isBegin = false;
    } else {
      this.isBegin = true;
    }
  }

  private nextStep(): void {
    this.step++;
  }

  private previousStep(): void {
    this.step--;
  }

  private getBinaries(event) {
    return false;
  }

  private uploadedBinaries(): void {
    console.log('uploaded!')
  }

  private test() {
    let test_object = {
      address: "Meža iela 1",
      dangerous: "tekts",
      description: "Parastais publiskais pasakums",
      end_date: new Date(2016, 10, 25),
      end_time: new Date(2016, 10, 25, 22, 30, 0),
      gov_dangerous_response: "tekts",
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
      participants: "30",
      social_guard: {
        address: "Sadovaja ulica 1",
        name: "Viktors",
        person_code: "290180-12099",
        phone: "20000011",
        surname: "Burdžanadze"
      },
      start_date: new Date(2016, 10, 24),
      start_time: new Date(2016, 10, 24, 10, 0, 0),
      support: {
        address: "Piedrujas iela 90",
        name: "Anna",
        person_code: "010191-23310",
        phone: "20175342",
        surname: "Mammadzada"
      },
      visitors: "201",
      email: "baluhins@inbox.lv",
      location: 3,
      persons_type: 'physical'
    };
    this.requestForm.setValue(test_object);
  }

  private test2() {
    let test_object = {
      address: "Meža iela 1",
      dangerous: "tekts",
      description: "Parastais publiskais pasakums",
      end_date: new Date(2016, 10, 25),
      end_time: new Date(2016, 10, 25, 22, 30, 0),
      gov_dangerous_response: "tekts",
      guard: {
        address: "Lāčplēša iela 91",
        legal_name: "Sofija Mēnese",
        register_code: "011291-12993",
        phone: "27991003"
      },
      organizer: {
        address: "Slokas iela 108",
        legal_name: "Aleksandrs Panajotovs",
        register_code: "210395-17440",
        phone: "20220491"
      },
      participants: "30",
      social_guard: {
        address: "Sadovaja ulica 1",
        legal_name: "Viktors Kasparovs",
        register_code: "290180-12099",
        phone: "20000011"
      },
      start_date: new Date(2016, 10, 24),
      start_time: new Date(2016, 10, 24, 10, 0, 0),
      support: {
        address: "Piedrujas iela 90",
        legal_name: "Anna Jasiņecka",
        register_code: "010191-23310",
        phone: "20175342"
      },
      visitors: "201",
      email: "baluhins@inbox.lv",
      location: 3,
      persons_type: 'legal'
    };
    this.requestLawForm.setValue(test_object);
  }

  private checkDate(event, type, endpoint) {
    let month = event.getMonth() + 1 < 10 ? '0' + (event.getMonth() + 1) : event.getMonth() + 1;
    let day = event.getDate() < 10 ? '0' + event.getDate() : event.getDate();
    let date = day + '.' + month;
    if (RESERVED_DATES.indexOf(date) != -1) {
      this.lifeTime = 25000;
      this.notifications.push({ severity: 'warn', detail: DATE_WARN });
    }

    if (type == 'physical') {
      if (endpoint == 'start') {
        this.physicalMinDate = new Date(event.getTime());
      } else {
        this.physicalMaxDate = new Date(event.getTime());
      }
    } else {
      if (endpoint == 'start') {
        this.physicalMinDate = new Date(event.getTime());
      } else {
        this.physicalMaxDate = new Date(event.getTime());
      }
    }
  }

  private formSubmit(values: any) {
    this._service.formatDates(values).then(
      res => {
        let data = {};
        data['email'] = res['email'];
        delete res['email'];
        data['request'] = res;
        this.confService.confirm({
          message: 'Jūs tieši gribāt turpināt?',
          accept: () => {
            this.backend.postRequest('request', data)
              .subscribe(res => {
                if (res.hasOwnProperty('success')) {
                  this.lifeTime = 5000;
                  this.notifications.push({ severity: 'success', detail: res['success'] });
                } else {
                  this.lifeTime = 5000;
                  this.notifications.push({ severity: 'error', detail: res['error'] });
                }
              },
              err => this.notifications.push({ severity: 'error', detail: 'Kļūda savienojumā!' }));
          }
        });
      });
  }
}