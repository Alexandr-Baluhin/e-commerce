import { Component } from '@angular/core';

import 'leaflet';

// Tiles
const TILE_DETAILED = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

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

    constructor() {
        this.height = '380px';
    }

    public ngOnInit(): void {}

    public ngOnDestroy(): void {}

    public ngAfterViewInit(): void {
        this.initMap();
        this.addMarkers();
    }

    private initMap(): void {
        this.map = L.map('map', {
            center: [56.945984, 24.080721],
            zoom: 15,
            layers: [TILE_DETAILED]
        });
    }

    private addMarkers(): void {
        this.markersScope = L.layerGroup().addTo(this.map);
        L.marker([56.945984, 24.080721]).bindPopup('Visam vajag inženieri!<br><img height="100px" width="150px" src="../../../assets/cat/cat.jpg">').addTo(this.markersScope);
    }

}