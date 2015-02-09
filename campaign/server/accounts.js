/*Accounts.config({
	sendVerificationEmail: true
});*/

Accounts.onCreateUser(function(options, user) {
	console.log(options);
	console.log(user);
	user.votes = [];
	return user;
});