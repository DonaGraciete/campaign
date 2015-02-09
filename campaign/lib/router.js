Router.configure({
	layoutTemplate:"layout",
	loadingTemplate:"loading",
	notFoundTemplate: 'notFound',
	/*waitOn: function(){
		return Meteor.subscribe("campaigns");
	}*/
});

Router.route("/",{
	name:"campaignsList",
	data: function(){
		return {campaigns: Campaigns.find()};
	},
	waitOn: function(){
		return Meteor.subscribe("campaigns");
	}
});

Router.route("/campaign/:_id",{
	name:"campaignVote",
	data: function(){ 
		if(this.ready()){
			campaign = Campaigns.findOne({"_id":this.params._id});
			campaign.groups.sort(function(a,b){
						return b.votes-a.votes; 
					});
			return {campaign:campaign}
		}
		else{
			return {};
		};
	},
	waitOn: function(){
		return Meteor.subscribe("campaign",this.params._id);
	},
	onBeforeAction: function(pause){
		if(!Campaigns.findOne({"_id":this.params._id})){
			this.render("notFound");
		}
		else if(!this.ready()){
			this.render("loading");
			pause();
		}
		else{
			this.next();
		}
	}
});


//Router.onBeforeAction('dataNotFound', {only: 'campaignVote'});

/*
db.users.aggregate(
	{$unwind:"$votes"},
	{$match:{
		"votes.campaignId":"gqBpBu93cSJ5oQA2k"
		}
	},
	{$group:{
		_id:"$votes.campaignId",
		votes:{$sum:"$votes.qty"}
		}
	})
*/