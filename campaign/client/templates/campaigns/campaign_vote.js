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
		Meteor.call("addVote",campaignId,groupName,Meteor.userId());
	}
});