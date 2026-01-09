const About = () => {

    // 用陣列也可以顯示多個元素
    let element = [<h2 key="1">關於我頁面 h2</h2>];

    element.push(
        <h4 key="2" >關於我頁面 h4</h4>
    );

    return (
        <div className="container mt-3">
            {element}
        </div>
    );
}

export default About;