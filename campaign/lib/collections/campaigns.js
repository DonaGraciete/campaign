Campaigns = new Mongo.Collection("campaigns");

Meteor.methods({
	"addVote":function(campaignId,groupName,userId){
		res = Meteor.users.findOne({"_id":userId,"cooldowns.campaignId":campaignId},
									{"_id":0,"cooldowns.$":1});
		if(res){
			console.log("Can't vote yet!"); //completar isto
		}
		else{
			Campaigns.update({"_id":campaignId,"groups.name":groupName},
							{"$inc":{"groups.$.votes":1},"$addToSet":{"groups.$.voters":userId}});
			Meteor.users.update({"_id":userId},
								{"$push":
									{"cooldowns":
										{"campaignId":campaignId,
										"lastVoteDate":new Date()
										}
									}
								});
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
		Meteor.users.update({},{"$set":{"cooldowns":[]}},{"multi":true});
	}
});