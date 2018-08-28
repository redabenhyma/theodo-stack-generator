module.exports = (file, api, options) => {
  const j = api.jscodeshift;
  const root = j(file.source);


  root.find(j.ImportDeclaration)
    .at(-1)
    .insertAfter(() => {
      return j.importDeclaration(
        [j.importSpecifier(j.identifier('sagas'), j.identifier('avatarSagas'))],
        j.literal('redux/Avatar')
      );
    });

  // Todo : check if yield all([]); already exists, if yes append the saga to it.
  root.find(j.ExportDefaultDeclaration)
    .find(j.FunctionDeclaration)
    .find(j.BlockStatement)
    .at(-1)
    .forEach((p) => {
      const avatarSagas = j.callExpression(j.identifier("avatarSagas"), []);
      const sagas = j.arrayExpression([avatarSagas]);
      const all = j.callExpression(j.identifier("all"), [sagas]);
      const yieldAll = j.expressionStatement(j.yieldExpression(all));
      yieldAll.comments = [j.line(' $FlowFixMe')];
      p.value.body.push(yieldAll);
    })
  ;

  return root.toSource({
    quote: 'single',
    trailingComma: true,
    tabWidth: 2,
  });
};

module.exports.parser = 'flow';