import {Component, Input, Inject} from '@angular/core';

import 'leaflet';

@Component({
  moduleId: module.id,
  selector: 'map-comp',
  styleUrls: ['map.comp.css'],
  templateUrl: 'map.comp.html'
})

export class MapComp {

  private map: any;
  private height: String;
  private markersScope: any;
  private tileDetailed: any;

  @Input() data: any;

  constructor(@Inject('config') private env: Object) {
    this.height = '380px';
    if (env['PROD']) {
      this.tileDetailed = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      });
    } else {
      this.tileDetailed = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      });
    }
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMap();
      let preparedData = this.formatDate(this.data);
      this.addMarkers(preparedData);
    }, 500);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [56.945984, 24.080721],
      zoom: 8,
      layers: [this.tileDetailed]
    });
  }

  private addMarkers(data): void {
    this.markersScope = L.layerGroup().addTo(this.map);
    data.forEach(marker => {
      L.marker([marker.lat, marker.long]).bindPopup('' +
        '<strong>Norisīnas vieta: </strong> ' + marker.address + '<br>' +
        '<strong>Datums: </strong> ' + marker.start_date + '-' + marker.end_date + '<br>' +
        '<strong>Organizators: </strong> ' + marker.organizer_name + '<br>' +
        '<strong>Statuss: </strong> <strong>' + marker.status + '</strong><br>' +
        '<strong>Apraksts: </strong> ' + marker.description).addTo(this.markersScope);
    });
  }

  private formatDate(data): Array<Object> {
    let result = [];
    data.forEach((request) => {
      let temp = request['start_date'].split('T');
      let temp2 = request['end_date'].split('T');
      request['start_date'] = temp[0] + ' ' + temp[1].split('.00')[0];
      request['end_date'] = temp2[0] + ' ' + temp2[1].split('.00')[0];
      result.push(request);
    });
    return result;
  }

}