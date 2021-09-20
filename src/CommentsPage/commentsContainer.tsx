import React from 'react';
import Comment from './Comment'

const CommentsContainer = props => {

    const [allComments, setAllComments] = React.useState(null);
    const [newComment, setNewComment] = React.useState(null);
    const [isNewCommentActive, setIsNewCommentActive] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState(null);
    const [searchResults, setSearchResults] = React.useState(null);
    const lastSearchedItem = React.useRef();
    const getAllComments = () => {
        fetch('/api/comments', {
            method: 'get'
        }).then(res => res.json()).then(resBody => {
            setAllComments(resBody)
        });
    };

    React.useEffect(() => {
        getAllComments();
    }, [])

    const setAddCommentActive = React.useCallback(() => {
        setIsNewCommentActive(true);
    }, [])

    const editNewComment = React.useCallback((event) => {
        setNewComment(event.target.value)
    }, [])

    React.useEffect(() => {
        fetch(`/api/comments?q=${searchQuery}`, {
            method: 'get'
        }).then(res => res.json()).then(resBody => {
            if (lastSearchedItem.current === searchQuery) {
                setSearchResults(resBody)
            }
        });
    }, [searchQuery])
    const editSearchQuery = React.useCallback((event) => {
        const sq = event.target.value;
        setSearchQuery(sq);
        lastSearchedItem.current = sq;
    }, [])

    const addNewComment = () => {
        const newId = Math.floor(Math.random() * 100)
        const comment = {
            id: newId,
            text: newComment
        }

        fetch('/api/comments', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comment)
        }).then(() => {
            getAllComments();
            setIsNewCommentActive(false);
            setNewComment(null)
        });
    };



    return (
        <div>
            <div>
                <text className="header">Comments Section</text>
                {allComments ? allComments.map((comment, index) => {
                    return <Comment key={`${index}-${comment.text}-${comment.id}`} comment={comment.text} id={comment.id} getAllComments={getAllComments} />
                }) : null}

                {!isNewCommentActive ? <button onClick={setAddCommentActive}>Add Comment +</button> : null}
                {isNewCommentActive ? <div><input value={newComment || ''} onChange={editNewComment} type="text>" /> <button onClick={addNewComment}>Add +</button></div> : null}
            </div>
            <div className="header">
                Search Comments
                <input className="searchInput" type="text" value={searchQuery || ''} onChange={editSearchQuery}></input>
            </div>
            {searchResults ?
                <div>
                    <div className="header">Results</div>
                    <div>
                        {searchResults.map((result, index) => {
                            return (
                                <Comment key={`${index}-${result.text}-${result.id}`} comment={result.text} id={result.id} getAllComments={getAllComments} noEvents />
                            )
                        })}
                    </div>
                </div> : null
            }
        </div >
    )
}

export default CommentsContainer;