//VERY INSECURE

function timer(clock){
	if(clock > 0){
		Session.set("timeLeft",clock-1);
	}
	else{
		Meteor.clearInterval(interval);
		delete interval;
		console.log("You can now vote!");
		Session.set("timeLeft",null);
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
});
