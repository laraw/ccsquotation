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
  // centres$: Observable<Centre[]>;
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
  selectedCentre = <Centre>{};
  isSelected = false;
  

  markerOptions: google.maps.MarkerOptions = {draggable: false,  clickable: false, icon: 'assets/img/brand/cottage.png'  };
  markerPositions: google.maps.LatLngLiteral[] = [];

  centremarkerOptions: google.maps.MarkerOptions = {draggable: false, clickable: false,  animation: google.maps.Animation.BOUNCE  };
  centreMarkers: google.maps.LatLngLiteral[] = [];


  /* trying something new */
  selectedCentres:  CentreMarkers[] = [];

  @ViewChild("placesRef") placesRef : GooglePlaceDirective;

  constructor(private centreService: CentreService, private geocoder: MapGeocoder ) {

    
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
    this.centreMarkers = [];
    this.selectedCentres = [];

    this.addHomeMarker(address.geometry.location.toJSON());

    /* TODO -tidy this up */

    this.centreService.getCentres().subscribe(centres => {

      
      centres.forEach(function(centre) {
            var distanceBetween = this.getDistanceFromLatLonInKm(lat, lng, centre.lat, centre.long);

            if(distanceBetween < 25) {
              
              this.selectedCentres.push({ markerPosition: {  lat: lat, lng: lng } , centre: centre, distance: distanceBetween });
              
              
            }
      }, this)    
      this.selectedCentres.sort((a, b) => (a.distance > b.distance) ? 1 : -1);
      this.selectedCentre =  this.selectedCentres[0].centre;

      this.addCentreMarker(this.selectedCentre.lat,this.selectedCentre.long);
      this.isSelected = true;

    });
    
}


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
   

  }


  openInfoWindow(marker: MapMarker) {
    const lat = marker.marker.getPosition().lat();
    const lng = marker.marker.getPosition().lng();


    
    this.infoWindow.open(marker);
  }

  setSelectedCentre(centre: Centre) {
    this.selectedCentre = centre;
    this.centreMarkers = [];
    this.addCentreMarker(this.selectedCentre.lat,this.selectedCentre.long);
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
      })

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