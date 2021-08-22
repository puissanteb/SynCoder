const http = require('http')
const url = require('url')
const { google } = require('googleapis')
const axios = require('axios')
const serviceAccount = require('./serviceAccountKey.json')
const hostname = '127.0.0.1'
const port = 8000
const baseURL = `https://team-b-syncoder-default-rtdb.firebaseio.com`
// 모든 사용자 조회 API
const getUserList = (appKey) =>
    axios
        .get(`${baseURL}/users.json?access_token=${appKey}`)
        .then((res) => res.data)
        .catch(console.error)
// 특정 사용자 조회 API
const getUser = (userId, appKey) =>
    axios
        .get(`${baseURL}/users/${userId}.json?access_token=${appKey}`)
        .then((res) => res.data)
        .catch(console.error)
// 사용자 삭제 API
const deleteUser = (userId, appKey) =>
    axios
        .delete(`${baseURL}/users/${userId}.json?access_token=${appKey}`)
        .then((res) => res.data)
        .catch(console.error)
// 게시글 목록 조회 API
const getPostList = (appKey) =>
    axios
        .get(`${baseURL}/posts.json?access_token=${appKey}`)
        .then((res) => res.data)
        .catch(console.error)
// 특정 게시글 조회 API
const getPost = (postId, appKey) =>
    axios
        .get(`${baseURL}/posts/${postId}.json?access_token=${appKey}`)
        .then((res) => res.data)
        .catch(console.error)
// 게시글 삭제 API
const deletePost = (postId, appKey) =>
    axios
        .delete(`${baseURL}/posts/${postId}.json?access_token=${appKey}`)
        .then((res) => res.data)
        .catch(console.error)
// 특정 글의 댓글 조회 API
const getReplies = (postId, appKey) =>
    axios
        .get(
            postId
                ? `${baseURL}/replies.json?access_token=${appKey}&orderBy="postId"&equalTo="${postId}"`
                : `${baseURL}/replies.json?access_token=${appKey}`
        )
        .then((res) => res.data)
        .catch(console.error)
