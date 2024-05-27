import "bootstrap/dist/css/bootstrap.css"
import { Link } from "react-router-dom";
import { useState } from "react";
function QRcode()
{
    const [keyword,setkeyword]=useState("");
    const [size,setsize]=useState(0);
    const [input2,setinput2]=useState(false);
    const [img,setimg]=useState("");
    const [loading,setloading]=useState(false);
    function handlechange(e)
    {
        if(e.target.name=="size")
        {
            try {
                let val=parseInt(e.target.value);   
                setsize(val);
            } catch (error) {
                setinput2(true);
            }
        }
        else
        {
            setkeyword(e.target.value);
        }
    }
    async function generateqrcode(e)
    {
        e.preventDefault();
        if(size && keyword)
        {
            setloading(true);
        try{
            setimg(`https://api.qrserver.com/v1/create-qr-code/?size=${size}*${size}&data=${keyword}`);
        }catch(error)
        {
            alert("Error "+error);
        }finally
        {
            setloading(false);
        }
        }
        else
        {
            alert("Value is empty");
        }
    }
    function downloadqrcode(e)
    {
        e.preventDefault();
        if(img!=undefined && img.length>0)
        {
            fetch(img).then((response)=>response.blob()).then((blob)=>{
                console.log(blob);
                const list=document.createElement('a');
                console.log(list);
                list.href=URL.createObjectURL(blob);
                list.download=keyword+".png";
                document.body.appendChild(list);
                list.click();
                document.body.removeChild(list);
            })
        }
    }
    return(
        <div className="b">
            <div className="container col-4 text-center" style={{marginTop:"10vh"}}>
                <h1>QR Code Generator</h1>
            </div>
            <form className="container bg-dark col-lg-4 rounded-5 border-dark text-primary " >
                {loading && <h1 className="text-light">"Hello"</h1>}
                {img && <div className="text-center">
                    <img src={img} className="text-center mt-2 bg-light"></img>
                </div>}
                

                <div className="form-group m-4">
                    <label htmlFor="keyword" className="m-2">Enter any keyword : </label>
                    <input id="keyword" type="text" className="form-control" name="keyword" value={keyword} onChange={handlechange}></input>
                </div>

                <div className="form-group m-4">
                    <label htmlFor="size" className="m-2">Enter the Size(Ex: 150 px)</label>
                    <input id="size" type="number" className="form-control" name="size" value={size} onChange={handlechange}></input>
                    {input2&&<p className="text-center text-danger">Invalid Input</p>}
                </div><br/>
                <div className="text-center">
                    <button className="btn btn-primary mb-3 me-2" onClick={generateqrcode}>Generate Button</button>
                    <button className="btn btn-danger mb-3 ms-2" onClick={downloadqrcode}>Download Button</button>
                </div>
                <div className="m-3">
                    <h4 className="text-center text-light">Developed by <Link to="/app">Imran Farhath A</Link></h4>
                </div>
            </form>
        </div>
    )
}
export default QRcode;