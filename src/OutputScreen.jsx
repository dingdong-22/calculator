function OutputScreen(props) {
    props.setVal("200");
    return <div className="output-window">{props.val}</div>;
}

export default OutputScreen;
