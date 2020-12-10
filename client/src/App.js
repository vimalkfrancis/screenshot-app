import React, { Component } from 'react';
import './App.css';
class App extends Component {
  state = {
    response: '',
    screenshotUrl: '',
    responseToPost: '',
    imgName: '',
    imgFormat: '',
    message:''
  };
  handleSubmit = async e => {
    e.preventDefault();

    if((this.state.screenshotUrl && this.state.imgName && this.state.imgFormat)!==''){

      await fetch('/api/screenshot' , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ screenshotUrl: this.state.screenshotUrl, imgName: this.state.imgName, imgFormat:this.state.imgFormat }),
      })
      .then(response =>{
        response.text().then(text =>{
          this.setState({message:text});
        })
      })
      
     
    }
    else{

      this.setState({message:'Please fill  the form'});

    }

   

  };
  downloadImage = async e => {
    e.preventDefault();

    if((this.state.screenshotUrl && this.state.imgName && this.state.imgFormat)!==''){
     
      await fetch('/api/getimage' , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imgName: this.state.imgName, imgFormat:this.state.imgFormat }),
      })
      .then(response => {
        response.blob().then(blob => {
          let url =window.URL.createObjectURL(blob);
          this.setState({image:url})
          let a = document.createElement('a');
           a.href = url;
            a.download = `${this.state.imgName}.${this.state.imgFormat}`;
            a.click();
            this.setState({message:'Download Completed'})
  
  
        });
      });
    }

   

  }
  render() {
    return (
      <div className="App">
        <p>{this.state.response}</p>
        <h1 style={{textAlign:"left", color:"turquoise", paddingLeft:60}}>Screenshot</h1>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong style={{color:"slategray"}}>Let's take a screenshot</strong>
          </p>
          <input className='input1'
            type="text"
            value={this.state.screenshotUrl}
            onChange={e => this.setState({ screenshotUrl: e.target.value })}
            placeholder="Enter Any URL" required="text"
          />
          <h2 style={{color:'rgb(34, 200, 255)'}}>Download Options</h2>
       
         <div className="dwnlds">
  
          <div>
          <input className='input2'
           type="text"
           value={this.state.imgName}
           onChange={e => this.setState({ imgName: e.target.value })}
           placeholder="Set an image name" required="text"
          />
          </div>
        

         <br />
          <div>
          <select className="select" name="format" id="fomrat"
           onChange={e => this.setState({ imgFormat: e.target.value })} >
             <option className="opt">CHOOSE FORMAT</option>
           <option className="opt"  value="png">PNG</option>
           <option className="opt"  value="jpg">JPG</option>
           <option className="opt"  value="pdf">PDF</option>
           <option className="opt"  value="jpeg">JPEG</option>
          </select>
          </div>

         </div>
          <button type="submit" onClick={(e)=>{
          
            this.handleSubmit(e);
            setTimeout(()=>
            {this.downloadImage(e)},7000)
            
          }}>Submit</button>
        </form>
          
        <div className="Clientmsg">
        <p style={{color:'darkblue', fontSize:30, fontFamily:'cursive'}}>{this.state.message}</p>
        </div>
        
        
        <div className="footer">
        <p className="textFooter">Contact : vimalkfrancis20@gmail.com </p>
        </div>
      </div>
    );
  }
}
export default App;