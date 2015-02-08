/*Template.campaignVote.helpers({
	isLoggedIn: function(){
		return Meteor.user();
	}
});*/

Template.campaignVote.events({
	'click #vote': function(e){
		e.preventDefault();

		//COMO SE FAZ ISTO NUM SÓ PASSO?
		if(!Campaigns.find({"_id":this.campaign._id,"votes.user_id":Meteor.userId()})){
			Campaigns.update({"_id":this.campaign._id},
							{"$push":{"votes":{"user_id":Meteor.userId(),"qty":1}}}
							);
		}
		else{
			Campaigns.update({"_id":this.campaign._id,"votes.user_id":Meteor.userId()},
							{"$inc":{"votes.$.qty":1}}
							);
		}
	}
});