//'use strict';

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



function deleteTimeSession(){
	if(Session.get("timeLeft")!=undefined){
		delete Session.keys["timeLeft"];
	}
	if(Session.get("interval")!=undefined){
		Meteor.clearInterval(Session.get("interval"));
		delete Session.keys["interval"];
	}
}

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

			res = null;
			if(Meteor.userId()){
				res = Meteor.users.findOne({"_id":Meteor.userId(),"cooldowns.campaignId":this.params._id});
				if(res){
					if(Session.get("timeLeft")==undefined){
							// FIX THE COOLDOWN INDEX, IT IS CAUSING ALWAYS THE SAME CAMPAIGN'S COOLDOWN TO BE SELECTED
						timeLeft = parseInt((res.cooldowns[0].cooldown*1000-(now-res.cooldowns[0].lastVoteDate))/1000);
						console.log("timeleft "+timeLeft);

						Session.set("timeLeft",timeLeft);
						Session.set("interval",
							Meteor.setInterval(function(){
								Session.set("timeLeft",Session.get("timeLeft")-1);
							},1000)
						);
					}
				}
				else{
					deleteTimeSession();
				}
			}
			else{
				deleteTimeSession();
			}

			return {
				campaign:campaign,
				timeLeft:Session.get("timeLeft"),
				cantVote: res
			}
		}
		else{
			return {};
		};
	},
	unload: function(){
		deleteTimeSession();
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

/*
Router.route("/admin",{
	name:"admin"
});
*/

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