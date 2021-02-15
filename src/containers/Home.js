import React from 'react';
import './Style.css';
import Filter from '../components/Filtering';
import HomeFilter from '../components/HomeFiltering';
import { connect } from 'react-redux';
import * as actions from '../store/actions/filter';
import helloButton from '../components/Test'

class Home extends React.Component{

    componentDidMount() {
        this.props.removeFilters()
    }

    render(){
        return(
            <div className='homeContainer'>
            <section className='homeSearchBar'>
                <HomeFilter/>
            </section>
            <div style={{backgroundImage: "url(" + "https://www.chicagomag.com/wp-content/archive/Chicago-Magazine/January-2016/Winter-Travel-Skate-Ski-in-a-Hilly-Forest/C201601-Winter-Travel-Skate-Ski.jpg" + ")",
                                    backgroundPosition: '40% 30%',
                                      backgroundSize: 'cover',
                                      backgroundRepeat: 'no-repeat', borderRadius: '30px', width:'100%', height:'700px'}}>
                <h1 className='homeTitle'>Sinu Treening</h1>

            </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeFilters: () => dispatch(actions.removeAllFilters())
    }
};

export default connect(null, mapDispatchToProps)(Home);