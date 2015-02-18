
Accounts.config({
	sendVerificationEmail: true,
	restrictCreationByEmailDomain: "tecnico.ulisboa.pt"
});

Accounts.onCreateUser(function(options, user) {
	user.cooldowns = [];
	Roles.setUserRoles(user,"user");
	return user;
});

Accounts.emailTemplates.siteName = "Dibbs";
Accounts.emailTemplates.from = "Dibbs Account Admin <migjaques@gmail.com>";
Accounts.emailTemplates.enrollAccount.subject = function (user) {
    return "Welcome " + user.emails[0].address;
};
Accounts.emailTemplates.enrollAccount.text = function (user, url) {
   return "Thanks for registering to Dibbs!"
     + " To activate your account, simply visit the link below:\n\n"
     + url;
};