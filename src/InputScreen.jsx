function InputScreen(props) {
    return (
        <div className="input-window-container">
            <form>
                <textarea
                    className="input-window"
                    type="text"
                    value={props.expr}
                    onChange={(e) => props.setExpr(e.target.value)}
                ></textarea>
            </form>
        </div>
    );
}

export default InputScreen;
