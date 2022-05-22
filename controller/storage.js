function getAccessError(key, user) {
    if (!key) {
        return {
            status: 400,
            text: "Expected 'key'!"
        }
    }
    if (!user) {
        return {
            status: 401,
            text: "Not logged in!"
        }
    }
}
function access(db, user, key, f) {
    let err = getAccessError(key, user);
    if (err) {
        return err;
    }
    let data = (db.loadJson(user) || {})
    let write = (value) => {
        data[key] = value;
        db.saveJson(user, data)
    }
    return f(data[key], write);
}

module.exports = {
    login: (data, db) => {
        //Note: This is totally unsafe because request parameters are mingled into session data!
        //e.g. open: http://localhost:8080/?user=Mallory, then http://localhost:8080/
        let sessData = data.session.getData();
        let user = sessData.user = data.request.post.user || data.request.get.user;
        if (user) {
            sessData.user = user;
            data.session.save(sessData);
            return {
                status: 302,
                redirect: "/"
            }
        } else {
            return {
                status: 400,
                text: "Expected 'user'!"
            }
        }
    },
    write: (data, db) => {
        let key = data.request.path.key;
        let value = data.request.post.value;
        let user = data.session.getData().user;
        return access(db, user, key, (_, write) => {
            write(value);
            return {
                status: 302,
                redirect: "/data?key=" + encodeURIComponent(key)
            }
        })
    },
    read: (data, db) => {
        let key = data.request.get.key || data.request.post.key;
        let user = data.session.getData().user;
        return access(db, user, key, (value) => {
            return {
                status: 200,
                page: "data",
                frontmatter: {
                    key: key,
                    value: value
                }
            }
        })
    }
}