if (Meteor.isServer) {
    Router.route('/addNews', { where: 'server' })
     .get(function () {
            var response;
            try {
                var newsObject = News.find({ "is_deleted": 0 }).fetch();
                if (newsObject.length > 0) {
                    response = {
                        "status": true,
                        "error": {},
                        "data": {
                            "news": newsObject
                        }
                    };
                } else {
                    response = {
                        "status": false,
                        "error": {
                            "message": "No news data found."
                        },
                        "data": {}
                    };
                }
            } catch (ex) {
                response = {
                    "status": false,
                    "error": {
                        "message": "Failed to get news data."
                    },
                    "data": {}
                };
            }

            this.response.setHeader('Content-Type', 'application/json');
            this.response.setHeader('Access-Control-Allow-Origin', '*');
            this.response.end(JSON.stringify(response));
        })
        .post(function () {
            var response;
            var title = this.request.body.title;
            var content = this.request.body.content;
            var subcontent = this.request.body.subcontent;
            var image = this.request.body.image;
            var type = this.request.body.type;

            try {
                var newsData = {
                    news_title: title,
                    news_content: content,
                    news_subcontent: subcontent,
                    news_image: image,
                    news_type: type,
                    created_date: new Date(),
                    updated_date: new Date(),
                    is_deleted: 0
                }

                var newsId = News.insert(newsData);
                var insertedObject = News.find({ "_id": newsId }).fetch();
                response = {
                    "status": true,
                    "error": {},
                    "data": {
                        "message": "News added successfully.",
                        "news": insertedObject[0]
                    }
                }

            } catch (ex) {
                console.log('exception')
                console.log(ex)
                response = {
                    "status": false,
                    "error": {
                        "message": "Failed to add News."
                    },
                    "data": {}
                };
            }
            this.response.setHeader('Content-Type', 'application/json');
            this.response.setHeader('Access-Control-Allow-Origin', '*');
            this.response.end(JSON.stringify(response));
        });
    Router.route('/News/:newsID', { where: 'server' })
        .put(function () {
            var response;
            var params = this.params;
            var newsId = params.newsID;
            var title = this.request.body.title;
            var content = this.request.body.content;
            var subcontent = this.request.body.subcontent;
            var image = this.request.body.image;
            var type = this.request.body.type;

            try {
                //var currDate = new Date();
                var newsData = {
                    news_title: title,
                    news_content: content,
                    news_subcontent: subcontent,
                    news_image: image,
                    news_type: type,
                    created_date: new Date(),
                    updated_date: new Date(),
                    is_deleted: 0
                }
                News.update({ _id: newsId }, { $set: newsData });
                var newsObject = News.find({ "_id": newsId }).fetch();


                response = {
                    "status": true,
                    "error": {},
                    "data": {
                        "message": "news updated successfully.",
                        "news": newsObject[0]
                    }
                };
            } catch (ex) {
                response = {
                    "status": false,
                    "error": {
                        "message": "Failed to update News."
                    },
                    "data": {}
                };
            }

            this.response.setHeader('Content-Type', 'application/json');
            this.response.setHeader('Access-Control-Allow-Origin', '*');
            this.response.end(JSON.stringify(response));
        })
        .delete(function () {
            var response;
            var params = this.params;
            var newsId = params.newsID;
            if (newsId == "") {
                response = {
                    "status": false,
                    "error": {
                        "message": "Invalid data."
                    },
                    "data": {}
                };
            } else {
                try {
                    News.update({ _id: newsId }, { $set: { is_deleted: 1 } });
                    var newsObject = News.find({ "_id": newsId }).fetch();
                    response = {
                        "status": true,
                        "error": {},
                        "data": {
                            "message": "News deleted successfully.",
                            "news": newsObject[0]
                        }
                    };
                } catch (ex) {
                    response = {
                        "status": false,
                        "error": {
                            "message": "Failed to delete News."
                        },
                        "data": {}
                    };
                }
            }
            this.response.setHeader('Content-Type', 'application/json');
            this.response.setHeader('Access-Control-Allow-Origin', '*');
            this.response.end(JSON.stringify(response));
        });
}