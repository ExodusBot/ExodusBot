var Clapp = require('../modules/clapp-discord');
var m = require('../modules/exodusbot-modules/math');

function randFunc(argv, context){
  if(argv.flags.cs){
    var json = JSON.parse(context.fs.readFileSync('./resources/csmaps.json'));
    var rand = m.getRandomInt(0, json.maps.length);
    context.msg.channel.sendMessage('I CHOOSE: ' + json.maps[rand]);
  }else if(argv.flags.game){
    var json = JSON.parse(context.fs.readFileSync('./resources/games.json'));
    var rand = m.getRandomInt(0, json.games.length);
    context.msg.channel.sendMessage('I CHOOSE: ' + json.games[rand]);
  }else
  {
    context.msg.channel.sendMessage('No option was selected. Valid options are "-cs" and "-game".')
  }
}
var argsRand = [
  new Clapp.Flag({
    name: 'cs',
    desc: 'random cs map',
    type: 'boolean',
    default: false,
    alias: 'c'
  }),
  new Clapp.Flag({
    name: 'game',
    desc: 'random game to play',
    type: 'boolean',
    default: false,
    alias: 'g'
  })
];
module.exports = new Clapp.Command({
  name: 'random',
  desc: 'randomly selects things',
  fn: randFunc,
  flags: argsRand
});
