var handler = { };

// change this meta for your publication
handler.meta = {
  "owner_email":"mark@geekyoto.com",
  "publication_api_version":"1.0",
  "name": "Geekyoto Little Printer Test",
  "description": "Geekyoto Test for Little Printer",
  "delivered_on":"every day",
  "external_configuration": false,
  "send_timezone_info": true,
  "send_delivery_count": true,
  "config": {
	"fields": [
		{
			"type": "text",
			"name": "postcode",
			"label": "enter your postcode",
		}
	]
  }
};

//use default edition handler
handler.edition = undefined;

//use default sample handler
handler.sample = undefined; 

module.exports = handler;