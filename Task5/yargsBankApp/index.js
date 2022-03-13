const user = require('./controllers/user')
const yargs = require('yargs')

let initial_balance
yargs.command({
    command: 'add user',
    describe: 'used for adding user',
    builder: {
        name: {
            type: String,
            required:true
        },
        initial_balance: {
            type: Number,
            default:0
        }
    },
    handler: function (argv) {
        let userData = {
            userName: argv.name,
            accountNo: Math.floor(Math.random()*10e16),
            iniBalance: argv.initial_balance,
            remBalance: argv.initial_balance,
            operations: []
        }
        user.addUser(userData)
        user.showUser(userData)
        //console.log(userData)
    }
})


yargs.argv