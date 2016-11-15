export default function fromCallback(fn) {
  return new Promise((resolve, reject) => {
    fn((err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}