import React, { Component } from "react";
import PropTypes from 'prop-types'

class CommentInput extends Component{

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            content: ''
        }

    }
    static propTypes = {
        onSubmit: PropTypes.func
    }


    componentDidMount () {
        this.textarea.focus()
    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value,
        });
    }




    handleContentChange(event) {
        this.setState({
            content: event.target.value,
        });
    }

    handleSubmit() {
        if (this.props.onSubmit) {
            const { username, content } = this.state
            this.props.onSubmit({username, content, createdTime: new Date()})
        }
        this.setState({ content: '' })
    }
    _saveUsername (username) {
        localStorage.setItem('username', username)
    }

    handleUsernameBlur (event) {
        this._saveUsername(event.target.value)
    }

    componentWillMount () {
        this._loadUsername()
    }

    _loadUsername () {
        const username = localStorage.getItem('username')
        if (username) {
            this.setState({ username })
        }
    }

    render() {
        return(
            <div className="comment-input">
                <div className="comment-field">
                    <span className="comment-field-name">用户名:</span>
                    <div className="comment-field-input">
                        <input onBlur={this.handleUsernameBlur.bind(this)} value={ this.state.username } onChange={ this.handleUsernameChange.bind(this) }/>
                    </div>
                </div>
                <div className="comment-field">
                    <span className="comment-field-name">评论内容</span>
                    <div className="comment-field-input">
                        <textarea ref={text => this.textarea = text} value={ this.state.content } onChange={ this.handleContentChange.bind(this) }/>
                    </div>
                </div>
                <div className="comment-field-button">
                    <button onClick={ this.handleSubmit.bind(this) }>发布</button>
                </div>
            </div>
        )
    }
}

export default CommentInput;
