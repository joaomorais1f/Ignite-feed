import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useState } from "react";

import { Avatar } from "./Avatar";
import { Comment } from "./Comment";

import styles from "./Post.module.css";


export function Post({ author, publishedAt, content }) {
  const [comments, setComments] = useState([
    'Primeiro post cadastrado',
  ]);
  const [commentText, setCommentText] = useState('');

  const publishedAtFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  const publishedAtRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment() {
    event.preventDefault();

    setComments([...comments, commentText]);
    setCommentText('');
  }

  function handleNewCommentChange() {
    event.target.setCustomValidity('');
    setCommentText(event.target.value);
  }

  function handleNewCommentInvalid() {
    event.target.setCustomValidity('Este campo é obrigatório');
  }
  
  function deleteComment(commentToDelete) {
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete;
    });

    setComments(commentsWithoutDeletedOne);
  }

  const isNewCommentEmpty = commentText.length == 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar
            src={author.avatarUrl}  
          />
          <div className={styles.authorInfo}>
            <b> {author.name} </b>
            <span> {author.role} </span>
          </div>
        </div>
        <time title={publishedAtFormatted} dateTime={publishedAt.toISOString()}> 
          {publishedAtRelativeToNow}
        </time>

      </header>
        <div className={styles.content}>
          {content.map(line => {
            if (line.type == 'paragraph') {
              return <p key={line.content}> {line.content} </p>
            } else if (line.type == 'link') {
              return <p key={line.content}> <a href="#"> {line.content} </a> </p>
            }
          })}
        </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <b> Deixe o seu comentário </b>

        <textarea
          name="comment"
          value={commentText}
          placeholder="Deixe o seu comentário"
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}> Publicar </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return (
            <Comment 
              key={comment}
              content={comment}
              onDeleteComment={deleteComment} 
            />
          )
        })}
      </div>
    </article>
  )
}