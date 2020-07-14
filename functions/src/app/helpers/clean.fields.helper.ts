export function cleanFields<T>(model: T,  fields: string | Array<string>): T {

  if(!model) {
    throw new Error('the body cannot be null');
  }

  if(Array.isArray(fields)) {
    fields.forEach(field => delete model[field]);
  } else {
    delete model[fields];
  }

  return model;
}