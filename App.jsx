import React from 'react';
import Base from './src/utils/Base';

import whyUpdate from 'why-did-you-update';

if(process.env.NODE_ENV !== 'production'){
    window.ReactPerf = React.addons.Perf;
    ReactPerf.start();

    whyUpdate(React);
}

export default class App extends Base {
    constructor(props, context){
        super(props, context);
    }
    
    render(){
        return (
            <div>
                { this.props.children }
            </div>
        );
    }
}