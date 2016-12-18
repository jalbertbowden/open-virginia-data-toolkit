var Common = function () {

	var overlayFadeMs = 500;

	// Shows a Loading throbber over an element
	// Shows an optional message if specified
	// Dependent upon JQuery
	// Returns the overlay div element
	function AddLoadingOverlay(element, message) {
		var jqElement = $(element);
		var offset = jqElement.position();
		var jqContainerDiv = $(document.createElement("div")).css({
			"position": "absolute",
			"opacity": 0,
			"top": offset.top,
			"left": offset.left,
			"width": jqElement.outerWidth(true) + "px",
			"height": jqElement.outerHeight(true) + "px",
			"z-index": 100
		}).addClass("LoadingOverlay");

		var jqMaskDiv = $(document.createElement("div")).css({
			"background-color": "White",
			"opacity": .7,
			"position": "absolute",
			"height": "100%",
			"width": "100%",
			"z-index": 101
		});
		jqContainerDiv.append(jqMaskDiv);

		var innerHtml = "<img src=\"images/spinner.gif\" />";
		if (message != null && jQuery.trim(message).length > 0) innerHtml += "<p style=\"font-weight:bold;color:Black;\">" + message + "<\/p>";
		var jqContentDiv = $(document.createElement("div")).css({
			"position": "absolute",
			"text-align": "center",
			"width": "100%",
			"z-index": 102
		}).append(innerHtml);
		jqContainerDiv.append(jqContentDiv);

		jqElement.append(jqContainerDiv);

		// Center overlay content vertically
		jqContentDiv.css("top", ((jqElement.outerHeight(true) - jqContentDiv.outerHeight(true)) / 2) + "px");

		jqContainerDiv.fadeTo(overlayFadeMs, 1);

		return jqContainerDiv[0];
	}

	// Removes all loading overlay divs from the DOM
	function RemoveLoadingOverlays() {
		$(".LoadingOverlay").fadeTo(overlayFadeMs, 0, function () {
			$(this).remove();
		});
	}

	// Expose public members
	return {
		AddLoadingOverlay: AddLoadingOverlay,
		RemoveLoadingOverlays: RemoveLoadingOverlays
	}

} ();