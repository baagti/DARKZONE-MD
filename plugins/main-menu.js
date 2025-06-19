const config = require('../config');
const { cmd } = require('../command');
const path = require('path');
const fs = require('fs');
const { runtime } = require('../lib/functions');

cmd({
    pattern: "menu2",
    alias: ["allmenu", "fullmenu"],
    use: '.menu2',
    desc: "Show all bot commands",
    category: "menu",
    react: "📜",
    filename: __filename
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        const styles = [
            { top: "╭━〔 ", mid: "┃ ", end: "╰━┈⊷" },
            { top: "⫷ ", mid: "➤ ", end: "⫸" },
            { top: "┌─⭓ ", mid: "│⭔ ", end: "└─────" },
            { top: "📍 ", mid: "➤ ", end: "✔️" },
            { top: "❖ ", mid: "➲ ", end: "❖" },
            { top: "⎔ ", mid: "☛ ", end: "⎔" },
            { top: "✦ ", mid: "➛ ", end: "✦" },
            { top: "⪼ ", mid: "➽ ", end: "⪻" },
        ];

        const style = styles[Math.floor(Math.random() * styles.length)];

        let menuText = `
${style.top}${config.BOT_NAME} MENU ${style.end}

${style.top}BOT INFO${style.end}
${style.mid}👑 Owner: ${config.OWNER_NAME}
${style.mid}⚙️ Prefix: [${config.PREFIX}]
${style.mid}📦 Version: 4.0.0
${style.mid}⏱️ Uptime: ${runtime(process.uptime())}

${style.top}DOWNLOAD COMMANDS${style.end}
${style.mid}facebook, mediafire, tiktok, twitter, insta, apk, img, tt2, ...
${style.mid}pins, apk2, fb2, pinterest, spotify, play, play2, audio, ...

${style.top}GROUP COMMANDS${style.end}
${style.mid}grouplink, kickall, kickall2, add, remove, promote, demote, ...
${style.mid}setwelcome, setgoodbye, dismiss, delete, mute, unmute, lockgc, ...

${style.top}REACTIONS${style.end}
${style.mid}bully, cuddle, cry, hug, kiss, pat, smile, blush, bonk, yeet, ...

${style.top}LOGO MAKER${style.end}
${style.mid}neonlight, blackpink, dragonball, 3dcomic, naruto, sadgirl, ...

${style.top}OWNER COMMANDS${style.end}
${style.mid}owner, menu, vv, listcmd, block, unblock, restart, shutdown, ...

${style.top}FUN COMMANDS${style.end}
${style.mid}shapar, rate, insult, ship, joke, kiss, hug, poke, nikal, ...

${style.top}CONVERTERS${style.end}
${style.mid}sticker, emojimix, tomp3, base64, tts, url, trt, readmore, ...

${style.top}AI MENU${style.end}
${style.mid}ai, gpt, gpt2, gptmini, meta, dj, gpt4, blackbox, luma, ...

${style.top}MAIN COMMANDS${style.end}
${style.mid}ping, speed, alive, repo, runtime, restart, owner, ...

${style.top}ANIME ZONE${style.end}
${style.mid}truth, dare, neko, maid, waifu, animegirl1-5, anime1-5, ...

${style.top}OTHER${style.end}
${style.mid}timenow, date, calculate, flip, roll, fact, githubstalk, ...
        `.trim();

        await conn.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/r2ncqh' },
                caption: menuText,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363416743041101@newsletter',
                        newsletterName: config.BOT_NAME,
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // send local audio
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
