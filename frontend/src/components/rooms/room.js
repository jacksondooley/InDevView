import React from "react";

class Room extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    render(){
        return(
            <div>
                <div>
                    {/* Code editor goes here */}
                </div>
                <div>
                    <div>
                        {/* Live camera feeds go here */}
                    </div>
                    <div>
                        {/* Live chat goes here */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Room;