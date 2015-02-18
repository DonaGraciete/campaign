/*Template.campaignVote.helpers({
	finishesIn: function(){
		if(Session.get("finishesIn")==undefined){
			finishesIn = parseInt((new Date() - this.campaign.finishesAt)/1000);
			console.log("finishesIn "+finishesIn);

			Session.set("finishesIn",finishesIn);
			Session.set("finishesInterval",
				Meteor.setInterval(function(){
					Session.set("finishesIn",Session.get("finishesIn")-1);
				},1000)
			);
		}
		return Session.get("finishesIn");
	}
});*/


Template.campaignVote.helpers({
	verified: function(emails){
		if(emails[0].verified){
			return true;
		}
		else{
			return false;
		}
	}
});

Template.campaignVote.events({
	'submit .voteForm': function(e,template){
		e.preventDefault();
		campaign = template.data.campaign;
		groupName = $(e.target).find("[name=name]").val();
		votePassed = Meteor.call("addVote",campaign._id,campaign.cooldown,campaign.finished,groupName,Meteor.userId());
	}
});


recursiveTimeout = function(timeLeft){
	Session.set("timeLeft",timeLeft);
	if(Session.get("timeLeft")>0){
		Meteor.setTimeout(function(){
			recursiveTimeout(Session.get("timeLeft")-1);
		},1000);
	}
	else{
		delete Session.keys["timeLeft"];
	}
}


