const config = require('../config')
const { cmd, commands } = require('../command');
const path = require('path'); 
const os = require("os")
const fs = require('fs');
const {runtime} = require('../lib/functions')
const axios = require('axios')

cmd({
    pattern: "menu2",
    alias: ["allmenu","fullmenu"],
    use: '.menu2',
    desc: "Show all bot commands",
    category: "menu",
    react: "📜",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
    let menuStyles = [

`╭─〔 👑 *${config.BOT_NAME}* 〕─╮
┃ Owner : *${config.OWNER_NAME}*
┃ Prefix : *[${config.PREFIX}]*
┃ Platform : *Heroku*
┃ Version : *4.0.0*
┃ Runtime : *${runtime(process.uptime())}*
╰────────────────────╯

📥 *DOWNLOAD*
• facebook • mediafire • tiktok • twitter • insta
• apk • img • tt2 • pins • fb2 • gdrive
• spotify • play • video • ytmp3 • ytmp4

👥 *GROUP*
• grouplink • add • remove • promote • demote
• tagall • hidetag • kickall • setwelcome • setgoodbye

⚙️ *MAIN*
• ping • alive • runtime • owner • repo • restart
• menu • menu2

🎭 *REACTIONS*
• hug @tag • kill @tag • blush @tag • kiss @tag • pat @tag

🎨 *LOGO MAKER*
• neonlight • blackpink • dragonball • sadgirl • hacker • galaxy

🤖 *AI MENU*
• ai • gpt3 • gpt4 • meta • imagine • dj • luma

🎎 *ANIME*
• waifu • neko • anime1 • anime2 • naruto • foxgirl

🎉 *FUN*
• shapar • joke • kiss • hrt • hack • cunfuzed

ℹ️ *OTHER*
• time • date • calculate • wikipedia • define

🔄 *CONVERT*
• sticker • tomp3 • base64 • url • tts • emojimix
`,

`🔰 *${config.BOT_NAME} Menu* 🔰
👑 Owner: ${config.OWNER_NAME}
⚙️ Prefix: ${config.PREFIX}
📦 Version: 4.0.0 | ⏱️ Runtime: ${runtime(process.uptime())}

🌐 *DOWNLOAD* » facebook, insta, spotify, mediafire, gdrive
👥 *GROUP* » add, remove, promote, tagall, kickall, setwelcome
🎭 *REACTIONS* » hug, pat, kiss, kill, smile
🎨 *LOGO MAKER* » neonlight, sadgirl, dragonball, galaxy
🤖 *AI* » gpt, gpt4, meta, imagine, dj
🎉 *FUN* » shapar, joke, pickup, hug, kiss
🎎 *ANIME* » waifu, neko, naruto, anime1-5
ℹ️ *INFO* » time, date, weather, define
🔁 *CONVERT* » sticker, tomp3, base64, tts
`,

`╔══ ❖ *${config.BOT_NAME} MENU* ❖ ══╗
║👑 OWNER: ${config.OWNER_NAME}
║🔧 PREFIX: ${config.PREFIX}
║🌐 PLATFORM: Heroku
║⚡ VERSION: 4.0.0
║⏳ UPTIME: ${runtime(process.uptime())}
╚═══════════════════════╝

📁 *DOWNLOAD* | fb, insta, spotify, tt, yt, gdrive
👥 *GROUP* | add, remove, promote, tagall, welcome
🎭 *REACTIONS* | hug, pat, bonk, blush, poke
🎨 *LOGO* | hacker, galaxy, sadgirl, neonlight
🤖 *AI* | gpt, imagine, blackbox, meta
🎎 *ANIME* | waifu, neko, anime1-5
🎉 *FUN* | joke, ship, mon, pickup, hug
ℹ️ *UTILS* | time, define, weather, wiki
🔄 *CONVERT* | sticker, tomp3, base64
`,

`🛠️ *${config.BOT_NAME} - Multi Utility Bot* 🛠️
🧑‍💼 *Owner:* ${config.OWNER_NAME}
⚙️ *Prefix:* ${config.PREFIX} | 🕒 *Runtime:* ${runtime(process.uptime())}

📦 *Main:* menu, ping, alive, restart, owner, repo
🎭 *Reactions:* hug, kill, bonk, kiss, pat, smile
📥 *Download:* fb, tiktok, mediafire, spotify, ytmp3
👥 *Group:* add, remove, tagall, promote, demote, welcome
🤖 *AI:* gpt, gpt4, imagine, dj, meta
🎨 *Logos:* hacker, neonlight, sadgirl, devilwings
🎉 *Fun:* joke, kiss, shy, mon, hrt
🎎 *Anime:* waifu, neko, foxgirl, naruto
🧠 *Other:* date, time, calculate, define
`,

// You can add more menu templates here
];

// Pick one at random
let randomMenu = menuStyles[Math.floor(Math.random() * menuStyles.length)];

await conn.sendMessage(
  from,
  {
    image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/7zfdcq.jpg' },
    caption: randomMenu,
    contextInfo: {
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363354023106228@newsletter',
        newsletterName: config.BOT_NAME,
        serverMessageId: 143
      }
    }
  },
  { quoted: mek }
);

// share local audio 

const audioPath = path.join(__dirname, '../assets/menu.m4a');
await conn.sendMessage(from, {
    audio: fs.readFileSync(audioPath),
    mimetype: 'audio/mp4',
    ptt: true,
}, { quoted: mek });
        
    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e}`);
    }
});
