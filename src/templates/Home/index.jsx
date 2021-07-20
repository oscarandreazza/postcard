import { Component } from "react";
import { Posts } from "../../components/posts";
import { loadPosts } from "../../utils/load-posts";

import "../../styles/global.css";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    serachValue: "",
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();

    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadmorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
    console.log(page, postsPerPage, nextPage, nextPage + postsPerPage);
    console.log("Load more posts");
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };
  // componentDidUpdate() {
  //   // this.freshTimeout();

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;

    return (
      <section className="container">
        <div className="search-container">
          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>
        {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
        {filteredPosts.length === 0 && <p>Não consegui encontrar nada! :(</p>}
        <div className="button-container">
          {!searchValue && (
            <Button text="Load more posts" showMore={this.loadmorePosts} disabled={noMorePosts} />
          )}
        </div>
      </section>
    );
  }
}

export default Home;
