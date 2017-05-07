import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(posts => {
                this.setState({posts});
            });
    }
    
    render() {
        const {posts} = this.state;
        return (
            <Router>
                <Root>
                    <Sidebar>
                        {posts ? (posts.map(post => (
                                <SidebarItem key={post.id}>
                                    <Link to={`/p/${post.id}`}>{post.title}</Link>
                                </SidebarItem>
                            ))
                            ) : (
                                <div>Loading...</div>)}
                    </Sidebar>
                    <Main>
                        <Route exact path="/" render={() => (<h1>Welcome</h1>)} />
                        { posts && (
                            <Route path="/p/:postId" 
                                render={({match}) => (
                                <Post post={posts.find(post => post.id === parseInt(match.params.postId))} />
                            )}/>
                        )}
                    </Main>
                </Root>
            </Router>
        );
    }
}

const Post = ({post}) => {
    console.log(post);
    return (<div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
    </div>
    );
}

const Root = (props) => (
    <div style={{display: 'flex'}} {...props}/>
)
const Main = (props) => (
    <div style={{
        flex: 1,
        height: '100vh',
        overflow: 'auto'
    }}>
        <div style={{padding: '20px'}} {...props} />
    </div>
)


const Sidebar = (props) => (
    <div style={{
        width: '33vw', 
        height: '100vh', 
        overflow:'auto', 
        background: '#eee'}} {...props} />
)

const SidebarItem = (props) => (
    <div style={{
        whitespace: 'nowrap', 
        textOverflow: 'ellipsis', 
        overflow:'hidden', 
        padding: '5px 10px'}} {...props}></div>
)

render(<App/>, document.getElementById('container'));