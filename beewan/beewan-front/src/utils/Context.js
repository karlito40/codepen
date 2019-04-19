import { strtr } from './String';

export function importDefaults(context) {
  const res = {};
  
  context.keys().forEach(filePath => {
    const fileName = filePath.slice(0, filePath.lastIndexOf('.'));
    const exportName = strtr(fileName, {
      '../' : '',
      './': ''
    });
    
    res[exportName] = context(filePath).default;
  })

  return res;
}