import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (e) => {
    this.setState({
      filters: {
        type: e.target.value
      }
    })
  }

  onFindPetsClick = () => {
     //console.log('pets click')
     //use console.log to check if the onClick is being rendered

    //due to scope cannot be accessed in the fetch(url)
    //needs to be defined

    let url = this.state.filters.type === 'all' ? '/api/pets' : `/api/pets?type=${this.state.filters.type}`

    //option 2
    // let url;
    // if (this.state.filters.type === 'all'){
    //   url = '/api/pets'
    // } else {
    //   url = `/api/pets?type=${this.state.filters.type}`
    // }


    //option 3
    // let url;
    //due to scope cannot be accessed in the fetch(url)
    //needs to be defined

    // if (this.state.filters.type === 'all'){
    //   url = '/api/pets'
    // }
    // else if (this.state.filters.type === 'cat'){
    //   url = '/api/pets?type=cat'
    // }
    // else if (this.state.filters.type === 'dog'){
    //   url = '/api/pets?type=dog'
    // }
    // else if (this.state.filters.type === 'micropig'){
    //   url = '/api/pets?type=micropig'
    // }
    


    //console.log('pets click')
    fetch(url)
    .then(resp => resp.json())
    .then(petsArr => {
      //updating the state of the pets array  
      this.setState({
        pets: petsArr
      })
      //console.log(data)
      //click on the find pets button to grab the data (api)
    })
  }

  onAdoptPet = (id) => {
    //console.log('pet adopted')
    const updatedPets = this.state.pets.map(petObj => {
      if (id === petObj.id){
        return {
          ...petObj,
          isAdopted: true
        }
      } else {
        return petObj
      }
    })

    this.setState({
      pets: updatedPets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
