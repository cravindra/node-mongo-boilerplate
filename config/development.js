module.exports = {
    db: {
        uri: 'mongodb://localhost/test',
        options: {
            dbName: 'DEV_DB',
            useNewUrlParser: true
            //user: 'root',
            //pass:'password'
        }
    },
    jwt: {
        secret: 'b9Sg0VZZemQPCIz2QLLHD4pxaOKnSS2Z',
        expiresIn: '1h'
    }
};