L.Control.LocationList = L.Control.extend({
	options: {
		position: 'topright',
		showlist: true,		
		locationsList : [ {title: 'Poland', latlng: [52.03, 19.27], zoom: 6},
						  {title: 'Other', latlng: [50.04, 14.28], zoom: 6},
						  {title: 'Other2', latlng: [50.04, 19.27], zoom: 12}],
		nextText : '->',
		nextTitle : 'Next',
		prevText : '<-',
		prevTitle : 'Previous'
	},

	onAdd: function (map) {
	
		console.log(this);
		console.log(this.options.locationsList.length);
		if (!this.options.locationsList || this.options.locationsList.length <3) {
			console.log('Too short list!');
		}
		
		this._map = map;
		
		var className = 'leaflet-control-location-list', container;
		
		container = this._contentContainer = L.DomUtil.create('div', 'leaflet-control-zoom leaflet-bar');		
		
		this._currentLocation = this.options.locationsList[0];
				
		this._LeftButton = this._createButton(this.options.nextText, this.options.nextTitle, 
													className + '-arrow-next', container, this._switchLeft, this);
		this._RightButton = this._createButton(this.options.prevText, this.options.prevTitle,
													className + '-arrow-prev', container, this._switchRight, this);
			
		return container;
		
    },
	
	
//	_createList: function (list, linkClass, container, fn, context) {			
//			for location in list{
//				var link = L.DomUtil.create('a', linkClass,container);
//				link.href = location.latlng;
//				link.innerHTML = location.title;
//						
//			}
//			
//			return content
//	},
	
	_createButton: function (text, title, className, container, fn, context) {
		
		var link = L.DomUtil.create('a', className, container);
		link.href = '#';
		link.title = title;	
		link.innerHTML = text;

		L.DomEvent
		    .addListener(link, 'click', L.DomEvent.stopPropagation)
			.addListener(link, 'click', L.DomEvent.preventDefault)
		    .addListener(link, 'click', fn, context);

		return link;
	},
	
	_switchLeft: function (e) {		
	    if (!this.options.locationsList) {
		     console.log('No way');}
		this._currentLocation = this.options.locationsList[1];
		this._map.setView(this._currentLocation.latlng, this._currentLocation.zoom);
		this.options.locationsList.push(this.options.locationsList[0]);
		this.options.locationsList.shift();
		console.log(this);
	},
	_switchRight: function (e) {		
		if (!this.options.locationsList) {
		     console.log('No way');}
		this._currentLocation = this.options.locationsList[this.options.locationsList.length-1];
		this._map.setView(this._currentLocation.latlng, this._currentLocation.zoom);
		this.options.locationsList.unshift(this.options.locationsList[this.options.locationsList.length-1]);
		this.options.locationsList.pop();
		console.log(this);
	}	
		
});



L.control.locationlist = function (options) {
	return new L.Control.LocationList(options);
};

