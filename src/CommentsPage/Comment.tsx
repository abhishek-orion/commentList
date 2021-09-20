import React from 'react';


const Comment = props => {
    const { comment, id, getAllComments, noEvents } = props;

    const deleteComment = React.useCallback(() => {
        fetch(`/api/comments/${id}`, {
            method: 'delete'
        }).then(getAllComments());
    }, [])


    return (
        <div className="comment">
            <text>{comment}</text>
            {!noEvents ? <button className="deleteButton" onClick={deleteComment}>Delete</button> : null}
        </div>
    )
}

export default Comment;