// user 추가 API
const addUser = (nickname, email, mobile, appKey) => {
    const newUser = {
        nickname,
        email,
        mobile,
        createdAt: new Date(),
        lastLoginedAt: new Date(),
    }
    return axios
        .post(`${baseURL}/users.json?access_token=${appKey}`, newUser)
        .catch(console.error)
}
// 글 추가 API
const addPost = (userId, body, appKey) => {
    const newPost = {
        userId,
        body,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    return axios
        .post(`${baseURL}/posts.json?access_token=${appKey}`, newPost)
        .catch(console.error)
}
// 댓글 추가 API
const addReply = (userId, postId, body, appKey) => {
    const newReply = {
        userId,
        postId,
        body,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    return axios
        .post(`${baseURL}/replies.json?access_token=${appKey}`, newReply)
        .catch(console.error)
}

const jwtClient = new google.auth.JWT(
    serviceAccount.client_email,
    null,
    serviceAccount.private_key,
    [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/firebase.database',
    ]
)

// serviceAccountKey를 이용해 Access Token을 발급합니다.
jwtClient.authorize((error, tokens) => {
    if (error) {
        console.log('Error making request to generate access token:', error)
    } else if (tokens.access_token === null) {
        console.log(
            'Provided service account does not have permission to generate access tokens'
        )
    } else {
        const accessToken = tokens.access_token
        const server = http.createServer((req, res) => {
            const { method } = req
            const [path, query] = [
                url.parse(req.url).pathname,
                url.parse(req.url, true).query,
            ]
            // POST일 때는 request body 데이터 받음
            switch (path) {
                case '/api/users':
                    switch (method) {
                        case 'GET':
                            query.userId
                                ? getUser(query.userId, accessToken).then(
                                      (data) => {
                                          res.statusCode = 200
                                          res.setHeader(
                                              'Content-Type',
                                              'application/json; charset=utf-8'
                                          )
                                          res.setHeader(
                                              'Access-Control-Allow-Origin',
                                              '*'
                                          )
                                          res.end(JSON.stringify(data))
                                      }
                                  )
                                : getUserList(accessToken).then((data) => {
                                      res.statusCode = 200
                                      res.setHeader(
                                          'Content-Type',
                                          'application/json; charset=utf-8'
                                      )
                                      res.setHeader(
                                          'Access-Control-Allow-Origin',
                                          '*'
                                      )
                                      res.end(JSON.stringify(data))
                                  })
                            break
                        case 'POST':
                            let temp = ''
                            req.on('data', (data) => {
                                temp += data
                            })
                            req.on('end', () => {
                                const body = JSON.parse(temp)
                                if (
                                    !body.nickname ||
                                    !body.email ||
                                    !body.mobile
                                ) {
                                    console.error(`Bad Request`)
                                    res.statusCode = 400
                                    res.end()
                                }
                                addUser(
                                    body.nickname,
                                    body.email,
                                    body.mobile,
                                    accessToken
                                ).then(() => {
                                    res.statusCode = 200
                                    res.end()
                                })
                            })
                            break
                        default:
                    }
                    break
                case '/api/posts':
                    switch (method) {
                        case 'GET':
                            query.postId
                                ? getPost(query.postId, accessToken).then(
                                      (data) => {
                                          res.statusCode = 200
                                          res.setHeader(
                                              'Content-Type',
                                              'application/json; charset=utf-8'
                                          )
                                          res.setHeader(
                                              'Access-Control-Allow-Origin',
                                              '*'
                                          )
                                          res.end(JSON.stringify(data))
                                      }
                                  )
                                : getPostList(accessToken).then((data) => {
                                      res.statusCode = 200
                                      res.setHeader(
                                          'Content-Type',
                                          'application/json; charset=utf-8'
                                      )
                                      res.setHeader(
                                          'Access-Control-Allow-Origin',
                                          '*'
                                      )
                                      res.end(JSON.stringify(data))
                                  })
                            break
                        case 'POST':
                            let temp = ''
                            req.on('data', (data) => {
                                temp += data
                            })
                            req.on('end', () => {
                                const body = JSON.parse(temp)
                                if (!body.userId) {
                                    console.error(`Bad Request`)
                                    res.statusCode = 400
                                    res.end()
                                }
                                addPost(
                                    body.userId,
                                    body.body ?? `새로운 게시물입니다.`,
                                    accessToken
                                ).then(() => {
                                    res.statusCode = 200
                                    res.end()
                                })
                            })
                            break
                        default:
                    }
                    break
                case '/api/replies':
                    switch (method) {
                        case 'GET':
                            getReplies(query.postId, accessToken).then(
                                (data) => {
                                    res.statusCode = 200
                                    res.setHeader(
                                        'Content-Type',
                                        'application/json; charset=utf-8'
                                    )
                                    res.setHeader(
                                        'Access-Control-Allow-Origin',
                                        '*'
                                    )
                                    res.end(JSON.stringify(data))
                                }
                            )
                            break
                        case 'POST':
                            let temp = ''
                            req.on('data', (data) => {
                                temp += data
                            })
                            req.on('end', () => {
                                const body = JSON.parse(temp)
                                if (!body.userId || !body.postId) {
                                    console.error(`Bad Request`)
                                    res.statusCode = 400
                                    res.end()
                                }
                                addReply(
                                    body.userId,
                                    body.postId,
                                    body.body ?? `새로운 댓글입니다.`,
                                    accessToken
                                ).then(() => {
                                    res.statusCode = 200
                                    res.end()
                                })
                            })
                            break
                        default:
                    }
                    break
                default:
            }
        })
        server.listen(port, hostname, () => {
            console.log(`Server running at http://${hostname}:${port}/`)
        })
    }
})
