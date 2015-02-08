Meteor.publish("campaigns",function(){
	return Campaigns.find();
});

Meteor.publish("campaign",function(id){
	return Campaigns.find({"_id":id});
});