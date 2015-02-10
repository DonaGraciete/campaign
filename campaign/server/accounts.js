/*Accounts.config({
	sendVerificationEmail: true
});*/

Accounts.onCreateUser(function(options, user) {
	user.cooldowns = [];
	return user;
});