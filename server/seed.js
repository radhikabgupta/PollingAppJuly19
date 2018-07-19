require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise=global.Promise;
mongoose.connect(process.env.DATABASE);

const db = require('./models');

const users = [
    {username: 'rg', password: 'password'},
    {username: 'rgupta', password: 'password'}    
]

const polls = [
    {   question: 'which is the best JavaScript framework', 
    options:['Angular','React','VueJS']  },
    {   question: 'Who is the best mutant', 
    options:['Wolverine','Deadpool']  },
    {   question: 'Truth or dare', 
    options:['Truth','Dare']  },
    {   question: 'Boolean', options:['True','False']  }
];

const seed = async () => {
    try {
        await db.User.remove();
        console.log('Drop all users');

        await db.Poll.remove();
        console.log('Drop all polls');

        await Promise.all(
            users.map(async user => {
                const data = await db.User.create(user);
                await data.save();
            })
        );
        console.log('Created users', JSON.stringify(users));

        await Promise.all(
            polls.map(async poll => {
                poll.options = poll.options.map(option => ({option, votes:0}));
                const data = await db.Poll.create(poll);
                const user = await db.User.findOne({username:'rg'});
                data.user=user;
                user.polls.push(data._id);
                await user.save();                
                await data.save();
            })
        );
        console.log('Created polls', JSON.stringify(polls));        
    } catch (err) {
        console.log(err);
    }
};

seed();