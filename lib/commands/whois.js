var Clapp = require('../modules/clapp-discord');

function f(argv, context){
  var json = JSON.parse("./resources/peopleirl.json");
  var getn = json.people.find(val => val.discordname === argv.args.person);
  context.msg.channel.sendMessage(argv.args.person + " is " getn.name);
}
var arg = new Clapp.Argument({
  name: 'person',
  desc: 'person',
  type: 'string',
  required: true,
  default: 'ExodusBot'
});
var flags = [
  new Clapp.Flag({
    name: 'saveid',
    desc: 'saves ur current discord id',
    alias: 's',
    type: 'boolean'
  }),
  new Clapp.Flag({
    name: 'savename',
    desc: 'saves ur current discord name',
    alias: 'n',
    type: 'boolean'
  })
];
module.exports = new Clapp.Command({
  name: 'whois',
  desc: 'find out who that is',
  fn: f,
  args: [arg],
  flags: flags
});
