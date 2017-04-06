'use strict';
const fs      = require('file-system');
const Clapp   = require('./modules/clapp-discord');
const cfg     = require('../config.js');
const pkg     = require('../package.json');
const Discord = require('discord.js');
const bot     = new Discord.Client();
const request = require('request');
const cheerio = require('cheerio');

var express = require('express');
var exp     = express();

exp.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
exp.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(exp.get('port'), function() {
    console.log('App is running, server is listening on port ', exp.get('port'));
});

var app = new Clapp.App({
  name: cfg.name,
  desc: pkg.description,
  prefix: cfg.prefix,
  version: pkg.version,
  onReply: (msg, context) => {
    // Fired when input is needed to be shown to the user.

    context.msg.reply('\n' + msg).then(bot_response => {
      if (cfg.deleteAfterReply.enabled) {
        context.msg.delete(cfg.deleteAfterReply.time)
          .then(msg => console.log(`Deleted message from ${msg.author}: \"${msg.content}\"`))
          .catch(console.log);
        bot_response.delete(cfg.deleteAfterReply.time)
          .then(msg => console.log(`Deleted message from ${msg.author}: \"${msg.content}\"`))
          .catch(console.log);
      }
    });
  }
});

// Load every command in the commands folder
fs.readdirSync('./lib/commands/').forEach(file => {
  app.addCommand(require("./commands/" + file));
});

bot.on('message', msg => {
  // Fired when someone sends a message

  if (app.isCliSentence(msg.content)){
      app.parseInput(msg.content,
  	{
        msg: msg,
        bot: bot,
        request: request,
        cheerio: cheerio,
        discord: Discord
        // Keep adding properties to the context as you need them
  	});
  }
  if(msg.content.includes("nigger")){
  	msg.edit(msg.content.replace("nigger", "Bad Boy!"));
  	msg.channel.sendMessage("no u");
  	console.log(msg.author.name + " said a forbidden word");
  }
  if(msg.content.includes("kike")){
  	msg.edit(msg.content.replace("kike", "Bad Boy!"));
  	msg.channel.sendMessage("no u");
  	console.log(msg.author.name + " said a forbidden word");
  }
  if(msg.content.includes("christian besau")){
  	msg.edit(msg.content.replace("christian besau", "Bad Boy!"));
  	msg.channel.sendMessage("no u");
  	console.log(msg.author.name + " said a forbidden word");
  }
});

bot.login(cfg.token).then(() => {
  console.log('Running!');
});
