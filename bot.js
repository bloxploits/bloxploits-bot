const botSettings = require("./botsetting.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;
const prefix2 = botSettings.prefix;
const fs = require("fs");
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const bot = new Discord.Client({disableEveryone: true});

bot.userData = JSON.parse(fs.readFileSync('./userData.json', 'utf8'));
bot.commands = new Discord.Collection();
bot.prefix = require('./botsetting.json');
bot.sales = require('./sales.json');
bot.mutes = require("./mutes.json");

app.get("/", function(req, res) {
    res.send("Heroku is ready!")
});

app.listen(port);

fs.readdir("./cmds/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop()=== "js");
    if(jsfiles.length <= 0) {
        console.log("No commands to load!");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});




bot.on("ready", function() {
    console.log(`Bloxploits Bot v2 is ready! ${bot.user.username}`);

    bot.user.setGame("Auto-Buy | !buy");

    bot.setInterval(() => {

      for(let i in bot.sales) {
        if(bot.sales.sales < 1) {
            delete bot.sales[i];

            fs.writeFile('./sales.json', JSON.stringify(bot.sales), err => {
                if(err) throw err;

            });
        }
      }
    }, 2000);

    bot.setInterval(() => {
      const embed85 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setAuthor("Bloxploits Bot", "http://i.imgur.com/g3fCKSE.png")
      .addField("Mute Command", `You have been unmuted from the bloxploits Discord automatically!`)
      .setFooter("Bloxploits Bot - by bloxploits");
        for(let i in bot.mutes) {
          let time = bot.mutes[i].time;
          let guildId = bot.mutes[i].guild;
          let guild = bot.guilds.get(guildId);
          let member = guild.members.get(i);
          let mutedRole = guild.roles.find(r => r.name === "mute u");
          if(!mutedRole) continue;

          if(Date.now() > time) {
              member.removeRole(mutedRole);
              delete bot.mutes[i];

              fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
                  if(err) throw err;
                  member.send({embed: embed85})
              });
          }
        }
    }, 2000)



});


bot.on("guildMemberRemove", member => {
  let guild = member.guild;
  let channel = guild.channels.get('330933145526337537');
  channel.send(`${member.user} has left the server!`);
});

bot.on("roleUpdate", role => {
    let member = bot.users.get('300523391151243275');

    member.send(`A role has been created!`);
});

bot.on("guildMemberAdd", member => {
  const embed = new Discord.RichEmbed()
  .setColor("#FFFFFF")
  .setAuthor("Bloxploits Bot", "http://i.imgur.com/g3fCKSE.png")
  .addField("Verification", `Welcome to the official bloxploits Discord! Type !verify in #verify to verify yourself!`)
  .setFooter("Bloxploits Bot - by bloxploits");
  let guild = member.guild;
  let channel = guild.channels.get('330933145526337537');
  member.addRole('345838895189065739');
  member.send({embed: embed});
  channel.send(`${member.user} has joined the server. Have fun!`);

  return;
});

