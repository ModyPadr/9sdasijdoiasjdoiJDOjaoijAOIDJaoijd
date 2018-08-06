//======================================[Const]======================================
const Discord = require("discord.js");
const client = new Discord.Client();
const bot = new Discord.Client();
const ms = require("ms");
const fs = require('fs');
const moment = require('moment');
const request = require('request');
const dateFormat = require('dateformat');
const r1 = require('snekfetch');
const Canvas = require("canvas");
const jimp = require('jimp')
const weather = require('weather-js');
const ytdl = require("ytdl-core");
const getYoutubeID = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");
const queue = new Map();
const prefix = "!";
const adminprefix = "!";
const admin = "!";
const developers = ["316324088865882142","408136927259131905","418064523157700609"]

  



//======================================[Client]======================================



client.on('guildMemberAdd', member=> {
  var guild = '471426842667253761';
    member.addRole(member.guild.roles.find("name","Clients"));
    });
    
    client.on('message', function(message) {
    if (message.channel.type === "dm") {
        if (message.author.id === client.user.id) return;
        var iiMo = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setTitle('``` New Dm Mesage ```')
            .setThumbnail(`${message.author.avatarURL}`)
            .setDescription(`\n\n\`\`\`${message.content}\`\`\``)
            .setFooter(`From : (@${message.author.tag})  |  (${message.author.id})`)
        client.channels.get("475889317907136513").send({ embed: iiMo });
    }
});
    
//======================================[Owners]======================================


client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!developers.includes(message.author.id)) return;
      
  if (message.content.startsWith(admin + 'ply')) {
    client.user.setGame(argresult);
      message.channel.send(`** :heart:  ${argresult}**`)
  }  else  
  if (message.content.startsWith(admin + 'wt')) {
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.send(`** :heart:  ${argresult}**`)
  } else 
  if (message.content.startsWith(admin + 'ls')) {
  client.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.send(`** :heart:  ${argresult}**`)
  } else 
  if (message.content.startsWith(admin + 'st')) {
    client.user.setGame(argresult, "https://www.twitch.tv/idk");
      message.channel.send(`** :heart:  **`)
  }
  if (message.content.startsWith(admin + 'setname')) {
  client.user.setUsername(argresult).then
      message.channel.send(`Changing The Name To ..**${argresult}** `)
} else
if (message.content.startsWith(admin + 'setavatar')) {
  client.user.setAvatar(argresult);
    message.channel.send(`Changing The Avatar To :**${argresult}** `);
}
});  


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


const yt_api_key = "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4";
const discord_token = "NDIyMDM3NzQwNTkxMzgyNTI4.DYV8zA.6vBJjF7Op9T_bH_YOwRMXqwh9vc";
client.login(discord_token);
client.on('ready', function() {
	console.log(`i am ready ${client.user.username}`);
});

const LoginBot = client.login
const Token = "NDc1OTA4OTI3Mzg1NzYzODQ0.Dkl4Rg.A9XgANxF071VQrrJkFX3AjAYRH8"

LoginBot.Token;



/*
////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\
*/
var servers = [];
var queue = [];
var guilds = [];
var queueNames = [];
var isPlaying = false;
var dispatcher = null;
var voiceChannel = null;
var skipReq = 0;
var skippers = [];
var now_playing = [];
/*
\\\\\\\\\\\\\\\\\\\\\\\\/////////////////////////
\\\\\\\\\\\\\\\\\\\\\\\\/////////////////////////
\\\\\\\\\\\\\\\\\\\\\\\\/////////////////////////
\\\\\\\\\\\\\\\\\\\\\\\\/////////////////////////
*/
client.on('ready', () => {});
console.log("Logged")
var download = function(uri, filename, callback) {
	request.head(uri, function(err, res, body) {
		console.log('content-type:', res.headers['content-type']);
		console.log('content-length:', res.headers['content-length']);

		request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
	});
};

