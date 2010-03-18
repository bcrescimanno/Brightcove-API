/*
 * A module for connecting to the Brightcove Media API
 * Version 0.1
 * Author Brian Crescimanno <brian.crescimanno@gmail.com>
 * http://briancrescimanno.com
 *
 * Brightcove Media API Reference
 * http://docs.brightcove.com/en/media/
 *
 * License Creative Commons Attribution-Share Alike 3.0 Unported License
 * http://creativecommons.org/licenses/by-sa/3.0/
 *
 * Depends on jQuery > 1.4.x
 * http://jquery.com
 * 
 * Basic Usage:
 * BrightcoveHtmlModules.api.setApiKey("asdfasdfasdfasdfasdfasdfasdf");
 * BrightcoveHtmlModule.findVideoById(123);
 * 
 * Watch for the custom events triggered which package the data with
 * the event
 */

var BrightcoveHtmlModules = BrightcoveHtmlModules || {};

BrightcoveHtmlModules.api = (function($){
    
    // Brightcove Read API Key
    var apiKey = "";
    
    // Brightcove Media API address
    var apiBase = "http://api.brightcove.com/services/library?command="
    
    // Supported API Methods
    var apiMethods = {
		findVideoById: 		"find_video_by_id",
		findPlaylistById: 	"find_playlist_by_id"
	}; 
    
    /***** API ACCESS METHODS ******/
    
    // Retrieve a video by ID
    function findVideoById(videoId, options) {
        var request = apiBase + apiMethods.findVideoById + "&video_id=" + videoId;
        request = prepareRequest(request, options);
        doJsonpApiRequest(request, "handleFindVideoById"); 
    }

	// Retrieve a playlist by ID
	function findPlaylistById(playlistId, options) {
		var request = apiBase + apiMethods.findPlaylistById + "&playlist_id=" + playlistId;
		request = prepareRequest(request, options);
		doJsonpApiRequest(request, "handleFindPlaylistById");
	}
    
    /***** API ACCESS HELPERS ******/
    
    // Add the API token & media type to a request string and 
    // serialize any API options
    function prepareRequest(requestString, options) {
        requestString = tokenize(requestString);
        if(options) {
            requestString += serializeApiOptions(options);
        }
        return setApiMediaRequestHttp(requestString);
    }

    // Add the API token to a request string
    function tokenize(requestString) {
        return requestString + "&token=" + apiKey;
    }
    
    // Add the media type to a request string
    function setApiMediaRequestHttp(requestString) {
        return requestString + "&media_delivery=http";
    } 
    
    // Append the callback function name to the request
    function appendCallback(requestString, callback) {
        return requestString + "&callback=BrightcoveHtmlModules.api." + callback;
    }
    
    // Build a JSONP request object
    function doJsonpApiRequest(requestString, callback) {
        requestString = appendCallback(requestString, callback);
        $("<script/>").attr("type", "text/javascript")
                .attr("src", requestString)
                .appendTo($("body"));
    }
    
    // Serialize an options hash
    function serializeApiOptions(options) {
        var optionString = "";
        for(var option in options) {
            optionString = optionString + "&" + option + "=" + options[option];
        }
        return optionString;
    }
    
    
    /***** API CALLBACKS *****/
    
    // Handle the response for a request for a single video
    function handleFindVideoById(response) {
        $('body').trigger("bc.foundVideoById", [response]);
    }

	function handleFindPlaylistById(response) {
		$('body').trigger("bc.foundPlaylistById", [response]);
	}
    
    /***** GETTERS & SETTERS *****/
    
    function setApiKey(key) {
        apiKey = key;
    }
    
    function getApiKey(key) {
        return apiKey;
    }
    
    /***** EXPOSE PUBLIC METHODS *****/
    
    return {
        getApiKey:              getApiKey,
        setApiKey:              setApiKey,
        findVideoById:          findVideoById,
		findPlaylistById: 		findPlaylistById,
        handleFindVideoById:    handleFindVideoById,
		handleFindPlaylistById: handleFindPlaylistById
    }

})(jQuery);