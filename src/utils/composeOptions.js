export default function composeOptions(optionNames, opts) {
  const {options} = opts;
  
  let composition = optionNames.reduce((acc, name) => {
    if(name === 'options') { return acc; }
    
    const value = opts[name];
    if(typeof value !== "undefined") {
      acc[name] = value;
    }
    
    return acc;
  }, {});
  
  return { ...composition, ...options };
}