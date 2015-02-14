kAdminConfig = {
    name: 'Your Panel Name',
    collections: {
    	Campaigns:{}
    }
}

/*AdminConfig = {
	nonAdminRedirectRoute: 'campaignsList',
	name: "Campaign",
	collections:{
		Campaigns:{}
	}
}
*/

/*
Schema = {}

Schema.Campaigns = new SimpleSchema({
	brand:{
		type:String
	},
	prize:{
		type:String
	},
	rules:{
		type:String
	},
	groups: {
	    type: [Object]
	},
	"groups.$.names": {
	    type: String
	},
	"groups.$.votes": {
	    type: Number
	},
	"groups.$.voters":{
		type: [Object],
		optional: true
	}
});

Campaigns.attachSchema(Schema.Campaigns);
*/
