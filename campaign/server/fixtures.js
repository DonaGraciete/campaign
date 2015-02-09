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