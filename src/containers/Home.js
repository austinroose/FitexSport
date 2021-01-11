import React from 'react';
import './Style.css';
import Filter from '../components/Filtering';
import HomeFilter from '../components/HomeFiltering';
import { connect } from 'react-redux';
import * as actions from '../store/actions/filter';

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
            <div style={{backgroundImage: "url(" + "https://runningmagazine.ca/wp-content/uploads/2013/07/93367000-e1562602779929.jpg" + ")",
                                    backgroundPosition: 'center',
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