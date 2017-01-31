
var connectHandler = WebApp.connectHandlers;
Meteor.startup(function () {

    connectHandler.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        return next();
    });

    // Configuration for email functionality.
    // var smtp = {
    //     username: Meteor.settings.private.smtpUsername, // eg: server@gentlenode.com
    //     password: Meteor.settings.private.smtpPassword, // eg: 3eeP1gtizk5eziohfervU
    //     server: Meteor.settings.private.smtpServer, // eg: mail.gandi.net
    //     port: Meteor.settings.private.smtpPort
    // };

    var smtp = {
        username: "noteera.dev@gmail.com", // eg: server@gentlenode.com
        password: "SammyHal1m1", // eg: 3eeP1gtizk5eziohfervU
        server: "smtp.gmail.com", // eg: mail.gandi.net
        port: 465
    };
    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

    //   process.env.MONGO_URL = Meteor.settings.mongoURL;

    //var database = new MongoInternals.RemoteCollectionDriver("mongodb://127.0.0.1:3001/noteera");

    //  var database = new MongoInternals.RemoteCollectionDriver(process.env.MONGO_URL);
    Users = new Mongo.Collection("user");
    News = new Mongo.Collection("news");
});