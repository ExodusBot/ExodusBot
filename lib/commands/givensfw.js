var Clapp = require('../modules/clapp-discord');

function giveNsfwFunc(argv, context){
  context.msg.member.addRole(context.msg.guild.roles.get(val => val === 'NSFW Access'));
}
module.exports = new Clapp.Command({
  name: 'givensfw',
  desc: 'you were warned',
  fn: giveNsfwFunc
});
