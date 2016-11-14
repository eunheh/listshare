'use strict'

const Post = use("App/Model/Post")

class PostController {

  * submit (request, response) {
    let userId = request.param('id')
    let link = request.only('title', 'url')
    link.user_id = userId
    let user = request.authUser

    if (user){
      let post = yield Post.create(link)
      response.status(201).json(post)
    } else {
      response.status(403).json({ error: "User unauthorized" })
    }

  }

  * index (request, response) {
    let userId = request.param('id')
    let post = yield Post.query().orderBy('updated_at', 'desc').fetch()

    response.json(post)
  }

  // * delete (request, response) {
  //   let postId = request.param('id')
  //   let removePost = yield Post.findBy('id', postId)
  //   let user = request.authUser
  //
  //   if (user){
  //     let post = yield Post.del()
  //     response.json(removePost)
  //   } else {
  //     response.status(403).json({ error: "User unauthorized" })
  //   }
  // }
}

module.exports = PostController
