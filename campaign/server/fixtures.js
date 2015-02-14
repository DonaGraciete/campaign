
removeCooldown = function(campaignId,userId){
	Meteor.users.update({"_id":userId},
						{"$pull":{"cooldowns":{"campaignId":campaignId}}});
	console.log("just removed cooldown:"+campaignId+" "+userId);
}

removeAllCooldowns = function(campaignId){
	Meteor.users.update({},
						{"$pull":{"cooldowns":{"campaignId":campaignId}}},
						{"multi":true});
	console.log("just removed cooldowns of campaign:"+campaignId);
}

finishCampaign = function(campaignId){
	Campaigns.update({"_id":campaignId},{"$set":{"finished":true}});
	console.log("finished "+campaignId);
	//	not necessary to use removeAllCooldowns because they will eventually all expire
}

function setAllCooldownExpires(){
	Meteor.users.find().forEach(function(user){
		for(var i=0;i<user.cooldowns.length;++i){
			now = new Date();

			//	if the server went down while the cooldown was active and now the cooldown has expired
			if(user.cooldowns[i].cooldown-(now-user.cooldowns[i].lastVoteDate) < 0){
				removeCooldown(user.cooldowns[i].campaignId,user._id);
			}
			//	if the cooldown hasnt expired yet
			else{
				Meteor.setTimeout(function(){
					removeCooldown(user.cooldowns[i].campaignId,user._id);
					},user.cooldowns[i].cooldown*1000-(now-user.cooldown[i].lastVoteDate));
			}
		}
	});
}

function setCampaignsFinish(){
	Campaigns.find().forEach(function(campaign){
		if(campaign.finished!=true){
			now = new Date();
			diff = campaign.finishesAt-now;
			console.log(campaign._id+"  "+diff);
			Meteor.setTimeout(function(){
				finishCampaign(campaign._id);
			},campaign.finishesAt-now);
		}
	});
}

Meteor.startup(function(){
	setAllCooldownExpires();
	setCampaignsFinish();
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