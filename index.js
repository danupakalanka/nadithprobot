
const {
	default: makeWASocket,
	useSingleFileAuthState,
	DisconnectReason,
	getContentType,
	jidDecode
} = require('@adiwajshing/baileys')
const fs = require('fs')
const P = require('pino')
const qrcode = require('qrcode-terminal')
const util = require('util')
const { state, saveState } = useSingleFileAuthState('./session.json')
const config = require('./config')
const prefix = '/'
const owner = ['94761327688']
const yts = require('yt-search')
const axios = require('axios')
const apk_link = require('./lib/playstore')
const connectToWA = () => {
	const conn = makeWASocket({
		logger: P({ level: 'silent' }),
		...otherOpts,
    		// can use Windows, Ubuntu here too
  		browser: Browsers.macOS('Desktop'),
   		syncFullHistory: true
		printQRInTerminal: true,
		auth: state,
	})

	conn.ev.on('connection.update', (update) => {
		const { connection, lastDisconnect } = update
		if (connection === 'close') {
			if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
				connectToWA()
			}
		} else if (connection === 'open') {
			console.log('Bot Connected')
		}
	})

	conn.ev.on('creds.update', saveState)

	conn.ev.on('messages.upsert', async (mek) => {
		try {
			mek = mek.messages[0]
			if (!mek.message) return

			mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
			if (mek.key && mek.key.remoteJid === 'status@broadcast') return
			const type = getContentType(mek.message)
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid

			const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
			const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'listResponseMessage') && mek.message.listResponseMessage.singleSelectReply.selectedRowId ? mek.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && mek.message.buttonsResponseMessage.selectedButtonId ? mek.message.buttonsResponseMessage.selectedButtonId : (type == "templateButtonReplyMessage") && mek.message.templateButtonReplyMessage.selectedId ? mek.message.templateButtonReplyMessage.selectedId : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''


			const isCmd = body.startsWith(prefix)
			const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''

			const args = body.trim().split(/ +/).slice(1)
			const q = args.join(' ')
			const isGroup = from.endsWith('@g.us')
			const sender = mek.key.fromMe ? (conn.user.id.split(':')[0] + '@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
			const senderNumber = sender.split('@')[0]
			const botNumber = conn.user.id.split(':')[0]
			const pushname = mek.pushName || 'Sin Nombre'

			const isMe = botNumber.includes(senderNumber)
			const isowner = owner.includes(senderNumber) || isMe

			const reply = (teks) => {
				conn.sendMessage(from, { text: teks }, { quoted: mek })
			}

			const isSUB = from == "120363043693753103@g.us" ? true : false 


			switch (command) {

				//........................................................Alive................................................................\\

				case 'alive': {

					if(!isSUB) return

					const templateButtons = [
						{ urlButton: { displayText: 'Instagram', url: 'https://www.instagram.com/nadithpro' } },
						{ urlButton: { displayText: 'Youtube', url: 'https://www.youtube.com/nadithtech' } },
						{ quickReplyButton: { displayText: 'MENU', id: prefix + 'menu' } }
					]
					const buttonMessage = {
						caption: config.ALIVE_MSG,
						footer: config.FOOTER,
						templateButtons: templateButtons,
						image: { url: config.PRO_LOGO }
					}
					await conn.sendMessage(from, buttonMessage)
				}
					break

					case 'harry5': {
       
						await conn.sendMessage(from, { document: { url: 'https://admin.nadith.pro/www.1TamilMV.vin%20-%20PAAGAL%20(2021)%20Telugu%20_%20-%20720p%20-%20HEVC%20-%20(DD5.1%20-%20192Kbps%20%20AAC%202.0)%20-%20950MB%20-%20ESub.mkv' }, mimetype: 'video/x-matroska', fileName: 'Harry.Potter.and.the.Order.of.the.Phoenix.2007.1080p.BrRip.[Firemovieshub.ML].mkv' }, { quoted: mek })
								
						}
					break


				case 'menu': {

					if(!isSUB) return

					const startmsg = `🍁NadithPro Bot Menu

*COMMANDS*

/song - Get Yt Songs
/video - Get Yt Videos

Ex:-
   
/video tera ghata

or

/video https://youtube.com/watch?v=0KNk-Joi-NM
`

					const buttonMessage = {
						caption: startmsg,
						footer: config.FOOTER,
						image: { url: config.PRO_LOGO }
					}
					await conn.sendMessage(from, buttonMessage)
				}
					break


				//........................................................Youtube................................................................\\


				case 'song': {

					if(!isSUB) return

					conn.sendMessage(from, { react: { text: '🎧', key: mek.key } })
					if (!q) return reply('Example : ' + prefix + command + ' Tera Ghata')
					let yts = require("yt-search")
					let search = await yts(q)
					let anu = search.videos[0]
					let buttons = [
						{ buttonId: prefix + 'ytdoc ' + anu.url, buttonText: { displayText: 'DOCUMENT' }, type: 1 },
						{ buttonId: prefix + 'ytmp3 ' + anu.url, buttonText: { displayText: 'AUDIO' }, type: 1 }
					]
					let buttonMessage = {
						image: { url: anu.thumbnail },
						caption: '┌───[🍁 NadithPro 🍁]\n\n  *📥 Song Downloader*\n\n│🎧sᴏɴɢ: ' + anu.title + '\n\n│ 👀ᴠɪᴇᴡs: ' + anu.views + '\n\n│ 📹 ᴄʜᴀɴɴᴇʟ: ' + anu.author + '\n\n│🖇️ᴜʀʟ: ' + anu.url + '\n\n└───────────◉',
						footer: config.FOOTER,
						buttons: buttons,
						headerType: 4,
					}
					conn.sendMessage(from, buttonMessage, { quoted: mek })
				}
					break


				case 'ytdoc': {

					if(!isSUB) return

					await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } })
					if (!q.includes('youtu')) return await conn.sendMessage(from, { text: '*Need YouTube link*' }, { quoted: mek })
					let { yta } = require('./lib/y2mate')
					let quality = args[1] ? args[1] : '256kbps'
					let media = await yta(q, quality)
					if (media.filesize >= 100000) {
						const msg = '*SONG SIZE UP TO 100MB ⛔*'
						const templateButtons = [
							{ urlButton: { displayText: 'ᴅᴏᴡɴʟᴏᴀᴅ ʟɪɴᴋ 🎯', url: media.dl_link + '.mp4' } },
						]

						const templateMessage = {
							text: msg,
							footer: config.FOOTER,
							templateButtons: templateButtons
						}

						await conn.sendMessage(from, templateMessage, { quoted: mek })
					}
					const docdown = await conn.sendMessage(from, { text: pushname + ' ' + config.SONG_DOWN }, { quoted: mek })
					await conn.sendMessage(from, { delete: docdown.key })
					const docup = await conn.sendMessage(from, { text: pushname + ' ' + config.SONG_UP }, { quoted: mek })
					const doc = await conn.sendMessage(from, { document: { url: media.dl_link }, mimetype: 'audio/mpeg', fileName: media.title + '.mp3' }, { quoted: mek })
					await conn.sendMessage(from, { delete: docup.key })

				}
					break

				case 'ytdocmp4': {

					if(!isSUB) return

					await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } })
					if (!q.includes('youtu')) return await conn.sendMessage(from, { text: '*Need yt link*' }, { quoted: mek })
					let { ytv } = require('./lib/y2mate')
					let quality = args[1] ? args[1] : '480p'
					let media = await ytv(q, quality)
					if (media.filesize >= 100000) {
						const msg = '*VIDEO SIZE UP TO 100MB ⛔*'
						const templateButtons = [
							{ urlButton: { displayText: 'ᴅᴏᴡɴʟᴏᴀᴅ ʟɪɴᴋ 🎯', url: media.dl_link + '.mp4' } },
						]

						const templateMessage = {
							text: msg,
							footer: config.FOOTER,
							templateButtons: templateButtons
						}

						await conn.sendMessage(from, templateMessage, { quoted: mek })
					}
					const docdown = await conn.sendMessage(from, { text: pushname + ' ' + config.VIDEO_DOWN }, { quoted: mek })
					await conn.sendMessage(from, { delete: docdown.key })
					const docup = await conn.sendMessage(from, { text: pushname + ' ' + config.VIDEO_UP }, { quoted: mek })
					const doc = await conn.sendMessage(from, { document: { url: media.dl_link }, mimetype: 'video/mp4', fileName: media.title + '.mp4' }, { quoted: mek })
					await conn.sendMessage(from, { delete: docup.key })

				}
					break

				case 'video': {

					if(!isSUB) return

					conn.sendMessage(from, { react: { text: '🔍', key: mek.key } })
					if (!q) return reply('Example : ' + prefix + command + ' Tera Ghata')
					let yts = require("yt-search")
					let search = await yts(q)
					let anu = search.videos[0]

					const listMessage = {
						text: '┌───[🍁 NadithPro 🍁]\n\n  *📥 YouTube Downloader*\n\n│📽️ᴠɪᴅᴇᴏ: ' + anu.title + '\n\n│ 👀ᴠɪᴇᴡs: ' + anu.views + '\n\n│ 📹 ᴄʜᴀɴɴᴇʟ: ' + anu.author + '\n\n│🖇️ᴜʀʟ: ' + anu.url + '\n\n└───────────◉',
						footer: config.FOOTER,
						title: 'Hello ' + pushname,
						buttonText: "Results",
						sections: [{
							"title": "Mp4 Video",
							"rows": [

								{
									"title": "720p",
									"description": "",
									"rowId": prefix + 'ytmp4 ' + anu.url + ' 720p'
								},
								{
									"title": "480p",
									"description": "",
									"rowId": prefix + 'ytmp4 ' + anu.url + ' 480p'
								},
								{
									"title": "360p",
									"description": "",
									"rowId": prefix + 'ytmp4 ' + anu.url + ' 360p'
								}
							]
						},
						{
							"title": "Mp4 Document",
							"rows": [
								{
									"title": "1080p",
									"description": "",
									"rowId": prefix + 'ytdocmp4 ' + anu.url + ' 1080p'
								},
								{
									"title": "720p",
									"description": "",
									"rowId": prefix + 'ytdocmp4 ' + anu.url + ' 720p'
								},
								{
									"title": "480p",
									"description": "",
									"rowId": prefix + 'ytdocmp4 ' + anu.url + ' 480p'
								}

							]
						},
						{
							"title": "Mp3 Audio",
							"rows": [
								{
									"title": "High",
									"description": "",
									"rowId": prefix + 'ytmp3 ' + anu.url + ' 320kbps'
								},
								{
									"title": "Medium",
									"description": "",
									"rowId": prefix + 'ytmp3 ' + anu.url + ' 256kbps'
								},
								{
									"title": "Low",
									"description": "",
									"rowId": prefix + 'ytmp3 ' + anu.url + ' 128kbps'
								}

							]
						},
						{
							"title": "Mp3 Document",
							"rows": [
								{
									"title": "High",
									"description": "",
									"rowId": prefix + 'ytdoc ' + anu.url + ' 320kbps'
								},
								{
									"title": "Medium",
									"description": "",
									"rowId": prefix + 'ytdoc ' + anu.url + ' 256kbps'
								},
								{
									"title": "Low",
									"description": "",
									"rowId": prefix + 'ytdoc ' + anu.url + ' 128kbps'
								}
							]
						}

						]
					}
					await conn.sendMessage(from, listMessage, { quoted: mek })
				}
					break

				case 'ytmp3': {

					if(!isSUB) return

					await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } })
					if (!q.includes('youtu')) return await conn.sendMessage(from, { text: '*Need yt link*' }, { quoted: mek })
					let { yta } = require('./lib/y2mate')
					let quality = args[1] ? args[1] : '256kbps'
					let media = await yta(q, quality)
					if (media.filesize >= 100000) {
						const msg = '*SONG SIZE UP TO 100MB ⛔*'
						const templateButtons = [
							{ urlButton: { displayText: 'ᴅᴏᴡɴʟᴏᴀᴅ ʟɪɴᴋ 🎯', url: media.dl_link + '.mp4' } },
						]

						const templateMessage = {
							text: msg,
							footer: config.FOOTER,
							templateButtons: templateButtons
						}

						await conn.sendMessage(from, templateMessage, { quoted: mek })
					}
					const auddown = await conn.sendMessage(from, { text: pushname + ' ' + config.SONG_DOWN }, { quoted: mek })
					await conn.sendMessage(from, { delete: auddown.key })
					const audup = await conn.sendMessage(from, { text: pushname + ' ' + config.SONG_UP }, { quoted: mek })
					const au = await conn.sendMessage(from, { audio: { url: media.dl_link }, mimetype: 'audio/mpeg', fileName: media.title + '.mp3' }, { quoted: mek })
					await conn.sendMessage(from, { delete: audup.key })

				}
					break

				case 'ytmp4': {

					if(!isSUB) return

					await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } })
					if (!q.includes('youtu')) return await conn.sendMessage(from, { text: '*Need yt link*' }, { quoted: mek })
					let { ytv } = require('./lib/y2mate')
					let quality = args[1] ? args[1] : '480p'
					let media = await ytv(q, quality)
					if (media.filesize >= 100000) {
						const msg = '*VIDEO SIZE UP TO 100MB ⛔*'
						const templateButtons = [
							{ urlButton: { displayText: 'ᴅᴏᴡɴʟᴏᴀᴅ ʟɪɴᴋ 🎯', url: media.dl_link + '.mp4' } },
						]

						const templateMessage = {
							text: msg,
							footer: config.FOOTER,
							templateButtons: templateButtons
						}

						await conn.sendMessage(from, templateMessage, { quoted: mek })
					}
					const viddown = await conn.sendMessage(from, { text: pushname + ' ' + config.VIDEO_DOWN }, { quoted: mek })
					await conn.sendMessage(from, { delete: viddown.key })
					const vidup = await conn.sendMessage(from, { text: pushname + ' ' + config.VIDEO_UP }, { quoted: mek })
					const vid = await conn.sendMessage(from, { video: { url: media.dl_link }, mimetype: 'video/mp4', fileName: media.title + '.mp4', caption: config.CAPTION }, { quoted: mek })
					await conn.sendMessage(from, { delete: vidup.key })

				}
					break

				//........................................................Playstore................................................................\\

				case 'apk': case 'findapk': {

					if (!q) return await conn.sendMessage(from, { text: 'Need Query' }, { quoted: mek })
					const data2 = await axios.get('https://bobiz-api.herokuapp.com/api/playstore?q=' + q)
					const data = data2.data
					if (data.length < 1) return await conn.sendMessage(from, { text: 'Not Found' }, { quoted: mek })
					var srh = [];
					for (var i = 0; i < data.length; i++) {
						srh.push({
							title: data[i].title,
							description: '',
							rowId: prefix + 'dapk ' + data[i].link
						});
					}
					const sections = [{
						title: "Playstore Results",
						rows: srh
					}]
					const listMessage = {
						text: " \n\n name : " + q + '\n\n ',
						footer: config.FOOTER,
						title: '┌───[🍁 NadithPro 🍁]\n\n  *📥 APK DOWNLODER*\n\n',
						buttonText: "Results",
						sections
					}
					await conn.sendMessage(from, listMessage, { quoted: mek })
				}
					break

				case 'dapk': {
					if (!q) return await conn.sendMessage(from, { text: 'need app link' }, { quoted: mek })
					const n = q.replace('/store/apps/details?id=', '')
					const data = await axios.get('https://bobiz-api.herokuapp.com/api/apk?url=https://play.google.com/store/apps/details?id=' + n)
					const name = data.data.name
					const fileup = await conn.sendMessage(from, { text: pushname + config.FILE_DOWN }, { quoted: mek })
					await conn.sendMessage(from, { delete: fileup.key })
					const filedown = await conn.sendMessage(from, { text: pushname + config.FILE_UP }, { quoted: mek })

					const app_link = await apk_link(n)
					if (app_link.size.replace('MB', '') > 180) return await conn.sendMessage(from, { text: 'Max size reached' }, { quoted: mek })
					if (app_link.size.includes('GB')) return await conn.sendMessage(from, { text: 'Max size reached' }, { quoted: mek })
					var ext = ''
					if (app_link.type.includes('Download XAPK')) { ext = '.xapk' }
					else { ext = '.apk' }
					await conn.sendMessage(from, { document: { url: app_link.dl_link }, mimetype: 'application/vnd.android.package-archive', fileName: name + ext }, { quoted: mek })
					await conn.sendMessage(from, { delete: filedown.key })
				}
					break


				default:

					if (isowner && body.startsWith('>')) {
						try {
							await reply(util.format(await eval(`(async () => {${body.slice(1)}})()`)))
						} catch (e) {
							await reply(util.format(e))
						}
					}

			}

		} catch (e) {
			const isError = String(e)

			console.log(isError)
		}
	})
}

connectToWA()
