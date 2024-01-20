const mediaQueryMobile = '@media (max-width: 767px)';

const customStyles = {
  container: (provided) => ({
    ...provided,
    background: '#fff',
   }), 
  control: (provided, state) => ({
    ...provided,
    background: '#fff',
    border: 'none',
    borderBottom: '1px solid lightgrey',
    fontSize: '14px', 
    borderRadius: '0px',
    boxShadow: 'none',
    cursor: 'pointer', 
  }),
  option: (provided, state) => ({
    ...provided, 
    backgroundColor: state.isFocused ? 'lightgrey' : "#fff",
    color: state.isFocused ? '#fff' : '#1E1E1E',
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: '38px', 
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: '38px', 
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#1E1E1E',
    opacity: "0.5",
    marginRight: '6px'
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#1E1E1E',  
    height: '20px',
    
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: '5px',
    borderRadius: '8px',
    overflow: 'hidden',
    zIndex: '999',
    background: '#fff',
  }),   
};



export default customStyles;