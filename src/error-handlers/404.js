'use strict';
// Creating Error Handler to handle Non-existent Pages with Status Code 404.
module.exports = (req, res) => {
  
  res.status(404).json({
    code: 404,
    message: 'Page not Found!'
    
  })

 
}