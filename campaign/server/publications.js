Meteor.publish("campaigns",function(){
	return Campaigns.find();
});

Meteor.publish("campaign",function(id){
	return Campaigns.find({"_id":id});
});

Meteor.publish("campaignVotes",function(){
	excludeFields = {
		"createdAt":0,
		"emails.verified":0,
		"profile":0,
		"services":0
	}
	return Meteor.users.find({},{"fields":excludeFields});
});
