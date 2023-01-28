import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactsList from './ContactsList/ContactsList';
import Phonebook from './Phonebook/Phonebook';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    console.log('Before establishing contacts');
    if (contacts && contacts.length) {
      this.setState({ contacts });
      console.log('have setted contacts');
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
    console.log('prevState', prevState);
    console.log('currentState', this.state);
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      console.log('Update contacts');
      localStorage.setItem('my-contacts', JSON.stringify(contacts));
    }
  }

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: newContacts };
    });
  };

  isDublicate(name, number) {
    const dublicateName = name.toLowerCase();
    const dublicateNumber = number;
    const { contacts } = this.state;
    const result = contacts.find(({ name, number }) => {
      return name.toLowerCase() === dublicateName && number === dublicateNumber;
    });

    return Boolean(result);
  }

  addContact = ({ name, number }) => {
    if (this.isDublicate(name, number)) {
      return alert(`${name} with number: ${number} is already exist`);
    }

    this.setState(prevState => {
      const { contacts } = prevState;

      const newContact = { id: nanoid(), name, number };

      return { contacts: [newContact, ...contacts] };
    });
    return true;
  };

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedFilter) ||
        number.includes(normalizedFilter)
      );
    });
    return result;
  }

  render() {
    const { addContact, removeContact, handleFilter } = this;
    const contacts = this.getFilteredContacts();
    const isContacts = Boolean(contacts.length);

    return (
      <div>
        <h1>Phonebook</h1>
        <Phonebook onSubmit={addContact} />
        <h2>Contacts</h2>
        <Filter handleChange={handleFilter} />

        {isContacts && (
          <ContactsList contacts={contacts} removeContact={removeContact} />
        )}
        {!isContacts && <p>No contacts in phonebook</p>}
      </div>
    );
  }
}
export default App;
