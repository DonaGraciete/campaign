/*Template.campaignVote.helpers({
	isLoggedIn: function(){
		return Meteor.user();
	}
});*/

Template.campaignVote.events({
	'submit .voteForm': function(e,template){
		e.preventDefault();
		campaign = template.data.campaign;
		groupName = $(e.target).find("[name=name]").val();
		votePassed = Meteor.call("addVote",campaign._id,campaign.cooldown,campaign.finished,groupName,Meteor.userId());
	}
});

/*
Template.campaignVote.helpers({
	"cantVote": function(){
		if(Meteor.userId()){
			res = Meteor.users.findOne({"_id":Meteor.userId(),"cooldowns.campaignId":this.campaign._id});
			console.log("got here");
			if(res){
				if(Session.get("timeLeft")==undefined){
					console.log("and here");
					timeLeft = parseInt((res.cooldowns[0].cooldown*1000-(now-res.cooldowns[0].lastVoteDate))/1000);
					Session.set("timeLeft",timeLeft);
					Session.set("interval",
						Meteor.setInterval(function(){
							Session.set("timeLeft",Session.get("timeLeft")-1);
						},1000)
					);
					return true;
				}
				else{
					console.log("and below");
					return true;
				}
			}
			else{
				console.log("and finished");
				if(Session.get("timeLeft")!=undefined){
					delete Session.keys["timeLeft"];
				}
				if(Session.get("interval")!=undefined){
					Meteor.clearInterval(Session.get("interval"));
					delete Session.keys["interval"];
				}
				return false;
			}
		}
		else{
			if(Session.get("timeLeft")!=undefined){
				delete Session.keys["timeLeft"];
			}
			if(Session.get("interval")!=undefined){
				Meteor.clearInterval(Session.get("interval"));
				delete Session.keys["interval"];
			}
			return false;
		}
	},
	"timeLeft":function(){
		return Session.get("timeLeft");
	}
});

*/

recursiveTimeout = function(timeLeft){
	Session.set("timeLeft",timeLeft);
	if(Session.get("timeLeft")>0){
		Meteor.setTimeout(function(){
			recursiveTimeout(Session.get("timeLeft")-1);
		},1000);
	}
	else{
		delete Session.keys["timeLeft"];
	}
}

/*
Template.campaignVote.helpers({
	timer: function(){
		if(Meteor.userId()){
			console.log("here");
			res = Meteor.users.findOne({"_id":Meteor.userId(),"cooldowns.campaignId":this.params._id});
			if(res){
				timeLeft = parseInt((res.cooldowns[0].cooldown*1000-(now-res.cooldowns[0].lastVoteDate))/1000);
				if(!Session.get("timeLeft")){
					recursiveTimeout(timeLeft);					
				//Session.set("timeLeft",timeLeft);
				//FAZER ISTO COM O ADDED PARA COMEÇAR O
				}
			}
		}
	},
	timeLeft: function(){return Session.get("timeLeft");}
});
*/


/*
function timer(clock){
	if(clock > 0){
		Session.set("timeLeft",clock-1);
	}
	else{
		Meteor.clearInterval(interval);
		console.log("You can now vote!");
		Session.set("timeLeft",null);
		Session.set("timerSet",false);
	}
}

Template.timer.helpers({
	timeLeft: function(){
		if(Session.equals("timerSet",false) && !Session.equals("timeLeft",null)){
			interval = Meteor.setInterval(function(){
				timer(Session.get("timeLeft"));
			},1000);
			Session.set("timerSet",true);
		}
		return Session.get("timeLeft");
	}
});*/

