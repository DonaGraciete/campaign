
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
	console.log("Just finished campaign: "+campaignId);
	//	not necessary to use removeAllCooldowns because they will eventually all expire
}

function setLongTimeout(callback, timeout_ms){
	//if we have to wait more than max time, need to recursively call this function again
	if(timeout_ms > 2147483647){    //now wait until the max wait time passes then call this function again with
		//requested wait - max wait we just did, make sure and pass callback
		Meteor.setTimeout(function(){
			setLongTimeout(callback, (timeout_ms-2147483647));
		},2147483647);
	}
	else{  //if we are asking to wait less than max, finally just do regular seTimeout and call callback
	    Meteor.setTimeout(callback, timeout_ms);
    }
}

function setAllCooldownExpires(){
	Meteor.users.find().forEach(function(user){
		user.cooldowns.forEach(function(cooldown){
			now = new Date();
			if(cooldown.cooldown*1000-(now-cooldown.lastVoteDate) < 0){
				removeCooldown(cooldown.campaignId,user._id);
			}
			else{
				Meteor.setTimeout(function(){
					removeCooldown(cooldown.campaignId,user._id);
					},cooldown.cooldown*1000-(now-cooldown.lastVoteDate));
			}
		});

		/*for(var i=0;i<user.cooldowns.length;++i){
			now = new Date();
			console.log(i);

			//	if the server went down while the cooldown was active and now the cooldown has expired
			if(user.cooldowns[i].cooldown*1000-(now-user.cooldowns[i].lastVoteDate) <= 0){
				removeCooldown(user.cooldowns[i].campaignId,user._id);
			}
			//	if the cooldown hasnt expired yet
			else{
				Meteor.setTimeout(function(){
					console.log(user);
					console.log(i);
					removeCooldown(user.cooldowns[i].campaignId,user._id);
					},user.cooldowns[i].cooldown*1000-(now-user.cooldowns[i].lastVoteDate));
			}
		}*/
	});
}

setCampaignFinish = function(campaign){
	if(campaign.finished!=true){
		now = new Date();
		diff = campaign.finishesAt-now;
		
		setLongTimeout(function(){
			finishCampaign(campaign._id);
		},diff);

		console.log("Just set "+diff+" ms timout for "+campaign.brand+"'s campaign (id: "+campaign._id+").");
	}
}

function setAllCampaignsFinish(){
	Campaigns.find().forEach(function(campaign){
		setCampaignFinish(campaign);
	});
}

Meteor.startup(function(){
	setAllCooldownExpires();
	setAllCampaignsFinish();
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