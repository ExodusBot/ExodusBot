var Clapp = require('../modules/clapp-discord');

//Purge Function
function purgeFunc(argv, context){

		var recieved = context.msg.channel.fetchMessages({limit: 100})
			.then(recieved =>{
				console.log(`Received ${recieved.size} messages`);
				console.log(context.msg.content + " from channel " + context.msg.channel.id);
				for(var mes of recieved.values()){
					if( mes.content.startsWith("[Now Playing]")||
						mes.content.startsWith("Error while playing")||
						mes.content.startsWith("I can't find a role with that name")||
						mes.content.startsWith("-eb")||
						mes.content.startsWith("If you want to cancel, type cancel.")){
						console.log("deleting message " + mes.content);
						mes.delete(500);
					}else if(mes.content.includes("https://www.youtube.com/watch?v=")||
							mes.content.includes("https://youtu.be/")){
						context.bot.guilds.get(context.msg.guild.id)
						   .channels.find(val => val.name == 'funy_vibeos_xd')
						   .sendMessage(mes.content);
						console.log("moving message " + mes.content);
						mes.delete(500);
					}
				}
		});
}
module.exports = new Clapp.Command({
	name: "purge",
	desc: "Clears unwanted messages",
	fn: purgeFunc
});
