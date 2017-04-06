var Clapp = require('../modules/clapp-discord');

//archive function
module.exports = new Clapp.Command({
  name: "archive",
  desc: "Archives messages",
  fn: (argv, context) => {
    var m = context.msg;
    if(argv.args.num > 0){
      if(m.member.hasPermission("MANAGE_MESSAGES") || m.member.roles.has("Librarian")){
        var messages = m.channel.fetchMessages({limit: argv.args.num + 1}).then(messages =>{
          for(var mes of messages.values()){
            context.bot.guilds.get(m.guild.id)
               .channels.find(val => val.name == 'archive')
               .sendMessage(mes.content);
          }
          m.channel.sendMessage(`Moved ${argv.args.num} messages`);
          m.channel.bulkDelete(messages);
        })
      }
    }else m.channel.sendMessage("Psyche, thats the wrong numbah!");
  },
  args: [{
    name: "num",
    desc: "number of messages to be archived",
    type: "number",
    required: true,
    default: 0
  }]
});
