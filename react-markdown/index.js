marked.setOptions({
    breaks: true
})

const renderer = new marked.Renderer();
function App() {
    const [text, setText] = React.useState("");

    return(
        <div className="text-center px-4">
            <h1 className='p-4'>markdown</h1>
           <textarea 
           name="editor" 
           id="editor"  
           rows="10" 
           value={text} 
           onChange={(e) => setText(e.target.value)}
           className="textarea"
           ></textarea>
               <h3 className="mt-3">Output</h3>
               <Preview markdown={text}/>
        </div>
    )
}

function Preview({ markdown }) {
    return <div
       dangerouslySetInnerHtml={{
           html: marked(markdown, {renderer: renderer}),
       }}
       id="preivew"
    ></div>
}

ReactDOM.render(<App/>, document.getElementById("root"))