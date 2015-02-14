/*Template.campaignVote.helpers({
	isLoggedIn: function(){
		return Meteor.user();
	}
});*/

Template.campaignVote.events({
	'submit .voteForm': function(e){
		e.preventDefault();
		groupName = $(e.target).find("[name=name]").val();
		campaignId = $(e.target).find("[name=campaignId]").val();
		cooldown = $(e.target).find("[name=cooldown]").val();
		cooldown = parseInt(cooldown);
		Meteor.call("addVote",campaignId,cooldown,groupName,Meteor.userId());
	}
});