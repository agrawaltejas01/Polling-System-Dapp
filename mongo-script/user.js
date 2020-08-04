db.createCollection("user");

db.user.insertMany(
    [
        {
            _id : "tejas",
            password : "12345",
            topics : [],
            topicVoted : []
        },

        {
            _id : "sagar",
            password : "12345",
            topics : [],
            topicVoted : []
        },

        {
            _id : "mihir",
            password : "12345",
            topics : [],
            topicVoted : []
        },

        {
            _id : "vedang",
            password : "12345",
            topics : [],
            topicVoted : []
        },
    ]
)