

Meteor.methods({
	"addVote":function(campaignId,cooldown,groupName,userId){
		check(campaignId,String);
		check(cooldown,Number);
		check(groupName,String);
		check(userId,String);

		//	make tests to prevent hacks!
		res = Meteor.users.findOne({"_id":userId,"cooldowns.campaignId":campaignId});

		//	Se ainda tiver cooldowns
		if(res){
			console.log("Can't vote yet"); //COMPLETAR ISTO
		}
		//	Se ja nao tiver cooldowns nesta campanha
		else{
			now = new Date();
			Campaigns.update({"_id":campaignId,"groups.name":groupName},
							{"$inc":{"groups.$.votes":1},"$addToSet":{"groups.$.voters":userId}});
			Meteor.users.update({"_id":userId},
								{"$push":
									{"cooldowns":
										{"campaignId":campaignId,
										"lastVoteDate":now,
										"cooldown":cooldown
										}
									}
								});
			Meteor.setTimeout(function(){
				removeCooldown(campaignId,userId);
				},cooldown*1000);
			console.log("just set new cooldown:"+campaignId+" "+userId);
		}

		/*FAZER VOTAÇÂO SEM VOTERS PRIMEIRO
		if(!Meteor.users.findOne({"_id":userId,"votes.campaignId":campaignId})){
			console.log("new voter");
			Meteor.users.update({"_id":userId},
								{"$push":{"votes":{"campaignId":campaignId,"qty":1}}}
								);
		}
		else{
			console.log("not new voter");
			Meteor.users.update({"_id":userId,"votes.campaignId":campaignId},
								{"$inc":{"votes.$.qty":1}}
								);
		}
		*/
	},
	"clearVotes":function(campaignId){
		check(campaignId,String);

		if(!Roles.userIsInRole(Meteor.user(),"admin")){
			throw new Meteor.Error(403, "Not authorized");
		}

		groups = Campaigns.findOne({"_id":campaignId}).groups

		updateQuery = {};
		for(var i=0;i<groups.length;++i){
			updateQuery["groups."+i+".votes"] = 0;
			updateQuery["groups."+i+".voters"] = [];
		}
		Campaigns.update({"_id":campaignId},
						{"$set":updateQuery},
						{multi:true});
	},
	"clearAllCooldowns":function(){
		if(!Roles.userIsInRole(Meteor.user(),"admin")){
			throw new Meteor.Error(403, "Not authorized");
		}

		Meteor.users.update({},{"$set":{"cooldowns":[]}},{"multi":true});
	}
});