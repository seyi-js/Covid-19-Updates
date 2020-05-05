import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getDataTotals, getCountries, getDataByCountry } from '../actions/Data'
import store from '../store';
import TotalChart from './TotalChart'
import CountryData from './CountryData'
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
import Spinner from './Spinner'
const Page = ( props ) => {
    const [count, setCountry] = useState('')
    const [ isOpen, setIsOpen ] = useState( false )


    //Get Get Countries
    useEffect( () => {

        store.dispatch( getCountries() )
    }, [] );

    //Toggle
    const toggle = () => {
        setIsOpen(
            !isOpen
        );
    }

    //Get Total Data
    useEffect( () => {
        store.dispatch( getDataTotals() )
    }, [] )

    useEffect( () => {

        let name = localStorage.getItem( 'country' )
        // console.log(name)
        if ( name !== null) {
            setCountry( name ) 
            getData( name )
            // localStorage.removeItem('country')
        } else {
            
            setCountry( 'Nigeria' ) 
            console.log('yeeey')
            getData("Nigeria")
        }

        
        

       
      
       
    // localStorage.getItem('country')
    },[])

    const { dataTotals, countries, dataList } = props.data;
    // console.log( dataList.provinces )

    //Get Data By Country
    const getData = ( countryName ) => {
        // e.preventDefault();
        localStorage.setItem( 'country', countryName )
        setCountry(countryName)
        store.dispatch( getDataByCountry( countryName ) )
    }

    return (
        <React.Fragment>
            <Navbar color="dark" dark expand="sm" className="mb-5 bg-blue">
                <Container fluid={ true }>
                    <NavbarBrand href='#'>Covid-19 Updates
</NavbarBrand>
                    <NavbarToggler onClick={ toggle } />
                    <Collapse isOpen={ isOpen } navbar>
                        <Nav className="ml-auto" navbar>


                            <NavItem>
                                <NavLink>
                                    <a href="https://github.com/seyi-js/repositories/" rel="noopener noreferrer" target="_blank" style={ { color: 'white', textDecoration: 'none' } }><i className="fab fa-github"></i> GitHub </a>
                                </NavLink>
                            </NavItem>

                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>


            <div className="container m-auto">
                <div className="row">

                    <div className="col-md-6">
                        <h1>Total Data Of Covid-19 cases Around The Globe</h1>
                        { ( dataTotals === undefined || dataTotals.length === 0 ) ? <Spinner /> : dataTotals.map( ( data, i ) => (
                            <TotalChart
                                confirmed={ data.confirmed }
                                recovered={ data.recovered }
                                deaths={ data.deaths }
                                critical={data.critical}
                            />

                        ) ) }
                    </div>
                    <div className="col-md-6">
                        <h1>Get Data By Country</h1>
                        <form>

                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Choose Country</label>
                                <select className="form-control" id="exampleFormControlSelect1" value={count} onChange={ ( e ) => getData( e.target.value ) } >
                                    <option value="" selected disabled hidden>{ count}</option>
                                    { countries.map( ( { name, i } ) => (
                                        
                                        <option key={ i }>{ name }</option>

                                    ) ) }

                                </select>
                            </div>

                        </form>
                        { ( dataList === undefined || dataList.length === 0 ) ? <Spinner /> : dataList.map( ( { confirmed, country, critical, recovered, deaths, i } ) => (
                            <CountryData
                                confirmed={ confirmed }
                                recovered={ recovered }
                                deaths={ deaths }
                                critical={ critical }
                                country={country}
                            />
                        ) ) }





                    </div>

                </div>


            </div>

        </React.Fragment>

    )
}
const mapStateToProps = ( state ) => ( {
    data: state.data
} )
export default connect( mapStateToProps, { getDataTotals, getCountries, getDataByCountry } )( Page );
