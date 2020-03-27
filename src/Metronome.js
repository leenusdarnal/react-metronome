import React,{Component}from "react"
import "./Metronome.css"



class Metronome extends Component {

    constructor(props){
        super(props)
        this.state={
            bpm:60,
            playing:false,
            count:0,
            beatsPerMeasure:4
        }
        this.clickSound1 = new Audio("https://daveceddia.com/freebies/react-metronome/click1.wav");
        this.clickSound2= new Audio("https://daveceddia.com/freebies/react-metronome/click2.wav");
        this.handleBpmChange=this.handleBpmChange.bind(this);
        this.playSound = this.playSound.bind(this);
        this.startStopSound=this.startStopSound.bind(this);
        this.updateInterval = this.updateInterval.bind(this);
        this.handleTempo =this.handleTempo.bind(this);
    }

    playSound(){
        if(this.state.count % this.state.beatsPerMeasure){
            this.clickSound1.play();
            console.log("beat1");
        }
        else{
            this.clickSound2.play();
            console.log("beat2")
        }
        
        this.setState({
            count:(this.state.count + 1) % this.state.beatsPerMeasure
        });
    
        
        
    }
    updateInterval(){
        const bpmSpeed = 60 *1000 /this.state.bpm;
        this.timer = setInterval(this.playSound, bpmSpeed);
        if(this.state.bpm <= 0){
            clearInterval(this.timer);
        }
    }
    startStopSound(){

        if(this.state.playing){
            this.setState({
                playing:false,
                count:0
            })
            clearInterval(this.timer);
        }
        else{
            this.setState({
                playing:true
            },this.updateInterval());
        }

    }


    handleBpmChange(e){
    
    const bpm = e.target.value;
    if(this.state.playing){
        clearInterval(this.timer);
        this.setState({
            count:0,
            bpm
        },this.updateInterval());
    }
    else{
        this.setState({
            bpm
        });
    }


}
handleTempo(e){

    const ddl = document.getElementById('beatSpeed').value;
    this.setState({
        beatsPerMeasure:ddl
    })

}

render(){
    return(
        <div className="container">
            <h1>Metronome</h1>
            <Slider bpm={this.state.bpm} handleBpmChange={this.handleBpmChange}></Slider>
            <Button playing={this.state.playing} startStopSound={this.startStopSound}></Button>
            <TempoBpm beatsPerMeasure={this.state.beatsPerMeasure} handleTempo={this.handleTempo}></TempoBpm>
        </div>
    );
}

}

function Button(props){

        return(
            <button id="playButton" onClick={props.startStopSound}>
                {props.playing?"Stop" :"Play"}
            </button>
        );
} 

function TempoBpm(props){
return(
    <div id="beatSpeedContainer">
        <label htmlFor="beatSpeed">Choose a Beat</label>
            <select id="beatSpeed" value={props.beatsPerMeasure}
            onChange={props.handleTempo}>
                <option value="1">1/4</option>
                <option value="2">2/4</option>
                <option value="3">3/4</option>
                <option value="4">4/4</option>
            </select>
    </div>
)

}
function Slider(props){
        const styles={
            width:"260px",
            margin:"5px"
        };
        return(
            <div id="sliderInput">
                <div>{props.bpm}BPM:</div>
                <input  type="range" min="30" max="240"
                value={props.bpm}
                onChange={props.handleBpmChange}
                style={styles}
                ></input>
            </div>
        )
}

export default Metronome;