var Clapp = require('../modules/clapp-discord');

//NSFW Function: Webscraper using context.cheerio and context.request
function rule34Func(argv, context){
  console.log("--recieved r34 context.request--");
  console.log("r34arg: " + argv.args.r34arg);
	var searchurl2 = 'https://rule34.paheal.net/post/list/' + argv.args.r34arg + '/1';
  if(argv.args.r34arg == 'all') searchurl2 = 'https://rule34.paheal.net/post/list/1';
	let linkm;
  let imglink;
  console.log("searchurl2: " + searchurl2);
	context.request(searchurl2, function(error, response, html){
		if(!error){
			var $ = context.cheerio.load(html);
			var rand = Math.floor((Math.random() * $('.shm-image-list').children().length));
			var selector = $('.shm-image-list').children().eq(rand);
      console.log("selector: " + selector.children().first().attr('href'));
			linkm = "https://rule34.paheal.net" + selector.children().first().attr('href');
      if(selector.children().first().attr('href') == undefined){
        context.msg.channel.sendMessage("nothing on paheal...");
      }else{
      context.request(linkm, function(error, response, html){
    		if(!error){
          console.log("in second context.request now");
    			var $ = context.cheerio.load(html);
    			imglink = $('#Imagemain').children('.blockbody').children().first().attr('src');
          var emb = new context.discord.RichEmbed()
        		.setImage(imglink)
            .setDescription('me me big boy');
          context.msg.channel.sendEmbed(emb, 'me me big boy', { disableEveryone: true });
    		}
    	});
    }
		}
	});
}
var r34Arg = new Clapp.Argument({
	name: "r34arg",
	desc: "A string to be searched",
	type: "string",
	required: true,
  default: "all"
});
module.exports = new Clapp.Command({
	name: "r34",
	desc: "Searches the depths of the internet for the worse things imaginable",
	fn: rule34Func,
  args: [r34Arg]
});
