export default function fromCallback(fn) {
  return new Promise((resolve, reject) => {
    fn((err, ...results) => {
      if (err) {
        return reject(err);
      }
      
      if (results.length === 1) {
        // Common case, only one result
        resolve(results[0]);
      } else {
        // Handle multiple results
        resolve(results);
      }
    });
  });
}