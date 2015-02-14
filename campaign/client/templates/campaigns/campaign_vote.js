/*Template.campaignVote.helpers({
	isLoggedIn: function(){
		return Meteor.user();
	}
});*/

Template.campaignVote.events({
	'submit .voteForm': function(e,template){
		e.preventDefault();
		campaign = template.data.campaign;
		groupName = $(e.target).find("[name=name]").val();
		Meteor.call("addVote",campaign._id,campaign.cooldown,campaign.finished,groupName,Meteor.userId());
	}
});