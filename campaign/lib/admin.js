
AdminConfig = {
	nonAdminRedirectRoute: 'campaignsList',
	name: "Campaign",
	collections:{
		Campaigns:{
			tableColumns: [
              {label: 'Brand', name: 'brand'},
              {label: 'ID', name: '_id'}
            ]
		}
	}
}

Schema = {}

Schema.Campaigns = new SimpleSchema({
	brand:{type:String},
	prize:{type:String},
	rules:{type:String},
	groups: {type: [Object]},
	"groups.$.name": {type: String},
	"groups.$.votes": {type: Number},
	"groups.$.voters":{
		type: [String],
		optional: true
	},
	img:{type:String},
	cooldown:{type:Number},
	finished:{type:Boolean},
	finishesAt:{type:Date},
	frenzy:{type:Object},
	"frenzy.started":{type:Boolean},
	"frenzy.message":{type:String,optional: true},
	extraMessage:{type:String,optional: true}
});

Campaigns.attachSchema(Schema.Campaigns);

