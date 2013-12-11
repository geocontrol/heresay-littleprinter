var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	user_id				: String,
	subscription_id		: String,
	endpoint			: String,
	updated_at			: Date
});

mongoose.model('UserRecord', UserSchema);