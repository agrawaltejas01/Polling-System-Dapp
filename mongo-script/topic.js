db.createCollection("topic");

db.topic.insertMany(
    [
        {
            "_id" : 1,
            "userId" : "tejas",
            "title" : "Data base design is good",
            "primaryTag" : "Technology",
            "secondaryTags" : [ ],
            "startingDate" : ISODate("2020-08-04T05:17:51.328Z")
    },
    {
            "_id" : 2,
            "userId" : "tejas",
            "title" : "Yeh melody itni chocklaty kyu hai ?",
            "primaryTag" : "Food",
            "secondaryTags" : [ ],
            "startingDate" : ISODate("2020-06-05T05:13:28.073Z")
    },
    {
            "_id" : 3,
            "userId" : "sagar",
            "title" : "Mera phone abhi aur chalega",
            "primaryTag" : "Technology",
            "secondaryTags" : [ ],
            "startingDate" : ISODate("2020-07-05T05:13:28.073Z")
    },
    {
            "_id" : 4,
            "userId" : "sagar",
            "title" : "Dominos hi khate hai",
            "primaryTag" : "Food",
            "secondaryTags" : [ ],
            "startingDate" : ISODate("2020-08-04T05:17:51.328Z")
    },
    {
            "_id" : 5,
            "userId" : "mihir",
            "title" : "Ummed nahi jidd honi chahiye",
            "primaryTag" : "Thought",
            "secondaryTags" : [ ],
            "startingDate" : ISODate("2020-07-05T05:13:28.073Z")
    },
    {
            "_id" : 6,
            "userId" : "mihir",
            "title" : "Finestra doob jaye !!!!",
            "primaryTag" : "Jobs",
            "secondaryTags" : [ ],
            "startingDate" : ISODate("2020-06-05T05:13:28.073Z")
    },
    {
            "_id" : 7,
            "userId" : "vedang",
            "title" : "Kya scenes ?",
            "primaryTag" : "Thought",
            "secondaryTags" : [ ],
            "startingDate" : ISODate("2020-07-05T05:13:28.073Z")
    },
    {
            "_id" : 8,
            "userId" : "vedang",
            "title" : "MS karna chahiye ya job",
            "primaryTag" : "Education",
            "secondaryTags" : [ ],
            "startingDate" : ISODate("2020-06-05T05:13:28.073Z")
    }
        
    ]
)