const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "gs!"

client.on('guildMemberAdd', (member) => {
  if (member.guild.id == "445192688778739722"){
    console.log(`New member (${member.displayName}) joined ${member.guild.name}`);
    client.guilds.get("445192688778739722").channels.get("445195366221217803").send(`Welcome <@${member.user.id}>`)
  }
});

client.on('message', async msg => {

  if (msg.content === prefix+'help') {
    msg.channel.send('Current commands:')
      msg.channel.send('- help\n'+'- invite\n'+'- info\n'+'- stats\n'+'- myperms\n'+'- avatar\n'+'- serverlist\n'+'- purge\n'+'- ping\n'+'- mainpartners\n')
  }

  if (msg.content === prefix+'invite') {
    msg.channel.send('Direct invite link:\n'+'<https://discordapp.com/oauth2/authorize?client_id=505391086869676032&scope=bot>\n'+'Community server:\n'+'https://discord.gg/6Uy2cXb')
  }

  if (msg.content === prefix+'info') {
    msg.channel.send('**Current Information:**\n')
    let m = '';
    m += '__I currently have access to:__\n';
    m += `${client.channels.size} channels\n`;
    m += `${client.guilds.size} servers\n`;
    m += `${client.users.size} users\n`;
    m += '__This server has:__\n';
    m += `${msg.guild.channels.size} channels\n`;
    m += `${msg.guild.members.size} members\n`;
    msg.channel.send('Loading...').then(msg => msg.edit(m)).catch(console.error);
  }

  if (msg.content === prefix+'mainpartners') {
    msg.channel.send('__Current partners:__')
      msg.channel.send('24/7 Bot. Created by @DELUUXE#1608\n'+'**To become a main partner, DM Funky#2177**')
  }

  if (msg.content === prefix+'stats') {
    let m = '';
    m += `I am aware of ${msg.guild.channels.size} channels\n`;
    m += `I am aware of ${msg.guild.members.size} members\n`;
    m += `I am aware of ${client.channels.size} channels overall\n`;
    m += `I am aware of ${client.guilds.size} servers overall\n`;
    m += `I am aware of ${client.users.size} users overall\n`;
    msg.channel.send('Scanning...').then(msg => msg.edit(m)).catch(console.error);
  }

  if (msg.content === prefix+'myperms') {
    msg.channel.send('Your permissions are:\n' +
      JSON.stringify(msg.channel.permissionsFor(msg.author).serialize(), null, 4));
  }

  
  if (msg.content === prefix+'avatar') {
    msg.channel.send(msg.author.avatarURL)
  }

  if (msg.content === prefix+'serverlist') {
    if(msg.author.id != "271706081741242384"){return}
    msg.channel.send("Servers:")
  client.guilds.forEach((guild) => {
      msg.channel.send(" - " + guild.name)
      })
  }

  if (msg.content.startsWith(prefix+'purge')) {//if a message start's with prefix+'purge'
    if(msg.author.id != "271706081741242384"){return}//check if owner send command
    let messageAmount = msg.content.substr(prefix.length+6)//grab sting after the (prefix length)+6 characters
    msg.channel.bulkDelete(parseInt(messageAmount)+1)//call bulkDelete and pass the message amount
    .then(messages => msg.channel.send(`I have terminated ${messages.size-1} messages master`))//after bulk delete is complete this triggers
    .catch(console.error);//if bulkDelete fails log an error, but keep running
  }

  if(msg.content == prefix+"ping"){
    const m = await msg.channel.send("Pinging...");
    m.edit(`Pong! Latency is ${m.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  if (!msg.guild) return;

  if (msg.content === prefix+'join') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (msg.member.voiceChannel) {
      msg.member.voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
          msg.reply('I have successfully connected to the channel!');
        })
        .catch(console.log);
    } else {
      msg.reply('You need to join a voice channel first!');
    }
  }

  if (msg.content === prefix+'vckick') {
    if (!msg.guild.me.hasPermission(['MANAGE_CHANNELS', 'MOVE_MEMBERS'])) return msg.reply('Missing the required `Manage Channels` and `Move Members` permissions.');

    // Get the mentioned user/bot and check if they're in a voice channel:
    const member = msg.mentions.members.first();
    if (!member) return msg.reply('You need to @mention a user/bot to kick from the voice channel.');
    if (!member.voiceChannel) return msg.reply('That user/bot isn\'t in a voice channel.');

    // Now we make a temporary voice channel, move the user/bot into the channel, and delete it:
    const temp_channel = await msg.guild.createChannel(user.id, 'voice', [
      { id: guild.id,
        deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK'], },
      { id: member.id,
        deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK'] }
    ]);
    await member.setVoiceChannel(temp_channel);

    await temp_channel.delete();

    // Finally, pass some user response to show it all worked out:
    msg.react('👌');
    /* or just "message.reply", etc.. up to you! */
  }

});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.guilds.get("445192688778739722").channels.get("506020317659922432").send(`Game Stormer is up and fully functional!`)
  console.log("Servers:")
  client.guilds.forEach((guild) => {
      console.log(" - " + guild.name)
  client.user.setActivity(`out for gs!help on ${client.guilds.size} servers!`, {type: "WATCHING"})
  })
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  client.guilds.get("445192688778739722").channels.get("506224748280414238").send(`New server joined: ${guild.name} (id: ${guild.id}). This server has ${guild.memberCount} members!`);
  client.user.setActivity(`out for gs!help on ${client.guilds.size} servers!`, {type: "WATCHING"});
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  client.guilds.get("445192688778739722").channels.get("506224748280414238").send(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`out for gs!help on ${client.guilds.size} servers!`, {type: "WATCHING"});
});

client.login('NTA1MzkxMDg2ODY5Njc2MDMy.DrZPqQ.-v7v4LM5M_mitKOLbQYeBss8Hxo');