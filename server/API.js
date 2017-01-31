if (Meteor.isServer) {
    Router.route('/addNews', { where: 'server' })
        .post(function () {
            var response;
            var content = "newscontent";
            var discussionType = "current";
            var typeRefId = 1234;

           
              
                   
                        try {
                            var discussionData = {
                                content: content,
                                discussion_type: discussionType,
                                type_ref_id: typeRefId,
                            }

                            var discussionId = News.insert(discussionData);
                            var insertedObject = News.find({ "_id": discussionId }).fetch();
                            response = {
                                "status": true,
                                "error": {},
                                "data": {
                                    "message": "Discussion added successfully.",
                                    "discussion": insertedObject[0]
                                }
                            }

                        } catch (ex) {
                            console.log('exception')
                            console.log(ex)
                            response = {
                                "status": false,
                                "error": {
                                    "message": "Failed to add discussion."
                                },
                                "data": {}
                            };
                        }
            this.response.setHeader('Content-Type', 'application/json');
            this.response.setHeader('Access-Control-Allow-Origin', '*');
            this.response.end(JSON.stringify(response));
        });
}