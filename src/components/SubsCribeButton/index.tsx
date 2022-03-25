import styles from "./style.module.scss"


export function SubscribeButton(){
    return(
        <button
        type="button"
        className={styles.SubscribeButton}
        >
            subscribe now
        </button>
    )
}