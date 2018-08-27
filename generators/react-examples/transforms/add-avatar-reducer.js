module.exports = (file, api, options) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  root.find(j.ImportDeclaration)
    .at(-1)
    .insertAfter(() => {
      return j.importDeclaration(
        [j.importSpecifier(j.identifier('reducer'), j.identifier('avatar'))],
        j.literal('./Avatar')
      );
    });

  root.find(j.ExportDefaultDeclaration)
    .find(j.FunctionDeclaration)
    .find(j.BlockStatement)
    .find(j.ReturnStatement)
    .find(j.CallExpression, {callee: {name: "combineReducers"}})
    .find(j.ObjectExpression)
    .forEach((p) => {
      const property = j.property("init", j.identifier("avatar"), j.identifier("avatar"));

      property.shorthand = true;
      property.method = false;
      property.computed = false;

      return p.value.properties.push(property)
    });


  return root.toSource({
    quote: 'single',
    trailingComma: true,
    reuseWhitespace: true,
    tabWidth: 2,
    useTabs: false
  });
};

module.exports.parser = 'flow';