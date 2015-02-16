Meteor.publish("campaigns",function(){
	return Campaigns.find();
});

Meteor.publish("campaign",function(id){
	return Campaigns.find({"_id":id});
});

Meteor.publish("userCampaignVotes",function(campaignId,userId){
	return Meteor.users.find({_id:userId,"cooldowns.campaignId":campaignId},
							{fields:{"cooldowns.$":1}});
});
