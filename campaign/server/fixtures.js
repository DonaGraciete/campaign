if (Campaigns.find().count() === 0) {
	Campaigns.insert({
		brand: 'CocaCola',
		prize: 'A free can!'
	});
	Campaigns.insert({
		brand: 'RedBull',
		prize: 'A free can!'
	});
	Campaigns.insert({
		brand: 'CocaCola',
		prize: 'A free can!'
	});
}