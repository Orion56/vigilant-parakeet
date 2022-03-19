const user = require('./controllers/user')
const yargs = require('yargs')
//const { number, string } = require('yargs')


yargs.command({
    command: 'add user',
    describe: 'used for adding user',
    builder: {
        name: {
            type: String,
            required:true
        },
        initBalance: {
            type: Number,
            default:0
        }
    },
    handler: function (argv) {
        let newUser = {
            userName: argv.name,
            accountNo: (Math.random() * 10e17),
            initBalance: argv.initBalance,
            remBalance: argv.initBalance,
            operations: []
        }
        //console.log(user)
        user.addUser(newUser)
    }
})

yargs.command({
    command: 'make op',
    describe: 'used for making operations',
    builder: {
        accNum: {
            type: Number,
            required:true
        },
        type: {
            type: String,
            required:true
        },
        amount: {
            type: Number,
            required:true
        }
    },
    handler: function (argv) {
        user.makeOp(argv.accNum,argv.type,argv.amount)
    }
})
yargs.command({
    command: 'mng user',
    describe: 'used to manage user data',
    builder: {
        accNum: {
            type: Number,
            required:true
        },
        action: {
            type: String,
            required:true
        },
    },
    handler: function (argv) {
        console.log(typeof(argv.action))
        console.log(typeof (argv.accNum))
        user.mngUser(argv.accNum, argv.action)
    }
})

yargs.argv