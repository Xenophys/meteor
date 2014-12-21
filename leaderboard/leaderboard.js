PlayersList = new Mongo.Collection('players');
if (Meteor.isClient){
	Template.leaderboard.helpers({
		'player' : function(){
				return PlayersList.find({}, {sort: {score:-1}});
    	},
    	'selectedClass' : function () {
			var playerId = this._id;
			var selectedPlayer = Session.get('selectedPlayer')
			if (playerId == selectedPlayer){
    			return 'selected'
			}
    	}
  	});
  	Template.leaderboard.events({
  		'click .player' : function(){
  			var playerId = this._id;
  			Session.set('selectedPlayer',playerId);
  		}
  	});
		Template.addPlayerForm.events({
			'submit form' : function(evt){
				evt.preventDefault();
				var playerNameVar=evt.target.playerName.value;
				PlayersList.insert({name: playerNameVar, score: 0});
				evt.target.playerName.value="";
			}
		});
} //isClient
if (Meteor.isServer){

} //isServer
