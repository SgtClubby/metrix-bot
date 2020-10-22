request = require("request")
Discord = require("discord.js")
const url = "https://opentdb.com/api.php?amount=4"
client.on('message', async message => {

    const rng = Math.floor(Math.random() * 4);  

    const easy_rng_xp = Math.floor(Math.random() * (60 - 30) + 30)
    const medium_rng_xp = Math.floor(Math.random() * (110 - 65) + 65)
    const hard_rng_xp = Math.floor(Math.random() * (200 - 110) + 110)

    const trivia = async () => {
        request(url, async function (err, response, body) {

            body = JSON.parse(body)

            let trivia = body.results[rng]

            const category = trivia.category
            let question = trivia.question
            const difficulty = trivia.difficulty

            let answers = []
            let emojies = []

            switch (trivia.type) {
                case "boolean":
                    answers = [ trivia.correct_answer, 
                                trivia.incorrect_answers[0], 
                                ];
                                emojies = [
                                    `1️⃣`,
                                    `2️⃣`,
                                ]
                    break
                case "multiple":
                    answers = [ trivia.correct_answer, 
                                trivia.incorrect_answers[0], 
                                trivia.incorrect_answers[1], 
                                trivia.incorrect_answers[2]
                                ];
                                emojies = [
                                    `1️⃣`,
                                    `2️⃣`,
                                    `3️⃣`,
                                    `4️⃣`
                                ]
                    break
            }

            switch (difficulty) {
                case "easy":
                    dif = easy_rng_xp
                    break
                case "medium":
                    dif = medium_rng_xp
                    break
                case "hard":
                    dif = hard_rng_xp
                    break
            }
        
            function shuffle(array) {
                var currentIndex = array.length, temporaryValue, randomIndex;

                while (0 !== currentIndex) {
              
                  randomIndex = Math.floor(Math.random() * currentIndex);
                  currentIndex -= 1;

                  temporaryValue = array[currentIndex];
                  array[currentIndex] = array[randomIndex];
                  array[randomIndex] = temporaryValue;
                }
                return array;
              }
              shuffle(answers);
              let toOutput = ""
              let i = 0;
              answers.forEach(answersToOutput => {
                    toOutput += `**${i + 1} )**  ${answersToOutput}\n\n`
                    i = i + 1
              })

              question = question.replace(/&quot;/g,'"')
              question = question.replace(/&#039;/g,`'`)
              
            const statusembed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Trivia')
            .setURL("https://opentdb.com/")
            .addFields(
              { name: 'Category:', value: category, inline: true },
              { name: 'Rewards:', value: `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} EXP: ${dif}`, inline: true },
              { name: 'Question:', 
              value: `${question} \n\n
              ${toOutput}
              You have 15 seconds to answer the question...`, 
              inline: false }
            )
            .setTimestamp()
            .setFooter(message.author.tag, message.author.avatarURL());
            triviaEmbed = await message.channel.send(statusembed);
            emojies.forEach(emoji => {
                triviaEmbed.react(emoji)
            });

            console.log(answers,
                        trivia.correct_answer)

            let correctansweri = 0
            let lmao = 0 
            answers.forEach(correctanswer => {
                console.log(correctansweri)
                if (correctanswer === trivia.correct_answer) {
                    console.log("found it",
                                correctanswer)
                        lmao = correctansweri
                    return correctansweri
                } else {
                    correctansweri = correctansweri + 1
                }
            })
        
            console.log(lmao)
            const filter = (reaction, user) => {
                return reaction.emoji.name === emojies[lmao] && user.id === message.author.id;
            };
            
            const collector = triviaEmbed.createReactionCollector(filter, { time: 15000 });

            let reply = `Oh no! You've run out of time! 
The correct answer was ${trivia.correct_answer}!`

            collector.on('collect', (reaction, user) => {
                reply = `Thats right! The Correct answer was ${trivia.correct_answer}!`
                collector.stop()
            });

            
            collector.on('end', collected => {
                message.reply(reply)
                collector.stop()
            });
        })
    }
    
    exports.trivia = trivia
    })