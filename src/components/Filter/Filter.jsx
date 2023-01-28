import PropTypes from 'prop-types';
// import scss from './filter.module.scss';

const Filter = ({ handleChange }) => {
  return (
    <div>
      <label>Filter contacts</label>
      <input
        name="filter"
        onChange={handleChange}
        placeholder="Filter contacts"
      />
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
