const TelegramApi = require('node-telegram-bot-api')

const {gameOptions, againOptions} = require('./options')

const token = '5600723213:AAEVaovKoccS9wlnJBN5-JxfC3NsCkQ-A10'

const bot = new TelegramApi(token, {polling:true})

const chats = {}



const startGame = async(chatId) => {
    await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать!`)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
}

const start = () => {

    bot.setMyCommands([
        {command: '/start', description:'Начальное приветствие'},
        {command: '/info', description:'Получить информацию о пользвателе'},
        {command: '/game', description:'Игра угадай цифру!'}
    ])


    bot.on('message', async  msg=> {
        const data = msg.data;
        const chatId = msg.chat.id;
        if(data === '/again'){
            return  startGame(chatId)
        }

        if(text === '/start'){
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/05c/00c/05c00c7c-b80e-3be4-b2a4-b3280fd9e68b/1.webp')
            return bot.sendMessage(chatId, `Добро пожаловать в телеграм бот автор этого канала Бал-Тил`)
        }
        if(text === '/info'){
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.username}`)
        }
        if(text === '/game'){
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!')
    })

    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if(data === '/again'){
           return  startGame(chatId)
        }
        if(data === chats[chatId]){
            return bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`, againOptions)
        }else {
            return bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions)
        }

    })
}

start()