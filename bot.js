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

let sw = JSON.parse(fs.readFileSync("./setWlc.json", "UTF8"))

    client.on('message', message => {
const Canvas = require("canvas") // npm i canvas
const fs = require("fs") // npm i fs

        let mothed = ['text', 'embed', 'image'];
        let sets = message.content.split(" ").slice(1).join(" ")
        let style = message.content.split(" ").slice(2).join(" ")
        let stym = message.content.split(" ").slice(3).join(" ")
        let msz = message.content.split(" ").slice(2).join(" ")
        let ch = message.content.split(" ").slice(2).join(" ")
        let r = message.content.split(" ").slice(4).join(" ")


        if(message.content.startsWith(prefix + "setWlc")) {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("**You need `Manage Channels` permission**")
            if(!sw[message.guild.id]) sw[message.guild.id] = {
                cha: "welcome",
                msz: "Welcome Bro",
                styler: "text"
            };

            if(!sets) {
                message.channel.send(`**Usage:
            ${prefix}setWlc style <text, image, embed>
            ${prefix}setWlc msg <message>
            ${prefix}setWlc channal <channel name>**`)
            }

            if(!mothed) {
                message.channel.send(`**Usage: ${prefix}setWlc style <text, imgae, embed>**`)
            }

            if(message.content === prefix + 'setWlc style image') {
                if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("**You need `Manage Channels` permission**")
                sw[message.guild.id].styler = 'image'
                message.channel.send(`**Your server welcome mothed has been changed to ${sw[message.guild.id].styler}**`)
            }

            if(message.content === prefix + 'setWlc style embed') {
                if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("**You need `Manage Channels` permission**")
                 sw[message.guild.id].styler = 'embed'
                message.channel.send(`**Your server welcome mothed has been changed to ${sw[message.guild.id].styler}**`)            }

            if(message.content === prefix + 'setWlc style text') {
                if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("**You need `Manage Channels` permission**")
                 sw[message.guild.id].styler = 'text'
                message.channel.send(`**Your server welcome mothed has been changed to ${sw[message.guild.id].styler}**`)
            }

        }

        if(message.content.startsWith(prefix + "setWlc msg")) {
            if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**You need `Manage Messages` permission**")
            if(!msz) {
                message.channel.send("Usage: <setWlc msg <message>")
            } else {
                message.channel.send(`**Your server welcome message has been changed to __${msz}__**`)
                sw[message.guild.id].msk = msz
            }
        }

        if(message.content.startsWith(prefix + "setWlc channel")) {
            if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("**You need `Manage Channels` permission**")
            if(!ch) {
                message.channel.send("Usage: <setWlc channel <channel name>")
            }
            let chn = message.guild.channels.find("name", ch)
            if(!chn) {
                message.channel.send("**I can't find this channel**")
            }
            else {
                 sw[message.guild.id].cha = chn.name
                 message.channel.send(`**Your server welcome channel has been changed to __${chn.name}__**`)
                 }
        }

        fs.writeFile('./setWlc.json', JSON.stringify(sw), (err) => {
if (err) console.error(err);
})
})


