import PropTypes from 'prop-types';
import scss from './contacts-list.module.scss';
import ContactsItem from 'components/ContactsItem/ContactsItem';

const ContactsList = ({ contacts, removeContact }) => {
  const myContacts = contacts.map(({ id, name, number }) => {
    return (
      <ContactsItem
        key={id}
        id={id}
        name={name}
        number={number}
        removeContact={removeContact}
      />
    );
  });
  return <ol className={scss.wrapper}>{myContacts}</ol>;
};

export default ContactsList;

ContactsList.defaultProps = {
  contacts: [],
};

ContactsList.propType = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ),
  removeContact: PropTypes.func.isRequired,
};
