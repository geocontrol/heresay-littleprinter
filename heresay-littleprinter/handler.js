var handler = { };

// change this meta for your publication
handler.meta = {
  "owner_email":"mark@geekyoto.com",
  "publication_api_version":"1.0",
  "name": "Heresay Little Printer",
  "description": "Heresay for Little Printer",
  "delivered_on":"demand",
  "delivery_type":"push",
  "external_configuration": false,
  "send_timezone_info": true,
  "send_delivery_count": true,
  "config": {
	  "fields": [
	  	{
	  		"type": "select",
			"name": "borough",
			"label": "Select your borough: ",
			"options": [
				["Lewisham", "Lewisham"],
				["Camden", "Camden"],
				["Kensington & Chelsea", "Kensington%20and%20Chelsea%20Borough%20Council"]
			]
	  	},
		{
			"type": "text",
			"name": "postcode",
			"label": "Or postcode: "
		},
		{
			"type": "text",
			"name": "instance_name",
			"label": "Printer Installation Name: "
		}
	]
  }
};

//use default edition handler
handler.edition = undefined;

//use default sample handler
handler.sample = undefined; 

module.exports = handler;