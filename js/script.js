$(function(){

// sample as bellow
// http://lopan.jp/google-maps-api/

var init = function(){
  var MG = new manageGmaps();
  $.when(
    $.ajax('lib/dummyXML.xml')
  // ).then(function(XMLdata){}
  ).done(function(XMLdata){
    console.log('XML load success!!');
    MG.init(XMLdata);
  }).fail(function(XMLdata){
    alert('XML load failed!!');
  });

}

var manageGmaps = function(){
  // setting
  this.mapEl = $('#map_canvas');
  this.image = 'img/alert.png';
  this.initZoom = 10;

  // don't touch
  this.lopanMarker = [];
  this.infowindow = [];
  this.nowCurrent = 0;
  this.currentInfoWindow = null;
  this.lopanLength;
  this.map;
  this.xml;

  // for flat design
  this.styleOptions = [{'stylers':[{'visibility':'off'}]},{'featureType':'road','stylers':[{'visibility':'on'},{'color':'#ffffff'}]},{'featureType':'road.arterial','stylers':[{'visibility':'on'},{'color':'#fee379'}]},{'featureType':'road.highway','stylers':[{'visibility':'on'},{'color':'#fee379'}]},{'featureType':'landscape','stylers':[{'visibility':'on'},{'color':'#f3f4f4'}]},{'featureType':'water','stylers':[{'visibility':'on'},{'color':'#7fc8ed'}]},{'featureType':'road','elementType':'labels','stylers':[{'visibility':'off'}]},{'featureType':'poi.park','elementType':'geometry.fill','stylers':[{'visibility':'on'},{'color':'#83cead'}]},{'featureType':'poi.business','elementType':'geometry','stylers':[{'visibility':'on'}]},{'elementType':'labels','stylers':[{'visibility':'off'}]},{'featureType':'transit.line','elementType':'geometry.fill','stylers':[{'visibility':'on'},{'hue':'#e3b552'}]},{'featureType':'transit.line','elementType':'geometry.stroke','stylers':[{'visibility':'on'},{'weight':1.2},{'color':'#9660ac'},{'lightness':25}]},{'featureType':'landscape.man_made','elementType':'geometry','stylers':[{'weight':0.9},{'visibility':'off'}]}];
}
manageGmaps.prototype = {
  init : function(XMLdata){
    var self = this;
    self.xml = XMLdata;
    var firstForecastEl = $(self.xml).find('forecast:first')
    var lat = firstForecastEl.find('lat').text();
    var lon = firstForecastEl.find('lon').text();
    self.start(lat,lon);
    $('#prevBtn').on('click', function(event) {
      event.preventDefault();
      self.panTo(-1);
    });
    $('#nextBtn').on('click', function(event) {
      event.preventDefault();
      self.panTo(1);
    });
  },
  start : function(lat,lon){
    var self = this;
    var latlng = new google.maps.LatLng(lat,lon);
    var myOptions = {
      zoom: self.initZoom,
      center: latlng,
      mapTypeControlOptions: { mapTypeIds: ['flat', google.maps.MapTypeId.ROADMAP] },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    self.map = new google.maps.Map(
      self.mapEl[0],
      myOptions
    );
    var styledMapOptions = { name: 'Flat' }
    var flatType = new google.maps.StyledMapType(self.styleOptions, styledMapOptions);
    self.map.mapTypes.set('flat', flatType);
    self.map.setMapTypeId('flat');
    self.setIcon();
  },
  setIcon : function(){
    var self = this;
    $(self.xml).find('forecast').each(function(i, el) {
      // console.log(i);
      var lat = $(this).find('lat').text();
      var lon = $(this).find('lon').text();
      var ttl = $(this).find('place').text();
      var cond = $(this).find('condition').text();
      var country = $(this).find('country').text();
      var cause = $(this).find('cause').text();

      var latlng = new google.maps.LatLng(lat,lon);
      var content = '<div class="infoWindow">' +
        '<h1>'+ttl+'</h1>' +
        '<dl>' +
        '<dt>country</dt><dd>'+country+'</dd>' +
        '<dt>condition</dt><dd>'+cond+'</dd>' +
        '<dt>cause</dt><dd>'+cause+'</dd>' +
        '</dl>' +
        '</div>';
      self.infowindow[i] = new google.maps.InfoWindow({
        content: content
      });

      self.lopanMarker[i] = new google.maps.Marker({
        position: latlng,
        map: self.map,
        icon: self.image,
        title: 'Lopan cafe'
      });

      google.maps.event.addListener(self.lopanMarker[i], 'click', function() {
        if (self.currentInfoWindow) {
          self.currentInfoWindow.close();
        }
        self.infowindow[i].open(self.map, self.lopanMarker[i]);
        self.currentInfoWindow = self.infowindow[i];
        self.setCurrent(i);
      });
      self.lopanLength = i;
    });
    self.infowindow[0].open(self.map, self.lopanMarker[0]);
    self.currentInfoWindow = self.infowindow[0];
    $('#maxNum').text(self.lopanLength+1);
  },
  panTo : function(val){
    var self = this;
    var tmp = self.lopanLength+1;
    var adjustNum = (self.nowCurrent+val+tmp)%tmp;
    var target = $(self.xml).find('forecast:eq('+adjustNum+')');
    var latlng = new google.maps.LatLng(target.find('lat').text(),target.find('lon').text());
    this.map.panTo(latlng);
    // console.log(self.nowCurrent);
    // console.log(tmp);
    if (self.currentInfoWindow) {
      self.currentInfoWindow.close();
    }
    self.infowindow[adjustNum].open(self.map, self.lopanMarker[adjustNum]);
    self.currentInfoWindow = self.infowindow[adjustNum];
    self.setCurrent(adjustNum);
  },
  setCurrent : function(num){
    var self = this;
    $('#nowNum').text(num+1);
    self.nowCurrent = num;
  }
}

init();

});
