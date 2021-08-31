type X = { 
    x: { 
      a: 1
      b: 'hi'
    }
    y: 'hey'
  }
  
  type Expected = { 
    readonly x: { 
      readonly a: 1
      readonly b: 'hi'
    }
    readonly y: 'hey' 
  }
  
  const todo: DeepReadonly<X> = {
    x: {
      a: 1,
      b: 'hi'
    },
    y: 'hey'
  }

  todo.y = 'as'
  