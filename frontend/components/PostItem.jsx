import React from 'react';
import moment from 'moment';
import { Link } from 'redux-little-router';

class PostItem extends React.Component {
  getDate() {
    return moment(this.props.post.post_date, 'X').format('MMMM D, YYYY');
  }

  getPermalink() {
    return `/posts/${this.props.post.friendly_name}`;
  }

  getBody() {
    const body = this.props.postIndex ? this.props.post.preview : this.props.post.body;
    return (
      <div className="post--body">
        <span dangerouslySetInnerHTML={{ __html: body }} />
        {this.getReadMore()}
      </div>
    );
  }

  getReadMore() {
    const { postIndex, post: { preview, body } } = this.props;
    if (postIndex && preview !== body) {
      return (
        <Link href={this.getPermalink()}>
          Continue reading...
        </Link>
      );
    }
    return null;
  }

  render() {
    if (this.props.post) {
      return (
        <div className="post">
          <Link href={this.getPermalink()}>
            <h2 className="post--title">{this.props.post.title}</h2>
          </Link>
          {this.getBody()}
          <div className="post--date">
            <div className="post--dateText">{this.getDate()}</div>
          </div>
        </div>
      );
    }
    return null;
  }
}

PostItem.propTypes = {
  post: React.PropTypes.object,
  postIndex: React.PropTypes.bool,
};

export default PostItem;
