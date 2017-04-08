var Clapp = require('../modules/clapp-discord');

function soupFunc(argv, context){
  context.msg.channel.sendFile('../resources/soup');
}
module.exports = new Clapp.Command({
  name: 'soup',
  desc: 'soup',
  fn: soupFunc
});
