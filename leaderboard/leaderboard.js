PlayersList = new Mongo.Collection('players');
if (Meteor.isClient){
  Template.leaderboard.helpers({
    'player' : function(){
      return PlayersList.find({}, {sort: {score:-1}});
    }
  });
}
if (Meteor.isServer){
  
}