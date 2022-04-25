import React, { Component } from "react";
import './BlogPost.css';
import Footer from "../../components/BlogPost/Footer";
import Header from "../../components/BlogPost/Header";
import Post from "../../components/BlogPost/Post";
import axios from 'axios';

class BlogPost extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    // fetch('https://jsonplaceholder.typicode.com/posts')
    //   .then(response => response.json())
    //   .then(json => {
    //     this.setState({
    //       posts: json
    //     })
    //   });

    axios.get('http://localhost:3004/posts')
      .then((res) => {
        console.log(res.data)
        this.setState({
          posts: res.data
        })
      });
  }

  render() {
    return (
      <>
        <Header />

        <main>
          <section className="py-5 text-center container">
            <div className="row py-lg-5">
              <div className="col-lg-6 col-md-8 mx-auto">
                <h1 className="fw-light">Simple Personal Blog</h1>
                <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
                <p>
                  <a href="#" className="btn btn-primary my-2 me-2">Main call to action</a>
                  <a href="#" className="btn btn-secondary my-2">Secondary action</a>
                </p>
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
                        title={post.title}
                        key={post.id}
                        author={post.author}
                        desc={post.body.substring(0, 100) + "....."}
                      />
                    )
                  })
                }
                {/* <Post title="Example posts" />
                <Post title="Apa itu Stateless dan Stateful Component Pada React JS" />
                <Post title="Penjelasan Mengenai LifeCycle Component Dalam React JS" /> */}
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