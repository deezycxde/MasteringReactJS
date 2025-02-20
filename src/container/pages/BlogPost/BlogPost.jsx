import React, { Component } from "react";
import './BlogPost.css';
import Footer from "../../../components/BlogPost/Footer";
import Post from "../../../components/BlogPost/Post";
import axios from 'axios';

class BlogPost extends Component {
  state = {
    posts: [],
    blogPostForm: {
      userId: 1,
      id: ``,
      title: ``,
      author: `John Doe`,
      body: ``
    },
    isUpdate: false,
    btnText: 'Submit'
  }

  blogPostFormHandler = (e) => {
    let newBlogPostForm = { ...this.state.blogPostForm };
    let timestamps = new Date().getTime();
    let update = this.state.isUpdate;
    if (!update) {
      newBlogPostForm.id = timestamps;
    }
    newBlogPostForm[e.target.name] = e.target.value;

    this.setState({
      blogPostForm: newBlogPostForm
    });
  }

  getPostAPI = () => {
    axios.get('http://localhost:3004/posts?_sort=id&_order=desc')
      .then((res) => {
        this.setState({
          posts: res.data
        })
      });
  }

  clearFormHandler = () => {
    this.setState({
      isUpdate: false,
      blogPostForm: {
        userId: 1,
        id: ``,
        title: ``,
        author: `John Doe`,
        body: ``
      }
    });
  }

  postDataToAPI = () => {
    let data = this.state.blogPostForm;

    axios.post('http://localhost:3004/posts', data)
      .then((res, err) => {
        console.log(res);

        if (res.status == 201) {
          alert('Your post has been successfully created!');
        } else {
          alert('Your post has an error!');
        }

        this.clearFormHandler();
        this.getPostAPI();
        console.log(res);
      })
  }

  putDataToAPI = () => {
    const postID = this.state.blogPostForm.id
    let data = this.state.blogPostForm;
    axios.put(`http://localhost:3004/posts/${postID}`, data)
      .then((res) => {
        if (res.status === 200) {
          alert('Your post has been successfully updated!')
        } else {
          alert('Your post has failed to update');
          return false;
        }        
        
        this.clearFormHandler();
        this.getPostAPI();
        console.log(res);
      })
  }

  updateDataHandler = (data) => {
    this.setState({
      blogPostForm: data,
      isUpdate: true
    }, () => {
      console.log(data);
    })
  }

  submitDataHandler = (e) => {
    e.preventDefault();

    if (this.state.isUpdate) {
      this.putDataToAPI();
    } else {
      this.postDataToAPI();
    }
  }

  removeDataHandler = (data) => {
    axios.delete(`http://localhost:3004/posts/${data}`)
      .then((res) => {
        console.log(res);
        this.getPostAPI();
      })
  }

  detailPostHandler = (id) => {
    this.props.history.push(`/posts/${id}`);
  }

  resetButton = (e) => {
    e.preventDefault();

    this.clearFormHandler();
  }

  componentDidMount() {
    this.getPostAPI();
  }

  render() {
    const { btnText } = this.state;
    return (
      <>
        <main>
          <section className="py-5 text-center container">
            <div className="row py-lg-5">
              <div className="col-lg-6 col-md-8 mx-auto">
                <h1 className="fw-light">Simple Personal Blog</h1>
                <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
                <p>
                  <button type="button" className="btn btn-primary my-2 me-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Make a simple post here
                  </button>
                </p>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Your posts</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <div className="row">
                          <div className="col-mb-6 text-start">
                            <form>
                              <div className="mb-3">
                                <label htmlFor="title" className="form-label">Post title</label>
                                <input type="text" value={this.state.blogPostForm.title} onChange={this.blogPostFormHandler} className="form-control" name="title" id="title" aria-describedby="title" placeholder="Input your post title here" />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="body" className="form-label">Description</label>
                                <textarea value={this.state.blogPostForm.body} onChange={this.blogPostFormHandler} className="form-control" name="body" id="desc" rows="3" placeholder="Input your litle describe about your post here"></textarea>
                              </div>
                              <button type="submit" onClick={this.submitDataHandler} className="btn btn-primary me-2">{btnText}</button>
                              <button type="reset" onClick={this.resetButton} className="btn btn-warning">Reset</button>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="album py-5 bg-light">
            <div className="container">

              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {
                  this.state.posts.map((post) => {
                    return (
                      <Post
                        key={post.id}
                        data={post}
                        removeData={this.removeDataHandler}
                        updateData={this.updateDataHandler}
                        toDetail={this.detailPostHandler}
                      />
                    )
                  })
                }
              </div>
            </div>
          </div>

        </main>
        <Footer />
      </>
    )
  }
}

export default BlogPost;