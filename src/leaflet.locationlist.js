L.Control.LocationList = L.Control.extend({
	
	includes: L.Mixin.Events,
	
	options: {
		position: 'topright',
		showList: true,		
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
		
		var className = 'leaflet-control-locationlist', container;
		
		container = this._contentContainer = L.DomUtil.create('div', 'leaflet-bar');		
		
		this._currentLocation_index = 0;
				
		
		this._prevButton = this._createButton(this.options.prevText, this.options.prevTitle,
													className + '-arrow-prev', container, this._switchPrev, this);
													
		this._nextButton = this._createButton(this.options.nextText, this.options.nextTitle, 
													className + '-arrow-next', container, this._switchNext, this);
		
		if (this.options.showList) {
			var form = this._form = L.DomUtil.create('form', className + '-fullist');
			this._fullist = L.DomUtil.create('select', className + '-list', form);
			this._fullist.style.width = '100%';
	
			L.DomEvent.on(this._fullist, 'change', this._onListChange, this);
			
			container.appendChild(form);
			
			this._update();
		}
		
		return container;
		
    },
	
	_onListChange: function () {

		this._currentLocation_index = this._fullist.selectedIndex;
	
		this._map.setView(this.options.locationsList[this._currentLocation_index].latlng, this.options.locationsList[this._currentLocation_index].zoom);
		this.fire('changed');
  },
		
  _createListElement: function (obj,ind) {
		var option = document.createElement('option');		
		option.innerHTML = obj.title;
		if (this._currentLocation_index == ind ) {
			option.setAttribute('selected', true);
		}
		return option;
  },
  
  _update: function () {		
		// L.DomUtil.empty(this._fullist); add in 0.7.4
		while (this._fullist.firstChild) {
				this._fullist.removeChild(this._fullist.firstChild);
		};	
		var i, obj;
		for (i in this.options.locationsList) {
			obj = this.options.locationsList[i];
			this._fullist.appendChild(this._createListElement(obj,i));
		};

		console.log(this);
		return this;
  },
  
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
		if (this.options.showList) {
			this._update();
		};
		this.fire('changed');
		this.fire('next');
	},
	_switchPrev: function (e) {
		if (this._currentLocation_index != 0) {
			this._currentLocation_index = this._currentLocation_index - 1 ; }
		else {
			this._currentLocation_index = this.options.locationsList.length - 1 ;}
			
		this._map.setView(this.options.locationsList[this._currentLocation_index].latlng, this.options.locationsList[this._currentLocation_index].zoom);
		if (this.options.showList) {
			this._update();
		};
		this.fire('changed');
		this.fire('prev');
	
	}	
		
});



L.control.locationlist = function (options) {
	return new L.Control.LocationList(options);
};
