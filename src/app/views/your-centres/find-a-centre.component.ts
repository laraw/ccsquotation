import { Component, OnInit, NgZone, ViewChild } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Centre } from '../../core/models';
import { CentreService } from '../../core/services';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { MapGeocoder } from '../../core/services/google-maps-custom/map-geocoder';


@Component({
  selector: 'find-a-centre',
  templateUrl: './find-a-centre.component.html',
  styleUrls: ['./find-a-centre.component.css']
})
export class FindACentreComponent implements OnInit {
  centres$: Observable<Centre[]>;
  private searchTerms = new Subject<string>();

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;



  zoom = 12
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: '',
    maxZoom: 15,
    minZoom: 8,
  }
  markers = []
  infoContent = 'Test'

  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];


  constructor(private centreService: CentreService, private geocoder: MapGeocoder ) {

    
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    // this.searchTerms.next(term);
    // this.geocoder.geocode({
    //     address: term,
    //     region: 'au'
    //   }).subscribe(({results}) => {
    //     console.log(results[0].geometry.location.lat());
    //     console.log(results[0].geometry.location.lng());
    //   });
  }



  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
  }

  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions.push(event.latLng.toJSON());
    // this.markers.push({
    //   position: {
    //     lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
    //     lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
    //   },
    //   label: {
    //     color: 'red',
    //     text: 'Marker label ' + (this.markers.length + 1),
    //   },
    //   title: 'Marker title ' + (this.markers.length + 1),
    //   options: { animation: google.maps.Animation.BOUNCE },
    // })
    // this.markers = this.markers;
  }


  openInfoWindow(marker: MapMarker) {

    this.infoWindow.open(marker);
  }


  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
      })

      
      
    // this.centres$ = this.searchTerms.pipe(
    //   // wait 300ms after each keystroke before considering the term
    //   debounceTime(300),

    //   // ignore new term if same as previous term
    //   distinctUntilChanged(),

    //   // switch to new search observable each time the term changes
    //   switchMap((term: string) => this.centreService.searchCentres(term)),
    // );
  }
  
  
}