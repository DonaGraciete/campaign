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
		templateData = {
			campaign:Campaigns.findOne({"_id":this.params._id})
		}; 
		return templateData;
	},
	waitOn: function(){
		return Meteor.subscribe("campaign",this.params._id);
	},
	onBeforeAction: function(){
		if(!Campaigns.findOne({"_id":this.params._id})){
			this.render("notFound");
		}
		else{
			this.next();
		}
	}
});

//Router.onBeforeAction('dataNotFound', {only: 'campaignVote'});