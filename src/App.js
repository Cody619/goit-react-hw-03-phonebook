import { Component } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid'
import { PhoneBook } from './componets/PhoneBook.js'
import { Contacts } from './componets/Contacts'

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  }

  componentDidMount() {
    if (localStorage.getItem('contacts')) {
      this.setState({
        contacts: JSON.parse(localStorage.getItem('contacts')),
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState((state) => {
      if (
        state.contacts.some((contact) => {
          return contact.name === state.name
        })
      ) {
        alert(`${state.name} is already in contacts`)
        return state
      } else {
        return {
          contacts: [
            ...state.contacts,
            { name: state.name, id: uuidv4(), number: state.number },
          ],
          name: '',
          number: '',
        }
      }
    })
  }

  handleDeleteItem = (id) => {
    this.setState((state) => {
      return {
        contacts: state.contacts.filter((contact) => {
          return contact.id !== id
        }),
      }
    })
  }

  handleNameChange = (event) => {
    this.setState({ name: event.currentTarget.value })
  }
  handleNumberChange = (event) => {
    this.setState({ number: event.currentTarget.value })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.currentTarget.value })
  }
  filterContacts = () => {
    if (this.state.filter === '') {
      return this.state.contacts
    } else {
      return this.state.contacts.filter((contact) => {
        return contact.name
          .toLowerCase()
          .includes(this.state.filter.toLowerCase())
      })
    }
  }
  render() {
    return (
      <div>
        <PhoneBook
          filter={this.state.filter}
          name={this.state.name}
          number={this.state.number}
          handleSubmit={this.handleSubmit}
          handleNameChange={this.handleNameChange}
          handleNumberChange={this.handleNumberChange}
          handleFilterChange={this.handleFilterChange}
        />
        <Contacts
          contacts={this.filterContacts()}
          handleDeleteItem={this.handleDeleteItem}
        />
      </div>
    )
  }
}
