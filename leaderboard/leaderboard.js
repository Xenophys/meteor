PlayersList = new Mongo.Collection('players');
if (Meteor.isClient){
	Template.leaderboard.helpers({
		'player' : function(){
				return PlayersList.find({}, {sort: {score: -1, name: 1} });
    	},
    	'selectedClass' : function () {
			var playerId = this._id;
			var selectedPlayer = Session.get('selectedPlayer');
			if (playerId == selectedPlayer){
    			return 'selected'
			}
    	}
  	});
  	Template.leaderboard.events({
  		'click .player' : function(){
  			var playerId = this._id;
  			Session.set('selectedPlayer',playerId);
  		},
			'click .increment' : function(){
				var selectedPlayer = Session.get('selectedPlayer');
				PlayersList.update(selectedPlayer, {$inc: {score: 5}});
			},
			'click .decrement' : function(){
				var selectedPlayerId = Session.get('selectedPlayer');
				var selectedPlayer = PlayersList.findOne(selectedPlayerId);
				var playerScore = selectedPlayer.score;
				if (playerScore <= 5){
					PlayersList.update(selectedPlayer._id, {$set: {score: 0}});
				} else {
					PlayersList.update(selectedPlayer._id, {$inc: {score: -5}});
				}
			},
			'click .delete' : function(){
				PlayersList.remove(this._id);
			},
			'click .reset' : function(){
				var allPlayers = PlayersList.find({}).forEach(function(player){PlayersList.update(player._id, {$set: {score: 0}});});				
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
