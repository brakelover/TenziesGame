import ChooseDots from "./Dots"

export default function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        <div className="die" style={styles} onClick={props.hold}>
            <div className="die-num">{ChooseDots(props.value)}</div>
        </div>
    )
}