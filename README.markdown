# Brightcove API Module

A module for accessing the [Brightcove](http://brightcove.com "Brightcove") [Media API]("http://docs.brightcove.com/en/media/").

## Status

As of now, this module is in a very incomplete state having been written only to support a basic demo of how one could build an HTML5 video player using the Brightcove Media API. I intend to finish it so it provides complete Media API support. As of this writing, I am a Brightcove employee; however, Brightcove is not affiliated nor do they endorse or support this API wrapper. 

## Usage

In order to use the wrapper, you must first set your API key. You can retrieve your API key from the Brightcove Studio.

	BrightcoveHtmlModules.api.setApiKey("yourapikeyvalue");
	
Once the API key value is set, you can make a request.

	BrightcoveHtmlModules.api.findVideoById(123);
	
You can also supply optional parameters via an options hash which will be automatically serialized and sent.

Each API call fires a custom event using the jQuery custom event library that packages the result data object with the event. This makes it easy for multiple modules or components in your system to use the result of a single API call. 

## It's a Singleton

There are people who argue against the Javascript module pattern used within noting (correctly) that it is less performant than using Prototypal instantiation. However, I believe in using the right tool for the job and I believe an API access module is correctly implemented as a Singleton service. If you disagree; feel free to fork! I won't be offended.

