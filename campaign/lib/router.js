Router.configure({
	layoutTemplate:"layout",
	loadingTemplate:"loading",
	notFoundTemplate: 'notFound',
	notAuthorizedTemplate: "notAutorized"
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
			now = new Date();

			campaign = Campaigns.findOne({"_id":this.params._id});
			campaign.groups.sort(function(a,b){return b.votes-a.votes;});
			campaign.groups.map(function(doc, index, cursor) {
			    var newDoc = _.extend(doc, {index: index+1});
			    return newDoc;
			});

			canVote = null;
			Session.set("timeLeft",null);
			Session.set("timerSet",false);

			if(Meteor.userId()){
				res = Meteor.users.findOne({"_id":Meteor.userId(),"cooldowns.campaignId":this.params._id});
				if(res){
					timeLeft = parseInt((campaign.cooldown*1000-(now-res.cooldowns[0].lastVoteDate))/1000);
					Session.set("timeLeft",timeLeft);
					/*if(!interval){
						interval = Meteor.setInterval(function(){timer(clock);}, 1000);
						*/
				}
			}
			else{
				res = null;
			}

			return {
				campaign:campaign,
				canVote:res
			}
		}
		else{
			return {};
		};
	},
	waitOn: function(){
		return [Meteor.subscribe("campaign",this.params._id),
				Meteor.subscribe("userCampaignVotes",this.params._id,Meteor.userId())];
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

Router.route("/admin",{
	name:"admin"
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