client.on('message', function(message) {
	const member = message.member;
	const mess = message.content.toLowerCase();
	const args = message.content.split(' ').slice(1).join(' ');

	if (mess.startsWith(prefix + 'play')) {
		if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(':x:');
		if (!message.member.voiceChannel) return message.reply('** You Are Not In VoiceChannel **');
		// if user is not insert the URL or song title
		if (args.length == 0) {
			let play_info = new Discord.RichEmbed()
				.setAuthor(client.user.username, client.user.avatarURL)
				.setDescription('**قم بوضع الرابط , او  الاسم**')
			message.channel.sendEmbed(play_info)
			return;
		}
		if (queue.length > 0 || isPlaying) {
			getID(args, function(id) {
				add_to_queue(id);
				fetchVideoInfo(id, function(err, videoInfo) {
					if (err) throw new Error(err);
					let play_info = new Discord.RichEmbed()
						.setAuthor("أضيف إلى قائمة الانتظار", message.author.avatarURL)
						.setDescription(`**${videoInfo.title}**`)
						.setColor("RANDOM")
						.setFooter('Requested By:' + message.author.tag)
						.setImage(videoInfo.thumbnailUrl)
					//.setDescription('?')
					message.channel.sendEmbed(play_info);
					queueNames.push(videoInfo.title);
					// let now_playing = videoInfo.title;
					now_playing.push(videoInfo.title);

				});
			});
		}
		else {

			isPlaying = true;
			getID(args, function(id) {
				queue.push('placeholder');
				playMusic(id, message);
				fetchVideoInfo(id, function(err, videoInfo) {
					if (err) throw new Error(err);
					let play_info = new Discord.RichEmbed()
						.setAuthor(`Added To Queue`, message.author.avatarURL)
						.setDescription(`**${videoInfo.title}**`)
						.setColor("RANDOM")
						.setFooter('بطلب من: ' + message.author.tag)
						.setThumbnail(videoInfo.thumbnailUrl)
					//.setDescription('?')
					message.channel.sendEmbed(play_info);
				});
			});
		}
	}
	else if (mess.startsWith(prefix + 'skip')) {
		if (!message.member.voiceChannel) return message.reply('**عفوا ,انت غير موجود في روم صوتي**');
		message.reply(':gear: **تم التخطي**').then(() => {
			skip_song(message);
			var server = server = servers[message.guild.id];
			if (message.guild.voiceConnection) message.guild.voiceConnection.end();
		});
	}
	else if (message.content.startsWith(prefix + 'volume')) {
		if (!message.member.voiceChannel) return message.reply('**عفوا ,انت غير موجود في روم صوتي**');
		// console.log(args)
		if (args > 100) return message.reply(':x: **100**');
		if (args < 1) return message.reply(":x: **1**");
		dispatcher.setVolume(1 * args / 50);
		message.channel.sendMessage(`Volume Updated To: **${dispatcher.volume*50}**`);
	}
	else if (mess.startsWith(prefix + 'pause')) {
		if (!message.member.voiceChannel) return message.reply('**عفوا ,انت غير موجود في روم صوتي**');
		message.reply(':gear: **تم الايقاف مؤقت**').then(() => {
			dispatcher.pause();
		});
	}
	else if (mess.startsWith(prefix + 'unpause')) {
		if (!message.member.voiceChannel) return message.reply('**عفوا ,انت غير موجود في روم صوتي**');
		message.reply(':gear: **تم اعاده التشغيل**').then(() => {
			dispatcher.resume();
		});
	}
	else if (mess.startsWith(prefix + 'stop')) {
		if (!message.member.voiceChannel) return message.reply('**عفوا ,انت غير موجود في روم صوتي**');
		message.reply(':name_badge: **تم الايقاف**');
		var server = server = servers[message.guild.id];
		if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
	}
	else if (mess.startsWith(prefix + 'join')) {
		if (!message.member.voiceChannel) return message.reply('**عفوا ,انت غير موجود في روم صوتي**');
		message.member.voiceChannel.join().then(message.react('✅'));
	}
	else if (mess.startsWith(prefix + 'play')) {
		getID(args, function(id) {
			add_to_queue(id);
			fetchVideoInfo(id, function(err, videoInfo) {
				if (err) throw new Error(err);
				if (!message.member.voiceChannel) return message.reply('**عفوا, انت غير موجود في روم صوتي**');
				if (isPlaying == false) return message.reply(':x:');
				let playing_now_info = new Discord.RichEmbed()
					.setAuthor(client.user.username, client.user.avatarURL)
					.setDescription(`**${videoInfo.title}**`)
					.setColor("RANDOM")
					.setFooter('Requested By:' + message.author.tag)
					.setImage(videoInfo.thumbnailUrl)
				message.channel.sendEmbed(playing_now_info);
				queueNames.push(videoInfo.title);
				// let now_playing = videoInfo.title;
				now_playing.push(videoInfo.title);

			});

		});
	}

	function skip_song(message) {
		if (!message.member.voiceChannel) return message.reply('**عفوا, انت غير موجود في روم صوتي**');
		dispatcher.end();
	}

	function playMusic(id, message) {
		voiceChannel = message.member.voiceChannel;


		voiceChannel.join().then(function(connectoin) {
			let stream = ytdl('https://www.youtube.com/watch?v=' + id, {
				filter: 'audioonly'
			});
			skipReq = 0;
			skippers = [];

			dispatcher = connectoin.playStream(stream);
			dispatcher.on('end', function() {
				skipReq = 0;
				skippers = [];
				queue.shift();
				queueNames.shift();
				if (queue.length === 0) {
					queue = [];
					queueNames = [];
					isPlaying = false;
				}
				else {
					setTimeout(function() {
						playMusic(queue[0], message);
					}, 500);
				}
			});
		});
	}

	function getID(str, cb) {
		if (isYoutube(str)) {
			cb(getYoutubeID(str));
		}
		else {
			search_video(str, function(id) {
				cb(id);
			});
		}
	}

	function add_to_queue(strID) {
		if (isYoutube(strID)) {
			queue.push(getYoutubeID(strID));
		}
		else {
			queue.push(strID);
		}
	}

	function search_video(query, cb) {
		request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_api_key, function(error, response, body) {
			var json = JSON.parse(body);
			cb(json.items[0].id.videoId);
		});
	}


	function isYoutube(str) {
		return str.toLowerCase().indexOf('youtube.com') > -1;
	}
});








































client.login(process.env.BOT_TOKEN);