bot.on("message", async message => {
let talkedRecently = new Set();
if (talkedRecently.has(message.author.id)) {
  return;
}
talkedRecently.add(message.author.id);
setTimeout(() => {
  if(message.author.id === bot.user.id) return;
  talkedRecently.delete(message.author.id);
  talkedRecently.delete();
}, 2500);

  let c = message.channel;
  if(message.channel.name === "open0") return message.channel.setName("generalsalesclosed");


    if (message.content == "hi") {
        message.channel.send("Hello, want a friend?");

    }

    if (message.content == "Hi") {
        c.send("Hello, want a friend?");

    }

       if (message.content == "no") {
        message.channel.send(":frowning:");
    }

           if (message.content == "why is macfatty so fat?") {
        message.channel.send("Uhhhh, cas he eats macfattydonalds!");
    }

    if (message.content == "No") {
     message.channel.send(":frowning:");
 }

  if (message.content == "yes") {
    message.channel.send("Ok!");
  }
  if (message.content == "why is gaylen gay?") {
    message.channel.send("really...");

  }
    if (message.content.toLowerCase().indexOf("http") > -1) {
      let user = message.guild.member(message.author.id);
      let role = message.guild.roles.find(r => r.name === "permited");
      let role2 = message.guild.roles.find(r => r.name === "can post links");
      let role3 = message.guild.roles.find(r => r.name === "VIP");
      let role4 = message.guild.roles.find(r => r.name === "Advertiser");
      if(user.roles.has(role2.id)) return;
      if(user.roles.has(role3.id)) return;
      if(user.roles.has(role4.id)) return;
      if(user.roles.has(role.id)) return user.removeRole(role);
      message.delete();
      };
        if (message.content.toLowerCase().indexOf("discord.") > -1) {

          let user = message.guild.member(message.author.id);
          let role2 = message.guild.roles.find(r => r.name === "can post links");

          let role4 = message.guild.roles.find(r => r.name === "Advertiser");
          if(user.roles.has(role2.id)) return;
          if(user.roles.has(role4.id)) return;

          message.channel.send(`!mute ${message.author} 30 Trying to Advertise other Discord servers.`);
          message.delete();
          };

              if (message.content.toLowerCase().indexOf("!6534") > -1) {
                message.delete();

                };

                if (message.content.toLowerCase().indexOf("@everyone") > -1) {
                  let user = message.guild.member(message.author.id);
                  let role = message.guild.roles.find(r => r.name === "can mention");
                  if(user.roles.has(role.id)) return;
                  message.delete();
                  };

                  if (message.content.toLowerCase().indexOf("@here") > -1) {
                    let user = message.guild.member(message.author.id);
                    let role = message.guild.roles.find(r => r.name === "can mention");
                    if(user.roles.has(role.id)) return;
                    message.delete();
                    };


                    let messageArray = message.content.split(" ");
                    let command = messageArray[0];
                    let args = messageArray.splice(1);

                    if(!command.startsWith(prefix)) return;

                    let cmd = bot.commands.get(command.slice(prefix.length));

                    if(cmd) cmd.run(bot, message, args, c);

                    if(command === `${prefix}stella`) {
                        c.send("Stella is a gay faggot, that tells me to learn how to type fast while she(might be a guy), while she is typing 1 word a century.")
                    }

                    if(command === `${prefix}jazz`) {
                        c.send("@PiggyDerp#2294 WHY U LEAVE DA SKYPE CALL");
                    }

                    if(command === `${prefix}36345635`) {
                      let guild = bot.guilds.get('id');

                      let role = bot.guilds.get("330933145526337537").roles.find("name","Advertiser");

                      if(message.channel.type !== "dm") return;

                      const embed = new Discord.RichEmbed()

                      .setColor("#FFFFFF")
                      .setAuthor("Bloxploits Bot", "http://i.imgur.com/g3fCKSE.png")
                      .addField("Whitelisting Command", `You have been given the Advertiser Role! Thank you for buying!`)
                      .setFooter("Bloxploits Bot - by bloxploits");
                      return message.channel.send({embed: embed}), bot.guilds.get("330933145526337537").members.get(message.author.id).addRole(role);

                    }

                    if(command === `${prefix}3563456345`) {
                      let guild = bot.guilds.get('id');

                      let role = bot.guilds.get("330933145526337537").roles.find("name","Advertiser");
                      if(message.channel.type !== "dm") return;

                      const embed = new Discord.RichEmbed()

                      .setColor("#FFFFFF")
                      .setAuthor("Bloxploits Bot", "http://i.imgur.com/g3fCKSE.png")
                      .addField("Whitelisting Command", `You have been given the Advertiser Role! Thank you for buying!`)
                      .setFooter("Bloxploits Bot - by bloxploits");
                      return message.channel.send({embed: embed}), bot.guilds.get("330933145526337537").members.get(message.author.id).addRole(role);

                    }

                    if(command === `${prefix}35635634`) {
                      let guild = bot.guilds.get('id');

                      let role = bot.guilds.get("330933145526337537").roles.find("name","Advertiser");
                      if(message.channel.type !== "dm") return;

                      const embed = new Discord.RichEmbed()

                      .setColor("#FFFFFF")
                      .setAuthor("Bloxploits Bot", "http://i.imgur.com/g3fCKSE.png")
                      .addField("Whitelisting Command", `You have been given the Advertiser Role! Thank you for buying!`)
                      .setFooter("Bloxploits Bot - by bloxploits");
                      return message.channel.send({embed: embed}), bot.guilds.get("330933145526337537").members.get(message.author.id).addRole(role);

                    }

                    if(command === `${prefix}356353`) {
                      let guild = bot.guilds.get('id');

                      let role = bot.guilds.get("330933145526337537").roles.find("name","Advertiser");




                      if(message.channel.type !== "dm") return;

                      const embed = new Discord.RichEmbed()

                      .setColor("#FFFFFF")
                      .setAuthor("Bloxploits Bot", "http://i.imgur.com/g3fCKSE.png")
                      .addField("Whitelisting Command", `You have been given the Advertiser Role! Thank you for buying!`)
                      .setFooter("Bloxploits Bot - by bloxploits");
                      return message.channel.send({embed: embed}), bot.guilds.get("330933145526337537").members.get(message.author.id).addRole(role);

                    }

                    if(command === `${prefix}35634534`) {
                      let guild = bot.guilds.get('id');

                      let role = bot.guilds.get("330933145526337537").roles.find("name","Advertiser");

                      if(message.channel.type !== "dm") return;

                      const embed = new Discord.RichEmbed()

                      .setColor("#FFFFFF")
                      .setAuthor("Bloxploits Bot", "http://i.imgur.com/g3fCKSE.png")
                      .addField("Whitelisting Command", `You have been given the Advertiser Role! Thank you for buying!`)
                      .setFooter("Bloxploits Bot - by bloxploits");
                      return message.channel.send({embed: embed}), bot.guilds.get("330933145526337537").members.get(message.author.id).addRole(role);

                    }

                    if(command === `${prefix}356345634`) {
                      let guild = bot.guilds.get('id');

                      let role = bot.guilds.get("330933145526337537").roles.find("name","Advertiser");
                      if(message.channel.type !== "dm") return;

                      const embed = new Discord.RichEmbed()

                      .setColor("#FFFFFF")
                      .setAuthor("Bloxploits Bot", "http://i.imgur.com/g3fCKSE.png")
                      .addField("Whitelisting Command", `You have been given the Advertiser Role! Thank you for buying!`)
                      .setFooter("Bloxploits Bot - by bloxploits");
                      return message.channel.send({embed: embed}), bot.guilds.get("330933145526337537").members.get(message.author.id).addRole(role);

                    }

                    if(command === `${prefix}3563534`) {
                      let guild = bot.guilds.get('id');

                      let role = bot.guilds.get("330933145526337537").roles.find("name","Advertiser");




                      if(message.channel.type !== "dm") return;

                      const embed = new Discord.RichEmbed()

                      .setColor("#FFFFFF")
                      .setAuthor("Bloxploits Bot", "http://i.imgur.com/g3fCKSE.png")
                      .addField("Whitelisting Command", `You have been given the Advertiser Role! Thank you for buying!`)
                      .setFooter("Bloxploits Bot - by bloxploits");
                      return message.channel.send({embed: embed}), bot.guilds.get("330933145526337537").members.get(message.author.id).addRole(role);

                    }

                    if(command === `${prefix}3456334`) {
                      let guild = bot.guilds.get('id');

                      let role = bot.guilds.get("330933145526337537").roles.find("name","Advertiser");




                      if(message.channel.type !== "dm") return;

                      const embed = new Discord.RichEmbed()

                      .setColor("#FFFFFF")
                      .setAuthor("Bloxploits Bot", "http://i.imgur.com/g3fCKSE.png")
                      .addField("Whitelisting Command", `You have been given the Advertiser Role! Thank you for buying!`)
                      .setFooter("Bloxploits Bot - by bloxploits");
                      return message.channel.send({embed: embed}), bot.guilds.get("330933145526337537").members.get(message.author.id).addRole(role);

                    }

                    if(command === `${prefix}56335`) {
                      let guild = bot.guilds.get('id');

                      let role = bot.guilds.get("330933145526337537").roles.find("name","Advertiser");




                      if(message.channel.type !== "dm") return;

                      const embed = new Discord.RichEmbed()

                      .setColor("#FFFFFF")
                      .setAuthor("Bloxploits Bot", "http://i.imgur.com/g3fCKSE.png")
                      .addField("Whitelisting Command", `You have been given the Advertiser Role! Thank you for buying!`)
                      .setFooter("Bloxploits Bot - by bloxploits");
                      return message.channel.send({embed: embed}), bot.guilds.get("330933145526337537").members.get(message.author.id).addRole(role);

                    }

                    if(command === `${prefix}54635353`) {
                      let guild = bot.guilds.get('id');

                      let role = bot.guilds.get("330933145526337537").roles.find("name","Advertiser");




                      if(message.channel.type !== "dm") return;

                      const embed = new Discord.RichEmbed()

                      .setColor("#FFFFFF")
                      .setAuthor("Bloxploits Bot", "http://i.imgur.com/g3fCKSE.png")
                      .addField("Whitelisting Command", `You have been given the Advertiser Role! Thank you for buying!`)
                      .setFooter("Bloxploits Bot - by bloxploits");
                      return message.channel.send({embed: embed}), bot.guilds.get("330933145526337537").members.get(message.author.id).addRole(role);

                    }

                    if(command === `${prefix}5463453434`) {
                      let guild = bot.guilds.get('id');

                      let role = bot.guilds.get("330933145526337537").roles.find("name","Advertiser");




                      if(message.channel.type !== "dm") return;

                      const embed = new Discord.RichEmbed()

                      .setColor("#FFFFFF")
                      .setAuthor("Bloxploits Bot", "http://i.imgur.com/g3fCKSE.png")
                      .addField("Whitelisting Command", `You have been given the Advertiser Role! Thank you for buying!`)
                      .setFooter("Bloxploits Bot - by bloxploits");
                      return message.channel.send({embed: embed}), bot.guilds.get("330933145526337537").members.get(message.author.id).addRole(role);

                    }

                    if(command === `${prefix}546553`) {
                      let guild = bot.guilds.get('id');

                      let role = bot.guilds.get("330933145526337537").roles.find("name","Advertiser");




                      if(message.channel.type !== "dm") return;

                      const embed = new Discord.RichEmbed()

                      .setColor("#FFFFFF")
                      .setAuthor("Bloxploits Bot", "http://i.imgur.com/g3fCKSE.png")
                      .addField("Whitelisting Command", `You have been given the Advertiser Role! Thank you for buying!`)
                      .setFooter("Bloxploits Bot - by bloxploits");
                      return message.channel.send({embed: embed}), bot.guilds.get("330933145526337537").members.get(message.author.id).addRole(role);

                    }

                    if(command === `${prefix}546345635`) {
                      let guild = bot.guilds.get('id');

                      let role = bot.guilds.get("330933145526337537").roles.find("name","Advertiser");

                      if(message.channel.type !== "dm") return;

                      const embed = new Discord.RichEmbed()

                      .setColor("#FFFFFF")
                      .setAuthor("Bloxploits Bot", "http://i.imgur.com/g3fCKSE.png")
                      .addField("Whitelisting Command", `You have been given the Advertiser Role! Thank you for buying!`)
                      .setFooter("Bloxploits Bot - by bloxploits");
                      return message.channel.send({embed: embed}), bot.guilds.get("330933145526337537").members.get(message.author.id).addRole(role);
                    }



                    if(command === `${prefix}54634563563`) {
                      let guild = bot.guilds.get('id');

                      let role = bot.guilds.get("330933145526337537").roles.find("name","Advertiser");




                      if(message.channel.type !== "dm") return;

                      const embed = new Discord.RichEmbed()

                      .setColor("#FFFFFF")
                      .setAuthor("Bloxploits Bot", "http://i.imgur.com/g3fCKSE.png")
                      .addField("Whitelisting Command", `You have been given the Advertiser Role! Thank you for buying!`)
                      .setFooter("Bloxploits Bot - by bloxploits");
                      return message.channel.send({embed: embed}), bot.guilds.get("330933145526337537").members.get(message.author.id).addRole(role);

                    }

                    if(command === `${prefix}456334`) {
                      let guild = bot.guilds.get('id');

                      let role = bot.guilds.get("330933145526337537").roles.find("name","Advertiser");




                      if(message.channel.type !== "dm") return;

                      const embed = new Discord.RichEmbed()

                      .setColor("#FFFFFF")
                      .setAuthor("Bloxploits Bot", "http://i.imgur.com/g3fCKSE.png")
                      .addField("Whitelisting Command", `You have been given the Advertiser Role! Thank you for buying!`)
                      .setFooter("Bloxploits Bot - by bloxploits");
                      return message.channel.send({embed: embed}), bot.guilds.get("330933145526337537").members.get(message.author.id).addRole(role);

                    }



});


bot.login(process.env.BOT_TOKEN);

process.on("unhandledRejection", console.error)
