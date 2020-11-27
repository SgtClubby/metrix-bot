client.on('message', async message => {
    const rules = () => {
const rules = `
====================================================================
**THESE ARE THE RULES AND THEY ARE ACTIVILY ENFORCED, SO PLEASE READ THE RULES!**
====================================================================

- 7. Do not ping staff for no reason
- guys follow the rules
- please don’t harass any users on this server
- Rule 7. No N-word
- Rule: Respect everyone in the Server
- no spamming 
- pls dont post nsfw thx
- please keep memes out of out of #general 
- please dont @ everyone 
- Please follow the rules.
- don’t be annoying
- no doubles please please follow the rules of our server
- Please follow the rules of this server
- no nsfw
- 9.do not use homophobic/racial/sexist
- 13. Do not disagree with admins or they will ban you
- 6. Try to keep conversations on channel topic
- Rule #1: No boys.
- 12.do not upload nsfw
- 1. No nsfw in genral
- Do NOT Spam Text To Speech In Chat
- 3. please keep your sexuality to yourself (this is not sweden)
- rule 2
- five seconds rule
- * Just follow the rules or you will have a bad time.
- 4. Please don't spam
- rule 10: no textwalls
- 12. Do not wish illness or death on anyone
- result of not using the double tap method
- 3 no porn
- rule 6: don't ping @ everyone
- 10. Have fun and remember to be yourself
- 3. Refrain from using racist terms
- Grant please stop posting porn in #general
- 7. Keep bot commands and gay porn out of general
- you must be over 12 to be in this server
- no memes in #general`
const rules2 = `
- Rule 1: No making fun of fat people
- 2. NO RACISM, CONTROVERSIAL CONTENT OR ANY CONNOTATIONS OF THE SORT, ZERO TOLERANCE BAN POLICY
- please don't spam emotes
- 6. keep frog images and fish images in their respective channels
- please follow the rules of this server
- server is not for Roleplay
- plz keep ur bot commands in #bot-commands
- 10. Please don't excessively swear.
- No Playing Country Music
- No Abusing Power
- 9. Dont be gay in #general chat
- please respect other peoples relationships (including anir and I's)
- please refrain from sending nsfw content
- 11. no death threats
- Rule #1:
- 2. No racism, homophobia or transphobia
- RULE 1 NO FATE/GRAND ORDER
- Please dont Listen to Kagami
- 1. No advertising of any kind
- GUYS IM GOING TO ASK ONLY ONCE PLEASE KEEP MEMES OUT OF GENERAL
- no memes in #general
- please keep Anime out of #the ducks
- 1. no faltar el respeto
- Rule #6: No self-promo
- Please stop posting memes in #general
- 8. no racial slurs (we're not EU)
- 3. Keep personal drama out of this server
- Please be nice to server staff
- 10. Have fun and enjoy your time in this server.
- 4. no plashees confianza
- Please use the bot in #bot-commands
- ai já é outro nível
- SORRY SIR THIS IS A MUSIM SERVER SO No swearing
`
        message.channel.send(rules)
        message.channel.send(rules2)
    }
    
    exports.rules = rules
    })
