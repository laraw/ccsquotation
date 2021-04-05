import { Component, OnInit, NgZone, ViewChild } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Centre } from '../../core/models';
import { CentreService } from '../../core/services';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { MapGeocoder } from '../../core/services/google-maps-custom/map-geocoder';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';


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
  // selectedCentres: Centre[] = []; 


  zoom = 12
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: '',
    maxZoom: 15,
    minZoom: 8,
  }
  markers = []
  selectedCentreName = ''
  selectedCentreDescription = ''
  

  markerOptions: google.maps.MarkerOptions = {draggable: false,  clickable: false, icon: 'assets/img/brand/cottage.png'  };
  markerPositions: google.maps.LatLngLiteral[] = [];

  centremarkerOptions: google.maps.MarkerOptions = {draggable: false, clickable: false,  animation: google.maps.Animation.BOUNCE  };
  centreMarkers: google.maps.LatLngLiteral[] = [];


  /* trying something new */
  selectedCentres:  CentreMarkers[] = [];
  // centreViewed= <Centre>{};

  @ViewChild("placesRef") placesRef : GooglePlaceDirective;

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


  public handleAddressChange(address: Address) {
    // Do some stuff
    const  lat = address.geometry.location.lat();
    const lng = address.geometry.location.lng();
    // this.markerOptions.label = { color: 'green', text: 'hello '};
    this.center = {
      lat: lat,
      lng: lng
    }
    this.addHomeMarker(address.geometry.location.toJSON());

    /* TODO -tidy this up */

    this.centreService.getCentres().subscribe(centres => {

      this.centreMarkers = [];
      centres.forEach(function(centre) {
            var distanceBetween = this.getDistanceFromLatLonInKm(lat, lng, centre.lat, centre.long);
  
            if(distanceBetween < 25) {
              
              this.selectedCentres.push({ markerPosition: {  lat: lat, lng: lng } , centre: centre, distance: distanceBetween });
              this.addCentreMarker(centre.lat, centre.long);
              
            }
      }, this)    
      this.selectedCentres.sort((a, b) => (a.distance > b.distance) ? 1 : -1);
      console.log(this.selectedCentres);
    });
    
}


  // setCurrentMarker() {
  //   this.centreMarkers = [];
  //   this.selectedMarkers.push(selectedCentre.markerPosition);
  //   this.selectedCentreName = selectedCentre.centre.name;
  //   this.selectedCentreDescription = selectedCentre.centre.description;
  
  // }


logCoords(event) {
  console.log(event.latLng.toJSON())
}

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
  }

  addCentreMarker(lat: number, lng: number) {
    this.centreMarkers.push( { lat: lat, lng: lng });

  }

  addHomeMarker(latlng: any) {
    this.markerPositions.push(latlng);
   

    // navigator.geolocation.getCurrentPosition((position) => {
    
    // })
    // this.markers.push({
    //   position: {
    //     // lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
    //     // lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
    //     lat: lat,
    //     lng: lng
    //   },
    //   label: {
    //     color: colour,
    //     text: 'Marker label ' + (this.markers.length + 1),
    //   },
    //   title: 'Marker title ' + (this.markers.length + 1),
    //   options: { animation: google.maps.Animation.BOUNCE },
    // })
    // this.markers = this.markers;
  }


  openInfoWindow(marker: MapMarker) {
    const lat = marker.marker.getPosition().lat();
    const lng = marker.marker.getPosition().lng();

    // this.selectedCentres.forEach( function (centre) {
    //   console.log(this.getDistanceFromLatLonInKm(lat, lng, centre.markerPosition.lat, centre.markerPosition.lng));
    //   if(lat == centre.markerPosition.lat && lng == centre.markerPosition.lng) {
    //       this.centreViewed = centre.centre;
    //   }
    // }, this)

    
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
  
  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  
}

export class CentreMarkers {
  markerPosition: google.maps.LatLngLiteral;
  centre: Centre;
  distance: number;
}