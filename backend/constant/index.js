module.exports = {
    DEVELOPMENT: 'development',
    ROLE: {
        admin: 1,
        user: 0
    },
    ERROR: 'error',
    MESSAGE: 'message',
    CHARACTER_LENGTH: {
        body: {
            max: 2000000,
            min: 200
        },
        title: {
            max: 160,
            min: 3
        },
        excerpt: {
            length: 320,
            max: 1000
        },
        metaDescription: {
            max: 160
        }
    }
}