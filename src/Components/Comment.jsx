import { useState } from "react";
import { ThumbsUp, Trash } from "phosphor-react";
import { Avatar } from "./Avatar";

import styles from "./Comment.module.css";

export function Comment({ content, onDeleteComment }) {
  const [applaudCount, setApploudCount] = useState(0);

  function handleDeleteComment() {
    onDeleteComment(content);
  }

  function handleApplaudCount() {
    setApploudCount((lastApplaudCount) => {
      return lastApplaudCount + 1
    });
  }

  return (
    <div className={styles.comment}>
      <Avatar
        hasBorder={false}
        src="https://pbs.twimg.com/profile_images/1578573755361656832/DbMlbspY_bigger.jpg"  
      />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <b> João Morais </b>
              <time title="17 de Outubro de 2022" dateTime="2022-10-17 08:30:00"> Cerca de 1h atrás </time>
            </div>

            <button onMouseDown={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>
          <p> {content} </p>
        </div>

        <footer>
          <button onClick={handleApplaudCount}>
            <ThumbsUp />
            Aplaudir <span> {applaudCount} </span>
          </button>
        </footer>

      </div>
    </div>
  )
}