leaflet.locationlist
====================

A control for LeafletJS which scrolls the map through the list of locations and zooms. 

##Example usage
>			var llist = L.control.locationlist();
>			map.addControl(llist);

## Parameters

>   	var llist = L.control.locationlist({ locationsList : [ {title: 'Poland', latlng: [52.03, 19.27], zoom: 6},
						  {title: 'Other', latlng: [50.04, 14.28], zoom: 6},
						  {title: 'Other2', latlng: [50.04, 19.27], zoom: 12}],		
		nextText : '->',
		nextTitle : 'Next',
		prevText : '<-',
		prevTitle : 'Previous',
		showList : false });

### locationsList
The array of objects containing locations in format { title: "", latlng: [,], zoom:  } .The control will rotate over these locations on click. It assumes that the first location is by default selected, so Next location will be 1st and Prev location will be last in array. Than it scrolls in array, changing current location.

### nextText, nextTitle, prevText, prevTitle
Helpers for arrows - what will be displayed on arrows as popup and if no image specified for them. Surely you'll never need these, but who know?

### showList
Show a select box for quick jumps to the locations.

## Images

Images for arrows are in img folder. They are specified in css, so you can change them into what you want.

## Events
Events are added to interact with control from code. Events are fired on switching to next (the 'next' event) or to previous (the 'prev' event) location. Also a 'changed' event fires every time the map jumps. Example shows how to do it. 
