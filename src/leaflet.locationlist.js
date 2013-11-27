L.Control.LocationList = L.Control.extend({
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
		
		var className = 'leaflet-control-locationlist', arrowContainer, container;
		
		container = this._container = L.DomUtil.create('div', className);
		
		arrowContainer = this._arrowContainer = L.DomUtil.create('div', 'leaflet-control-zoom leaflet-bar');		
		
		this._currentLocation_index = 0;
				
		this._LeftButton = this._createButton(this.options.nextText, this.options.nextTitle, 
													className + '-arrow-next', arrowContainer, this._switchLeft, this);
		this._RightButton = this._createButton(this.options.prevText, this.options.prevTitle,
													className + '-arrow-prev', arrowContainer, this._switchRight, this);
		container.appendChild(arrowContainer);
		
		if (this.options.showList) {
		    var formContainer;
			formContainer = this._formContainer = L.DomUtil.create('div', 'leaflet-control-layers leaflet-bar');
			this._createList(className, formContainer, this);			
			container.appendChild(formContainer);
			}
		
		
		return container;
		
    },
	
	
	_createList: function (className, container, context) {			
		
		//Makes this work on IE10 Touch devices by stopping it from firing a mouseout event when the touch is released
		container.setAttribute('aria-haspopup', true);
		
		L.DomEvent
		    .addListener(container, 'click', L.DomEvent.stopPropagation)
			.addListener(container, 'click', L.DomEvent.preventDefault);
			
		var form = this._form = L.DomUtil.create('form', className + '-form'), i;
				
		for (i=0;i<this.options.locationsList.length;i++) {
			form.appendChild(this._addLocation(this.options.locationsList[i],this._onListItemClick, this));
			}		
		container.appendChild(form);
			
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
		
	_addLocation: function (location, fn, context) {
		var label = document.createElement('label'), checked = false;
		if (this.options.locationsList[this._currentLocation_index] == location)
			{ checked = true;}
		input = document.createElement('input');
		input.type = 'radio';
		input.className = 'leaflet-control-locationlist-selector';
		input.defaultChecked = checked;

		var name = document.createElement('span');
		name.innerHTML = ' ' + location.title;

		label.appendChild(input);
		label.appendChild(name);		
		
		L.DomEvent
		    .addListener(label, 'click', L.DomEvent.stopPropagation)
			.addListener(label, 'click', L.DomEvent.preventDefault)
		    .addListener(label, 'click', fn, context);
		
		return label;
	},
	
	_onListItemClick: function (e){
		var i;
		for (i=0; i<this.options.locationsList.length;i++) {
			console.log(this._form);
//			console.log(this._form.i);
//			if (e.target != this._form.i){
//				this._form.i.checked = false;
//				}
//			else {
//				this._form.i.checked = true;
//				}				
//			}
		console.log('Click!');		
		console.log(e);
		console.log('This!');
		console.log(this);
	},
	
	_switchLeft: function (e) {	
		if (this._currentLocation_index != this.options.locationsList.length - 1 ) {
			this._currentLocation_index = this._currentLocation_index + 1 ; }
		else {
			 this._currentLocation_index = 0 ;}
			
		this._map.setView(this.options.locationsList[this._currentLocation_index].latlng, this.options.locationsList[this._currentLocation_index].zoom);		
	},
	_switchRight: function (e) {
		if (this._currentLocation_index != 0) {
			this._currentLocation_index = this._currentLocation_index - 1 ; }
		else {
			this._currentLocation_index = this.options.locationsList.length - 1 ;}
			
		this._map.setView(this.options.locationsList[this._currentLocation_index].latlng, this.options.locationsList[this._currentLocation_index].zoom);	
	}	
		
});



L.control.locationlist = function (options) {
	return new L.Control.LocationList(options);
};