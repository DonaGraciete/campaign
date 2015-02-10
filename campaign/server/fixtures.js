if (Campaigns.find().count() === 0) {
	Campaigns.insert({
		brand: 'CocaCola',
		prize: 'A free can!',
		groups: []
	});
	Campaigns.insert({
		brand: 'RedBull',
		prize: 'A free can!',
		groups: []
	});
	Campaigns.insert({
		brand: 'Sprite',
		prize: 'A free can!',
		groups: []
	});
}

removeCooldown = function(campaignId,userId){
	Meteor.users.update({"_id":userId},
						{"$pull":{"cooldowns":{"campaignId":campaignId}}});
	console.log("just removed cooldown:"+campaignId+" "+userId);
}

function setAllCooldownExpires(){
	Meteor.users.find().forEach(function(user){
		for(var i=0;i<user.cooldowns.length;++i){
			now = new Date();
			Meteor.setTimeout(function(){
				removeCooldown(user.cooldowns[i].campaignId,user._id);
				},VOTE_COOLDOWN-(now-user.cooldown[i].lastVoteDate));
		}
	});
}

function resetVotes(campaignId){
	groups = Campaigns.findOne({"_id":campaignId}).groups

	updateQuery = {};
	for(var i=0;i<groups.length;++i){
		updateQuery["groups."+i+".votes"] = 0;
		updateQuery["groups."+i+".voters"] = [];
	}
	Campaigns.update({"_id":campaignId},
					{"$set":updateQuery},
					{multi:true});
}