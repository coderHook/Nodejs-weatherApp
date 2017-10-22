var getUser = (id, callback) => {
  var user = {
    id,
    name: 'Pedro'
  };
  setTimeout(() => {
    callback(user)
    
  }, 3000);

};

getUser(30, (user) =>{
  console.log(user);
});
