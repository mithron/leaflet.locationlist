L.Control.LocationList = L.Control.extend({
	
	includes: L.Mixin.Events,
	
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
	
		if (!this.options.locationsList || this.options.locationsList.length <3) {
			console.log('Too short list! Maybe wrong');			
		}
		
		this._map = map;
		
		var className = 'leaflet-control-location-list', container;
		
		container = this._contentContainer = L.DomUtil.create('div', 'leaflet-bar');		
		
		this._currentLocation_index = 0;
				
		
		this._prevButton = this._createButton(this.options.prevText, this.options.prevTitle,
													className + '-arrow-prev', container, this._switchPrev, this);
													
		this._nextButton = this._createButton(this.options.nextText, this.options.nextTitle, 
													className + '-arrow-next', container, this._switchNext, this);
			
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
	
	_switchNext: function (e) {	
		if (this._currentLocation_index != this.options.locationsList.length - 1 ) {
			this._currentLocation_index = this._currentLocation_index + 1 ; }
		else {
			 this._currentLocation_index = 0 ;}
			
		this._map.setView(this.options.locationsList[this._currentLocation_index].latlng, this.options.locationsList[this._currentLocation_index].zoom);
		this.fire('next');
	},
	_switchPrev: function (e) {
		if (this._currentLocation_index != 0) {
			this._currentLocation_index = this._currentLocation_index - 1 ; }
		else {
			this._currentLocation_index = this.options.locationsList.length - 1 ;}
			
		this._map.setView(this.options.locationsList[this._currentLocation_index].latlng, this.options.locationsList[this._currentLocation_index].zoom);
		this.fire('prev');
	
	}	
		
});



L.control.locationlist = function (options) {
	return new L.Control.LocationList(options);
};
