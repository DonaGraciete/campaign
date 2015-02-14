
removeCooldown = function(campaignId,userId){
	Meteor.users.update({"_id":userId},
						{"$pull":{"cooldowns":{"campaignId":campaignId}}});
	console.log("just removed cooldown:"+campaignId+" "+userId);
}

function setAllCooldownExpires(){
	Meteor.users.find().forEach(function(user){
		for(var i=0;i<user.cooldowns.length;++i){
			now = new Date();

			//	if the server went down while the cooldown was active and now the cooldown has expired
			if(VOTE_COOLDOWN-(now-user.cooldowns[i].lastVoteDate) < 0){
				removeCooldown(user.cooldowns[i].campaignId,user._id);
			}
			//	if the cooldown hasnt expired yet
			else{
				Meteor.setTimeout(function(){
					removeCooldown(user.cooldowns[i].campaignId,user._id);
					},VOTE_COOLDOWN-(now-user.cooldown[i].lastVoteDate));
			}
		}
	});
}

Meteor.startup(function(){
	setAllCooldownExpires();
});

/*if (Campaigns.find().count() === 0) {
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
}*/