var Clapp = require('../modules/clapp-discord');

//truepurge function
function truePurgeFunc(argv, context){
   var m = context.msg;
   var sender = context.msg.author;
   if(argv.args.num > 0){
     if(m.member.hasPermission("MANAGE_MESSAGES")){
       var messages = m.channel.fetchMessages({limit: argv.args.num + 1}).then(messages =>{
         m.channel.bulkDelete(messages);
       })
     }
     else{
       m.channel.sendMessage("Error: No Permission: MANAGE_MESSAGES");
     }
   }else m.channel.sendMessage("Psyche, thats the wrong numbah!");
}
var truePurgeArgs = new Clapp.Argument({
  name: "num",
  desc: "number of messages to be deleted",
  type: "number",
  required: true,
  default: 0
});
module.exports = new Clapp.Command({
  name: "truepurge",
  desc: "Clears all messages",
  fn: truePurgeFunc,
  args: [truePurgeArgs]
});
