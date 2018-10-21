const components = {
  Common: ['Div', 'Link', 'Span'],
  Semantic: ['Section', 'Article', 'Nav', 'Aside', 'Header', 'Footer'],
  Media: ['Image', 'Video', 'Youtube'],
  Form: ['Form', 'Input', 'Textarea', 'Button', 'TextField'],
  '@vuetify': ['Carousel'],
  '@karlito40': ['Timeline'],
  'Current Project': ['Form'],
}

const library = [];
for(let [category, value] of Object.entries(components)) {
  const meta = Array.isArray(value) 
    ? { components: value, header: true }
    : value;
  
  if(meta.header) {
    library.push({ header: category })  
  }
  
  library.push({ divider: true });

  meta.components.forEach(c => {
    library.push({
      id: library.length,
      title: `<${c}/>`,
      subtitle: `${c} component`
    });
    
    library.push({ divider: true });
  });
}

export default library;
