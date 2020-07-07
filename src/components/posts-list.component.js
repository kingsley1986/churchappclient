import React, {Component} from  'react';
import { Link} from 'react-router-dom';
import axios from 'axios'; 

const Post = props => (
    <div>
        <div className="single-blog-item">
            <div className="blog-thumnail"></div>
            <Link to={props.post._id} ><img src={props.post.postImage} alt="blog-img" style={{ width: "250px", height: "250px"}}  /></Link>
        </div>
        <div className="blog-content">
            <h4><Link to={"/posts/"+props.post._id+"/comments"}>{props.post.title}</Link></h4>
            <p>{props.post.description}</p>
       
            <a href="" className="more-btn">View More</a>
        </div>
        <span className="blog-date">{props.post.createdAt}</span>
    </div>
)


export default class PostsList extends Component {

    constructor(props) {
        super(props);
        this.state = {posts: []};
    }

    componentDidMount() {
        axios.get('http://localhost:9000/posts/')
        .then(response => {
            this.setState({posts: response.data})

        })
        .catch(function (error) {
            console.log(error);
        })
    }
    


    postList() {
        return this.state.posts.map(function(currentPost, i) {
            return <Post post={currentPost} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>Post List</h3>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
            
                            {this.postList() }
                        </div>
                        
                    </div>   
                </div>
                 
            </div>
        )
    }
}