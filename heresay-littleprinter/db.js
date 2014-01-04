var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	user_id				: String,
	subscription_id		: String,
	endpoint			: String,
	borough				: String,
	postcode			: String,
	instance_name		: String,
	updated_at			: Date
});

mongoose.model('UserRecord', UserSchema);