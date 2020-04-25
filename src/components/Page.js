import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { getDataTotals, getCountries, getDataByCountry } from '../actions/Data'
import store from '../store';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    NavItem,
    Container
} from 'reactstrap';

const Page = ( props ) => {
    const [country, setCountry] = useState('Afgahnistan')
    const [isOpen, setIsOpen] = useState(false)
    useEffect( () => {
        store.dispatch(getDataTotals())
        store.dispatch(getCountries())
    }, [] )
  const   toggle = () => {
        setIsOpen( 
             !isOpen
         );
    }

    
    const { dataTotals, countries, dataList } = props.data;
    // console.log( dataList.provinces )


    const getData = ( e ) => {
        e.preventDefault();
        store.dispatch(getDataByCountry(country))
    }

    return (
        <React.Fragment>
        <Navbar color="dark" dark expand="sm" className="mb-5 bg-blue">
        <Container fluid={true}>
            <NavbarBrand href='#'>Covid-19 Updates
</NavbarBrand>
            <NavbarToggler onClick={ toggle } />
            <Collapse isOpen={isOpen } navbar>
                <Nav className="ml-auto" navbar>

                   
                    <NavItem>
                        <NavLink>
                            <a href="https://github.com/seyi-js/repositories/" target="_blank" style={ { color: 'white', textDecoration: 'none' } }><i className="fab fa-github"></i> GitHub </a>
                        </NavLink>
                    </NavItem>
                    
                </Nav>
            </Collapse>
        </Container>
    </Navbar>
   

        <div className="container m-auto">
            <div className="row">
                
                <div className="col-md-6">
                <h1>Total Number Of Covid-19 cases Around The Globe</h1>
                { dataTotals.map( (data, i) => (
                    <ul className="list-group list-group-flush" key={i}>
                    <li className="list-group-item"><strong>Confirmed Cases: </strong>  {data.confirmed }</li>
                    <li className="list-group-item"><strong>Recovered Cases: </strong> {data.recovered }</li>
                    <li className="list-group-item"><strong>Critical Cases: </strong>{data.critical }</li>
                    <li className="list-group-item"><strong>Deaths: </strong>{data.deaths }</li>
                    
                  </ul> 
                            
                        ))}
                </div>
                <div className="col-md-6">
                    <h1>Get Data By Country</h1>
                    <form>
                        
                <div className="form-group">
                  <label htmlFor="exampleFormControlSelect1">Choose Country</label>
                            <select className="form-control" id="exampleFormControlSelect1" defaultValue={country} onChange={e => setCountry(e.target.value)} >
                                { countries.map( ( { name, i } ) => (
                                    <option key={i}>{ name}</option>
                                    
                                ))}
                   
                  </select>
                </div>
                        <input type="submit" className="btn btn-primary block" onClick={e=> getData(e)}  />
                    </form>
                    {(dataList.map) ?  dataList.map( ( {confirmed, critical, recovered, deaths , i} ) => (
                        <ul className="list-group list-group-flush" key={ i } >
                            <p>{}</p>
                        <li className="list-group-item"><strong>Confirmed Cases:  </strong> {confirmed}</li>
                        <li className="list-group-item"><strong>Recovered Cases: </strong> {recovered} </li>
                        <li className="list-group-item"><strong>Critical Cases: </strong> {critical}</li>
                        <li className="list-group-item"><strong>Deaths: </strong> {deaths}</li>
                        
                      </ul> 
                   )) : ''}
                    
                      
                                
                            
                </div>
               
            </div>
           
        
    </div>
        
    </React.Fragment>
        
    )
}
const mapStateToProps = ( state ) => ( {
    data: state.data
})
export default connect(mapStateToProps, {getDataTotals, getCountries, getDataByCountry})(Page);
