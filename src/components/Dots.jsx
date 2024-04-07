import '../styles/dots.css'

function oneDot() {
    return(
        <div className="dot1">
            <div className="dot"></div>
        </div>
    )
}

function twoDots() {
    return(
        <div className="dot2">
            <div className="dot"></div>
            <div className="notDot"></div>
            <div className="notDot"></div>
            <div className="dot"></div>
        </div>
    )
}

function threeDots() {
    return(
        <div className="dot3">
            <div className="dot"></div>
            <div className="notDot"></div>
            <div className="notDot"></div>
            <div className="notDot"></div>
            <div className="dot"></div>
            <div className="notDot"></div>
            <div className="notDot"></div>
            <div className="notDot"></div>
            <div className="dot"></div>
        </div>
    )
}

function fourDots() {
    return(
        <div className="dot4">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
    )
}

function fiveDots() {
    return(
        <div className="dot5">
            <div className="dot"></div>
            <div className="notDot"></div>
            <div className="dot"></div>
            <div className="notDot"></div>
            <div className="dot"></div>
            <div className="notDot"></div>
            <div className="dot"></div>
            <div className="notDot"></div>
            <div className="dot"></div>
        </div>
    )
}

function sixDots() {
    return(
        <div className="dot6">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
    )
}

export default function ChooseDots(value) {
    switch(value) {
        case 1:
            return oneDot();
        case 2:
            return twoDots();
        case 3:
            return threeDots();
        case 4:
            return fourDots();
        case 5:
            return fiveDots();
        case 6:
            return sixDots();
    }
}