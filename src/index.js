import loadComponents from './components';
import loadBlocks from './blocks';
import loadTraits from './traits';

export default (editor, opts = {}) => {
  const options = {
    ...{
      // default options
    }, ...opts
  };

  // Add components
  loadComponents(editor, options);

  // Add blocks
  loadBlocks(editor, options);

  // Add traits
  loadTraits(editor, options);

  // TODO delete this when release
  // editor.on('load', ()=>{
  //   var initF7 = editor.BlockManager.get('push-service');
  //   editor.DomComponents.addComponent(initF7.attributes.content);
  // })
};
