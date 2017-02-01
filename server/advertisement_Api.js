if (Meteor.isServer) {
    Router.route('/addAdvertisement', { where: 'server' })
        .get(function () {
            var response;
            try {
                var advtObject = Advertisement.find({ "is_deleted": 0 }).fetch();
                if (advtObject.length > 0) {
                    response = {
                        "status": true,
                        "error": {},
                        "data": {
                            "advt": advtObject
                        }
                    };
                } else {
                    response = {
                        "status": false,
                        "error": {
                            "message": "No advertisements data found."
                        },
                        "data": {}
                    };
                }
            } catch (ex) {
                response = {
                    "status": false,
                    "error": {
                        "message": "Failed to get advertisements data."
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
            var image = this.request.body.image;

            try {
                var advtData = {
                    advt_title: title,
                    advt_image: image,
                    created_date: new Date(),
                    updated_date: new Date(),
                    is_deleted: 0
                }

                var advtId = Advertisement.insert(advtData);
                var insertedObject = Advertisement.find({ "_id": advtId }).fetch();
                response = {
                    "status": true,
                    "error": {},
                    "data": {
                        "message": "Advertisement added successfully.",
                        "advt": insertedObject[0]
                    }
                }

            } catch (ex) {
                console.log('exception')
                console.log(ex)
                response = {
                    "status": false,
                    "error": {
                        "message": "Failed to add Advertisement."
                    },
                    "data": {}
                };
            }
            this.response.setHeader('Content-Type', 'application/json');
            this.response.setHeader('Access-Control-Allow-Origin', '*');
            this.response.end(JSON.stringify(response));
        });
    Router.route('/Advertisement/:advtID', { where: 'server' })
        .put(function () {
            var response;
            var params = this.params;
            var advtId = params.advtID;
            var title = this.request.body.title;
            var image = this.request.body.image;

            try {
                //var currDate = new Date();
                var advtData = {
                    advt_title: title,
                    advt_image: image,
                    created_date: new Date(),
                    updated_date: new Date(),
                    is_deleted: 0
                }
                Advertisement.update({ _id: advtId }, { $set: advtData });
                var advtObject = Advertisement.find({ "_id": advtId }).fetch();


                response = {
                    "status": true,
                    "error": {},
                    "data": {
                        "message": "Advertisement updated successfully.",
                        "advt": advtObject[0]
                    }
                };
            } catch (ex) {
                response = {
                    "status": false,
                    "error": {
                        "message": "Failed to update Advertisement."
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
            var advtId = params.advtID;
            if (advtId == "") {
                response = {
                    "status": false,
                    "error": {
                        "message": "Invalid data."
                    },
                    "data": {}
                };
            } else {
                try {
                    Advertisement.update({ _id: advtId }, { $set: { is_deleted: 1 } });
                    var advtObject = Advertisement.find({ "_id": advtId }).fetch();
                    response = {
                        "status": true,
                        "error": {},
                        "data": {
                            "message": "Advertisement deleted successfully.",
                            "advt": advtObject[0]
                        }
                    };
                } catch (ex) {
                    response = {
                        "status": false,
                        "error": {
                            "message": "Failed to delete Advertisement."
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