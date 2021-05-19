module.exports = ({ types: t }) => {
  return {
    visitor: {
      Identifier(path) {
        if (path.node.name === 'foo') {
          path.node.name = 'bar';
        }
      },
      FunctionDeclaration(path, state) {
        // console.log(state);
        // console.log(path.node.body.body[0]);
      },
      BinaryExpression(path, state) {
        console.log(path.node);
        // console.log(path.node.body.body[0]);
      },
    },
  };
};