client.on('guildMemberAdd', member => {
    let channel = member.guild.channels.find("name", sw[member.guild.id].cha)

    if(sw[member.guild.id].styler === "text") {
        channel.sendMessage(`<@${member.user.id}>, ${sw[member.guild.id].msk}`)
    }

    if(sw[member.guild.id].styler === "embed") {

        const embed = new Discord.RichEmbed()
        .setTitle("Member joind.")
        .setColor("GREEN")
        .setThumbnail(member.user.avatarURL)
        .setDescription(`**${sw[member.guild.id].msk}**`)
        .addField("**Member name**", `[<@${member.user.id}>]`,true)
        .addField("**Now we are**", `[${member.guild.memberCount}]`,true)
        channel.sendMessage(`<@${member.user.id}>`)
        channel.sendEmbed(embed)
    }

    if(sw[member.guild.id].styler === "image") {
        if (member.user.bot) return;
const w = ['./image.png'];
        let Image = Canvas.Image,
            canvas = new Canvas(749, 198),
            ctx = canvas.getContext('2d');
        ctx.patternQuality = 'bilinear';
        ctx.filter = 'bilinear';
        ctx.antialias = 'subpixel';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
        ctx.stroke();
        ctx.beginPath();

        fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
            if (err) return console.log(err);
            let BG = Canvas.Image;
            let ground = new Image;
            ground.src = Background;
            ctx.drawImage(ground, 0, 0, 749, 198);

})

                let url = member.user.displayAvatarURL.endsWith(".webp") ? member.user.displayAvatarURL.slice(5, -20) + ".png" : member.user.displayAvatarURL;
                jimp.read(url, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                 if (err) return console.log(err);

ctx.font = '35px Aeland';
                        ctx.fontSize = '40px';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(" Welcome to " + member.guild.name , 440, 25);

                        //ur name
                        ctx.font = '40px Impact';
                        ctx.fontSize = '48px';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(member.user.username, 420, 100);

                         ctx.font = '30px Impact';
                        ctx.fontSize = '20px';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(sw[member.guild.id].msk, 410, 170);


                        //Avatar
                        let Avatar = Canvas.Image;
                              let ava = new Avatar;
                              ava.src = buf;
                              ctx.beginPath();
                              ctx.arc(115, 100, 90, 0, Math.PI*2);
                                 ctx.closePath();
                                 ctx.clip();
                                 ctx.drawImage(ava, 5, 5, 200, 200);
                                 channel.sendMessage(`<@${member.user.id}>`)
        channel.sendFile(canvas.toBuffer())



})
})

    }

})


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
const prefix = 'برفكس البوت اهنا';
const discord_token = "توكن البوت اهنا ";
client.login(discord_token);
client.on('ready', function() {
	console.log(`i am ready ${client.user.username}`);
    client.user.setGame(prefix + 'مساعدة || FDFDAH');
});
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
\\\\\\\\\\\\\\\\\\\\\\\\V/////////////////////////
\\\\\\\\\\\\\\\\\\\\\\\\V/////////////////////////
\\\\\\\\\\\\\\\\\\\\\\\\V/////////////////////////
\\\\\\\\\\\\\\\\\\\\\\\\V/////////////////////////
*/
client.on('ready', () => {});
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

	if (mess.startsWith(prefix + 'شغل')) {
		if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
		// if user is not insert the URL or song title
		if (args.length == 0) {
			let play_info = new Discord.RichEmbed()
				.setAuthor(client.user.username, client.user.avatarURL)
				.setFooter('طلب بواسطة: ' + message.author.tag)
				.setDescription('**قم بإدراج رابط او اسم الأغنيه**')
			message.channel.sendEmbed(play_info)
			return;
		}
		if (queue.length > 0 || isPlaying) {
			getID(args, function(id) {
				add_to_queue(id);
				fetchVideoInfo(id, function(err, videoInfo) {
					if (err) throw new Error(err);
					let play_info = new Discord.RichEmbed()
						.setAuthor(client.user.username, client.user.avatarURL)
						.addField('تمت إضافةالاغنيه بقائمة الإنتظار', `**
						  ${videoInfo.title}
						  **`)
						.setColor("RANDOM")
						.setFooter('|| ' + message.author.tag)
						.setThumbnail(videoInfo.thumbnailUrl)
					message.channel.sendEmbed(play_info);
					queueNames.push(videoInfo.title);
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
						.setAuthor(client.user.username, client.user.avatarURL)
						.addField('||**__تم تشغيل __**', `**${videoInfo.title}
							  **`)
						.setColor("RANDOM")
                        .addField(`__من قبل__: ${message.author.username}`, `**__FDFDAH__**`)
						.setThumbnail(videoInfo.thumbnailUrl)
							
					// .setDescription('?')
					message.channel.sendEmbed(play_info)
					message.channel.send(`__تم التشغيل__
							**${videoInfo.title}** __اسم الأغنية__
		      ${message.author.username}         __بواسطة__ `)
					// client.user.setGame(videoInfo.title,'https://www.twitch.tv/Abdulmohsen');
				});
			});
		}
	}
	else if (mess.startsWith(prefix + 'تخطي')) {
		if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
		message.channel.send(':ok:').then(() => {
			skip_song(message);
			var server = server = servers[message.guild.id];
			if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
		});
	}
	else if (message.content.startsWith(prefix + 'صوت')) {
		if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
		// console.log(args)
		if (args > 100) return message.channel.send('1 - 100 || **__لا أكثر ولا أقل__**')
		if (args < 1) return message.channel.send('1 - 100 || **__لا أكثر ولا أقل__**')
		dispatcher.setVolume(1 * args / 50);
		message.channel.sendMessage(`**__ ${dispatcher.volume*50}% مستوى الصوت __**`);
	}
	else if (mess.startsWith(prefix + 'وقف')) {
		if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
		message.channel.send(':ok:').then(() => {
			dispatcher.pause();
		});
	}
	else if (mess.startsWith(prefix + 'كمل')) {
		if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
			message.channel.send(':ok:').then(() => {
			dispatcher.resume();
		});
	}
	else if (mess.startsWith(prefix + 'اطلع')) {
		if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
		message.channel.send(':ok:');
		var server = server = servers[message.guild.id];
		if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
	}
	else if (mess.startsWith(prefix + 'join')) {
		if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
		message.member.voiceChannel.join().then(message.channel.send(':ok:'));
	}
	else if (mess.startsWith(prefix + 'play')) {
		if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
		if (isPlaying == false) return message.channel.send(':anger: || **__تم التوقيف__**');
		let playing_now_info = new Discord.RichEmbed()
			.setAuthor(client.user.username, client.user.avatarURL)
			.addField('تمت إضافةالاغنيه بقائمة الإنتظار', `**
				  ${videoInfo.title}
				  **`)
			.setColor("RANDOM")
			.setFooter('طلب بواسطة: ' + message.author.tag)
			.setThumbnail(videoInfo.thumbnailUrl)
		//.setDescription('?')
		message.channel.sendEmbed(playing_now_info);
	}
});

function skip_song(message) {
	if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
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
 







































client.login(process.env.BOT_TOKEN);
