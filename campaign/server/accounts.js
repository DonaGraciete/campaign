/*Accounts.config({
	sendVerificationEmail: true
});*/

Accounts.onCreateUser(function(options, user) {
	user.cooldowns = [];
	Roles.setUserRoles(user,"user");
	return user;
});