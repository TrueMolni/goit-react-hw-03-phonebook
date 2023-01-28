import PropTypes from 'prop-types';
// import scss from './contacts-item.module.scss';

const ContactsItem = ({ id, name, number, removeContact }) => {
  return (
    <li /*className={scss.item}*/>
      {name}. Number : {number}
      <button
        /*className={scss.button}*/
        onClick={() => removeContact(id)}
        type="button"
      >
        Delete
      </button>
    </li>
  );
};

export default ContactsItem;

ContactsItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  removeContact: PropTypes.func.isRequired,
};
