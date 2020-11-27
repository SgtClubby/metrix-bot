request = require("request")
Discord = require("discord.js")
const MongoClient = require("mongodb").MongoClient
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
            let emojiesWrong = []

            switch (trivia.type) {
                case "boolean":
                    answers = [ trivia.correct_answer, 
                                trivia.incorrect_answers[0], 
                                ];
                    emojies = [
                                `1️⃣`,
                                `2️⃣`,
                                ]
                    emojiesWrong = [
                                `1️⃣`,
                                `2️⃣`
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
                    emojiesWrong = [
                                `1️⃣`,
                                `2️⃣`,
                                `3️⃣`,
                                `4️⃣`
                                ]
                    break
            }


            answers.forEach(answer => {
                answer = answer.replace(/&quot;/g,'"')
                answer = answer.replace(/&#039;/g,`'`)
                answer = answer.replace(/&amp;/g,'&')
            });

            question = question.replace(/&quot;/g,'"')
            question = question.replace(/&#039;/g,`'`)
            question = question.replace(/&amp;/g,'&')

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
            triviaEmbed = await message.channel.send(statusembed).then(triviaEmbed => {
            
            emojies.forEach(emoji => {
                triviaEmbed.react(emoji)
            });

            let correctansweri = 0
            let THECorrectAnswer = 0 
            answers.forEach(correctanswer => {
                if (correctanswer != trivia.correct_answer) {
                    correctansweri++
                } else {
                    THECorrectAnswer = correctansweri
                }
            })
            var index = emojiesWrong.indexOf(emojiesWrong[THECorrectAnswer]);
            if (index !== -1) {
                emojiesWrong.splice(index, 1);
            }
            

            // console.log("index: " + index)
            // console.log("THECorrectAnswer: " + THECorrectAnswer)
            // console.log("correct answer from search function: " + emojies[THECorrectAnswer])
            // console.log("all the emojies: " + emojies)
            // console.log("all the wrong answers: " + emojiesWrong)
            // console.log("the correct emoji: " + emojies[THECorrectAnswer])
            // console.log("correct answer: " + trivia.correct_answer)
            // console.log("all the answers: " + answers)

            const Dilter = (reaction, user) => {
                return reaction.emoji.name === emojies[THECorrectAnswer] && user.id === message.author.id;
            }

            const collector = triviaEmbed.createReactionCollector(Dilter, { time: 15000 })

            const wrongFilter0 = (reaction, user) => {
                return reaction.emoji.name === emojiesWrong[0] &&  user.id === message.author.id;
            };
            const wrongFilter1 = (reaction, user) => {
                return reaction.emoji.name === emojiesWrong[1] &&  user.id === message.author.id;
            };
            const wrongFilter2 = (reaction, user) => {
                return reaction.emoji.name === emojiesWrong[2] &&  user.id === message.author.id;
            };

            const wrongCollector0 = triviaEmbed.createReactionCollector(wrongFilter0, { time: 15000 });
            const wrongCollector1 = triviaEmbed.createReactionCollector(wrongFilter1, { time: 15000 });
            const wrongCollector2 = triviaEmbed.createReactionCollector(wrongFilter2, { time: 15000 });
           

            let reply = `Oh no! You've run out of time! The correct answer was ${trivia.correct_answer}!`

            collector.on('collect', (reaction, user) => {
                reply = `Thats right! The Correct answer was ${trivia.correct_answer}!`
                
                collector.stop()
                wrongCollector0.stop()
                wrongCollector1.stop()
                wrongCollector2.stop()
            });
            wrongCollector0.on('collect', (reaction, user) => {
                reply = `Thats wrong! The Correct answer was ${trivia.correct_answer}!`
                collector.stop()
                wrongCollector0.stop()
                wrongCollector1.stop()
                wrongCollector2.stop()
            });
            wrongCollector1.on('collect', (reaction, user) => {
                reply = `Thats wrong! The Correct answer was ${trivia.correct_answer}!`
                collector.stop()
                wrongCollector0.stop()
                wrongCollector1.stop()
                wrongCollector2.stop()
            });
            wrongCollector2.on('collect', (reaction, user) => {
                reply = `Thats wrong! The Correct answer was ${trivia.correct_answer}!`
                collector.stop()
                wrongCollector0.stop()
                wrongCollector1.stop()
                wrongCollector2.stop()
            });


            collector.on('end', collected => {
                message.reply(reply)
                collector.stop()
                if (reply.includes("Thats right! The Correct answer was")) {
                    message.channel.send(`You've been granted with ${dif} EXP`)
                    var url = "mongodb://localhost:27017"
                    MongoClient.connect(url, function(err, db) {
                        if (err) throw err
                        var dbo = db.db("metrix")
                        var myquery = {
                            user_id: `${message.author.id}`
                        }
                        dbo.collection("levels").findOne(myquery, function(err, res) {

                        if (err) throw err
                        if (!res) return
                        if (res.user_id === client.user.id) return
                        var curexp = res.exp

                        const new_xp = curexp + dif
            
                        var myquery = {
                            user_id: message.author.id
                        }
                        var newvalues = {
                            $set: {
                                exp: new_xp
                            }
                            }
                        dbo.collection("levels").updateOne(myquery, newvalues, function(err, res) {
                            if (err) throw err
                            db.close()
                        })
                        })
                    })
                }
            })
        })    
    })
}
exports.trivia = trivia
})